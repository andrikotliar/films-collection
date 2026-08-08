import fs from 'node:fs/promises';
import path from 'node:path';

const STYLES_PATH = path.join(import.meta.dirname, '../src/main.css');
const OUTPUT_PATH = path.join(import.meta.dirname, '../src/shared/configs/css-colors.ts');

const kebabToCamel = (value: string) => {
  return value.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
};

const main = async () => {
  const textContent = await fs.readFile(STYLES_PATH, { encoding: 'utf-8' });

  const matches = textContent.match(/(?<=^|\s)--color.*?(?=;)/gm);

  if (!matches) {
    return;
  }

  const values: Record<string, string> = {};

  matches?.forEach((match) => {
    const [key] = match.split(':');

    const transformedKey = kebabToCamel(key.slice(2));

    values[transformedKey] = `var(${key})`;
  });

  const result = `// Auto-generated files, don't modify
export const colors = ${JSON.stringify(values, null, 2)} as const;

export type Colors = keyof typeof colors;   
  `;

  await fs.writeFile(OUTPUT_PATH, result, 'utf-8');
};

main();
