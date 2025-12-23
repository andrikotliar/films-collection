import { convertCamelCaseToKebabCase } from '@films-collection/shared';
import fs from 'node:fs';
import path from 'node:path';
import type z from 'zod';
import { routers } from '~/routers';
import type { Route, RouteSchema } from '~/shared';
import { createAuxiliaryTypeStore, printNode, zodToTs } from 'zod-to-ts';

type Node = {
  children: Record<string, Node>;
  fn?: {
    method: Route['method'];
    path: Route['url'];
    schema?: Route['schema'];
  };
};

const OUTPUT_DIR = '/web/src/generated';
const API_FOLDER_DIVIDER = '/api/';
const INDENTATION = 2;

const normalizePath = (path: string) => {
  return path.replace(/\/+/g, '/').replace(/\/$/, '');
};

const splitPath = (path: string) => {
  return path
    .split('/')
    .filter(Boolean)
    .filter((p) => !p.startsWith(':'));
};

const getActionName = (method: string, hasParams: boolean) => {
  switch (method) {
    case 'GET':
      return hasParams ? 'get' : 'list';
    case 'POST':
      return 'create';
    case 'PUT':
      return 'update';
    case 'PATCH':
      return 'patch';
    case 'DELETE':
      return 'remove';
    default:
      return method.toLowerCase();
  }
};

const insertNode = (rootNode: Node, pathSegments: string[], fn: Node['fn']): void => {
  let node = rootNode;

  for (const seg of pathSegments) {
    if (!node.children[seg]) {
      node.children[seg] = { children: {} };
    }
    node = node.children[seg];
  }
  node.fn = fn;
};

const generateNodes = (): Node => {
  const nodes: Node = { children: {} };

  for (const [prefix, routes] of Object.entries(routers)) {
    for (const route of routes) {
      const apiPath = convertCamelCaseToKebabCase(prefix);
      const fullPath = normalizePath(`/${apiPath}${route.url}`);
      const segments = splitPath(route.url);
      const hasParams = fullPath.includes(':');
      const action = getActionName(route.method, hasParams);

      insertNode(nodes, [prefix, ...segments, action], {
        method: route.method,
        path: fullPath,
        schema: route.schema,
      });
    }
  }

  return nodes;
};

const buildOptionsParameterType = (
  param: 'input' | 'queryParams' | 'params',
  schema: z.ZodType,
) => {
  const auxiliaryTypeStore = createAuxiliaryTypeStore();
  const { node } = zodToTs(schema, { auxiliaryTypeStore });
  const typeString = printNode(node);

  return `${param}: ${typeString}`;
};

const buildOptionsType = (schema?: RouteSchema) => {
  if (!schema) {
    return null;
  }

  const options: string[] = [];

  if (schema.body) {
    options.push(buildOptionsParameterType('input', schema.body));
  }

  if (schema.params) {
    options.push(buildOptionsParameterType('params', schema.params));
  }

  if (schema.querystring) {
    options.push(buildOptionsParameterType('queryParams', schema.querystring));
  }

  return `{
      ${options.join(',\n')}
  }`;
};

const buildResponseType = (schema?: RouteSchema) => {
  if (!schema?.response) {
    return 'unknown';
  }

  const auxiliaryTypeStore = createAuxiliaryTypeStore();
  const { node } = zodToTs(schema.response, { auxiliaryTypeStore });
  const typeString = printNode(node);

  return typeString;
};

const emitRuntime = (node: Node, path: string[] = [], indent = INDENTATION): string => {
  const lines: string[] = [];
  const pad = ' '.repeat(indent);

  for (const [key, value] of Object.entries(node.children)) {
    if (value.fn) {
      const fn = `(opts) => request('${value.fn.method}', '${value.fn.path}', opts)`;

      lines.push(`${pad}${key}: ${fn}`);
    } else {
      lines.push(
        `${pad}${key}: {
${emitRuntime(value, [...path, key], indent + 2)}
${pad}}`,
      );
    }
  }

  return lines.join(',\n');
};

const emitTypes = (node: Node, path: string[] = [], indent = INDENTATION): string => {
  const lines: string[] = [];
  const pad = ' '.repeat(indent);

  for (const [key, value] of Object.entries(node.children)) {
    const fullPath = [...path, key];

    if (value.fn) {
      const opts = buildOptionsType(value.fn.schema);
      const responseType = buildResponseType(value.fn.schema);
      const optionsString = opts ? `opts: ${opts}` : '';

      lines.push(`${pad}${key}: (${optionsString}) => Promise<${responseType}>`);
    } else {
      lines.push(`${pad}${key}: {
${emitTypes(value, fullPath)}
${pad}};`);
    }
  }

  return lines.join('\n');
};

const getKeyOptionsValue = (type: 'params' | 'queryParams'): string => {
  return `opts.${type}`;
};

const emitKeysRuntime = (node: Node, path: string[] = [], indent = INDENTATION): string => {
  const parts: string[] = [];
  const pad = ' '.repeat(indent);

  for (const [key, child] of Object.entries(node.children)) {
    const nextPath = [...path, key];

    if (child.fn) {
      const base = nextPath.map((p) => `'${p}'`).join(', ');

      if (child.fn.method === 'GET') {
        const schema = child.fn.schema as RouteSchema | undefined;

        const keys: string[] = [base];
        const hasOptions = !!schema?.params || !!schema?.querystring;

        if (schema?.params) {
          keys.push(getKeyOptionsValue('params'));
        }

        if (schema?.querystring) {
          keys.push(getKeyOptionsValue('queryParams'));
        }

        parts.push(`${pad}${key}: (${hasOptions ? 'opts' : ''}) => [${keys.join(', ')}]`);

        continue;
      }

      parts.push(`${pad}${key}: () => [${base}]`);
      continue;
    }

    parts.push(`${pad}${key}: {
${emitKeysRuntime(child, nextPath, indent + 2)}
${pad}}`);
  }

  return parts.join(',\n');
};

const buildApiClientString = (runtime: string, queryKeys: string): string => {
  return `
export function createApi(request) {
  return {
${runtime}
  };
}

export const keys = {
${queryKeys}
};
  `;
};

const buildApiClientTypes = (typesDef: string) => {
  const types = `
type RequestOptions = {
  input?: Record<string, any>;
  queryParams?: Record<string, any>;
  params?: Record<string, any>;
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestFn = (
  method: HttpMethod,
  path: string,
  opts?: RequestOptions
) => Promise<unknown>;

export declare function createApi(request: RequestFn): {
${typesDef}
};
`;

  return types;
};

const main = () => {
  const appsFolder = import.meta.dirname.split(API_FOLDER_DIVIDER)[0];
  const outDir = path.join(appsFolder, OUTPUT_DIR);

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const nodes = generateNodes();

  const runtime = emitRuntime(nodes);
  const types = emitTypes(nodes);
  const queryKeys = emitKeysRuntime(nodes);
  const apiClientStr = buildApiClientString(runtime, queryKeys);
  const apiClientTypesStr = buildApiClientTypes(types);

  fs.writeFileSync(path.join(outDir, 'index.js'), apiClientStr.trim());
  fs.writeFileSync(path.join(outDir, 'index.d.ts'), apiClientTypesStr.trim());
};

main();
