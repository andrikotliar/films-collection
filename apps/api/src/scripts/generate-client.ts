import { convertCamelCaseToKebabCase } from '@films-collection/shared';
import fs from 'node:fs';
import path from 'node:path';
import { routers } from '~/routers';
import type { Route } from '~/shared';

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

const typeHeader = `
import type { z } from "zod";

type RouteSchema = {
  body?: z.ZodTypeAny;
  querystring?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
  response?: z.ZodTypeAny;
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type OptsFromSchema<S extends RouteSchema | undefined> = S extends undefined
  ? undefined
  : {
      input: S extends { body: z.ZodTypeAny } ? z.infer<S["body"]> : never;
      queryParams: S extends { querystring: z.ZodTypeAny } ? z.infer<S["querystring"]> : never;
      params: S extends { params: z.ZodTypeAny } ? z.infer<S["params"]> : never;
    } extends infer O
  ? { [K in keyof O as O[K] extends never ? never : K]: O[K] }
  : never;

type ResponseFromSchema<S extends RouteSchema | undefined> =
  S extends { response: z.ZodTypeAny } ? z.infer<S["response"]> : unknown;

type RequestFn = <S extends RouteSchema | undefined>(
  method: HttpMethod,
  path: string,
  opts?: OptsFromSchema<S>
) => Promise<ResponseFromSchema<S>>;
`;

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
      lines.push(`${pad}${key}: (opts) => request('${value.fn.method}', '${value.fn.path}', opts)`);
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
      lines.push(
        `${pad}${key}: (` +
          `(opts${value.fn.schema ? '?' : ''}: OptsFromSchema<${JSON.stringify(
            value.fn.schema,
          )}>)` +
          ` => Promise<ResponseFromSchema<${JSON.stringify(value.fn.schema)}>>` +
          `) & { path: string }`,
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
${typeHeader}

export declare function createApi(request: RequestFn): {
${emitTypes(root, 2)}
};
`;

fs.writeFileSync(path.join(outDir, 'index.js'), runtime.trim());
fs.writeFileSync(path.join(outDir, 'index.d.ts'), types.trim());
