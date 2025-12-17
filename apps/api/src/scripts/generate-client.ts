import { convertCamelCaseToKebabCase } from '@films-collection/shared';
import fs from 'node:fs';
import path from 'node:path';
import { routers } from '~/routers';
import type { Route, RouteSchema } from '~/shared';

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
      const isQuery = value.fn.method === 'GET';

      const fn = `(opts) => request('${value.fn.method}', '${value.fn.path}', opts)`;

      const keyFn = isQuery
        ? `(opts) => ['${value.fn.path}', opts?.params, opts?.queryParams]`
        : `['${value.fn.path}']`;

      lines.push(`${pad}${key}: Object.assign(${fn}, { key: ${keyFn} })`);
    } else {
      lines.push(`${pad}${key}: {\n${emitRuntime(value, indent + 2)}\n${pad}}`);
    }
  }

  return lines.join(',\n');
};

const emitTypes = (node: Node, indent = 2): string => {
  const pad = ' '.repeat(indent);
  const lines: string[] = [];

  for (const [key, value] of Object.entries(node.children)) {
    if (value.fn) {
      const schema = value.fn.schema as RouteSchema;

      const schemaType = schema
        ? `{
            body: ${schema.body ? schema.body.def : 'never'};
            querystring: ${schema.querystring ? `typeof Schemas.${schema.querystring}` : 'never'};
            params: ${schema.params ? `typeof Schemas.${schema.params}` : 'never'};
            response: ${schema.response ? `typeof Schemas.${schema.response}` : 'never'};
          }`
        : 'undefined';

      lines.push(
        `${pad}${key}: (` +
          `(opts${schema ? '?' : ''}: OptsFromSchema<${schemaType}>)` +
          ` => Promise<ResponseFromSchema<${schemaType}>>` +
          `) & { key: readonly unknown[]; }`,
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
${emitRuntime(root, 4)}
  };
}
`;

const types = `
import type * as Schemas from '@films-collection/shared';

export declare function createApi(request: (
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  opts?: Partial<{
    input: Record<string, unknown>;
    queryParams: Record<string, unknown>;
    params: Record<string, unknown>;
  }>
) => Promise<unknown>): {
${emitTypes(root, 2)}
};
`;

fs.writeFileSync(path.join(outDir, 'index.js'), runtime.trim());
fs.writeFileSync(path.join(outDir, 'index.d.ts'), types.trim());
