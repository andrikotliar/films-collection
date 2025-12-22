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

const emitRuntime = (node: Node, indent = 2): string => {
  const pad = ' '.repeat(indent);
  const lines: string[] = [];

  for (const [key, value] of Object.entries(node.children)) {
    if (value.fn) {
      const fn = `(opts) => request('${value.fn.method}', '${value.fn.path}', opts)`;

      lines.push(`${pad}${key}: ${fn}`);
    } else {
      lines.push(`${pad}${key}: {\n${emitRuntime(value, indent + 2)}\n${pad}}`);
    }
  }

  return lines.join(',\n');
};

const emitKeysRuntime = (node: Node, path: string[] = [], indent = 2): string => {
  const pad = ' '.repeat(indent);
  const parts: string[] = [];

  for (const [key, child] of Object.entries(node.children)) {
    const nextPath = [...path, key];

    if (child.fn) {
      const schema = child.fn.schema as RouteSchema;
      const base = nextPath.map((p) => `'${p}'`).join(', ');

      const hasParams = !!schema?.params;
      const hasQuery = !!schema?.querystring;
      const hasOptions = hasParams || hasQuery;

      if (child.fn.method === 'GET') {
        parts.push(
          `${pad}${key}: (${hasOptions ? 'opts' : ''}) => [
${pad}  ${base}${
            hasOptions
              ? `,
${pad}  { ${hasParams ? 'params: opts?.params,' : ''} ${hasQuery ? 'query: opts?.query' : ''} }`
              : ''
          }
${pad}]`,
        );
        continue;
      }

      parts.push(`${pad}${key}: () => [${base}]`);
      continue;
    }

    parts.push(
      `${pad}${key}: {
${emitKeysRuntime(child, nextPath, indent + 2)}
${pad}}`,
    );
  }

  return parts.join(',\n');
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

const emitTypes = (node: Node, indent = 2): string => {
  const pad = ' '.repeat(indent);
  const lines: string[] = [];

  for (const [key, value] of Object.entries(node.children)) {
    if (value.fn) {
      const optionsType = buildOptionsType(value.fn.schema);

      lines.push(
        `${pad}${key}: (${
          optionsType ? `opts: ${optionsType}` : ''
        }) => Promise<${buildResponseType(value.fn.schema)}>`,
      );
    } else {
      lines.push(`${pad}${key}: {\n${emitTypes(value, indent + 2)}\n${pad}}`);
    }
  }

  return lines.join(';\n');
};

const runtime = `
export function createApi(request) {
  return {
${emitRuntime(root, 4)},
    keys: {
${emitKeysRuntime(root, [], 6)}
    }
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
${emitTypes(root, 2)}
};
`;

fs.writeFileSync(path.join(outDir, 'index.js'), runtime.trim());
fs.writeFileSync(path.join(outDir, 'index.d.ts'), types.trim());
