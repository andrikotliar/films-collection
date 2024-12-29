import { getParsedCliValue } from './get-parsed-cli-value.js';

/**
 * @param {string[]} terminalArgs
 */
export const parseCliParams = (terminalArgs, paramsMap) => {
  const cliParams = {
    envFile: '.env',
  };

  if (terminalArgs.length <= 3) {
    return cliParams;
  }

  const args = terminalArgs.slice(3);

  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    const config = paramsMap[key];

    if (!key.startsWith('--')) {
      continue;
    }

    if (config) {
      const value =
        args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;

      const parsedValue = getParsedCliValue({ value, config, key });

      if (parsedValue !== null) {
        cliParams[config.prop] = parsedValue;
      }
    }
  }

  return cliParams;
};
