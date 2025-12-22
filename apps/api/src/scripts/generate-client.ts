import { convertCamelCaseToKebabCase } from '@films-collection/shared';
import fs from 'node:fs';
import path from 'node:path';
import type z from 'zod';
import { routers } from '~/routers';
import type { Route, RouteSchema } from '~/shared';
import { createAuxiliaryTypeStore, printNode, zodToTs } from 'zod-to-ts';

const appsFolder = import.meta.dirname.split('/api/')[0];
const outDir = path.join(appsFolder, '/web/src/generated');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const normalizePath = (path: string) => {
  return path.replace(/\/+/g, '/').replace(/\/$/, '');
};

const splitPath = (path: string) => {
  return path
    .split('/')
    .filter(Boolean)
    .filter((p) => !p.startsWith(':'));
};

const verbName = (method: string, hasParams: boolean) => {
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

type Node = {
  children: Record<string, Node>;
  fn?: {
    method: string;
    path: string;
    schema?: Route['schema'];
  };
};

const root: Node = { children: {} };

const insertRoute = (pathSegments: string[], fn: Node['fn']) => {
  let node = root;
  for (const seg of pathSegments) {
    if (!node.children[seg]) {
      node.children[seg] = { children: {} };
    }
    node = node.children[seg];
  }
  node.fn = fn;
};

for (const [prefix, routes] of Object.entries(routers)) {
  for (const route of routes) {
    const apiPath = convertCamelCaseToKebabCase(prefix);
    const fullPath = normalizePath(`/${apiPath}${route.url}`);
    const segments = splitPath(route.url);
    const hasParams = fullPath.includes(':');
    const name = verbName(route.method, hasParams);

    insertRoute([prefix, ...segments, name], {
      method: route.method,
      path: fullPath,
      schema: route.schema,
    });
  }
}

const emitRuntime = (node: Node, path: string[] = [], indent = 2): string => {
  const pad = ' '.repeat(indent);
  const lines: string[] = [];

  for (const [key, value] of Object.entries(node.children)) {
    if (value.fn) {
      const fullPath = [...path, key];
      lines.push(
        `${pad}${key}: {
${pad}  ${value.fn.method === 'GET' ? 'query' : 'mutation'}: (opts) => request('${
          value.fn.method
        }', '${value.fn.path}', opts),
${pad}  getKeys: (opts) => [${fullPath
          .map((s) => `'${s}'`)
          .join(', ')}, opts?.params, opts?.query, opts?.input],
${pad}}`,
      );
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

const emitTypes = (node: Node, path: string[] = [], indent = 2): string => {
  const pad = ' '.repeat(indent);
  const lines: string[] = [];

  for (const [key, value] of Object.entries(node.children)) {
    const fullPath = [...path, key];

    if (value.fn) {
      const action = value.fn.method === 'GET' ? 'query' : 'mutation';
      const opts = buildOptionsType(value.fn.schema);
      const responseType = buildResponseType(value.fn.schema);
      const optionsString = opts ? `opts: ${opts}` : '';

      lines.push(
        `${pad}${key}: {
          ${pad}  ${action}: (${optionsString}) => Promise<${responseType}>;
          ${pad}  getKeys: (${optionsString}) => readonly unknown[];
          ${pad}};
        `,
      );
    } else {
      lines.push(
        `${pad}${key}: {
          ${emitTypes(value, fullPath, indent + 2)}
          ${pad}
        };`,
      );
    }
  }

  return lines.join('\n');
};

const runtime = `
export function createApi(request) {
  return {
${emitRuntime(root, [], 4)},
  };
}
`;

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
${emitTypes(root, [], 2)}
};
`;

fs.writeFileSync(path.join(outDir, 'index.js'), runtime.trim());
fs.writeFileSync(path.join(outDir, 'index.d.ts'), types.trim());
