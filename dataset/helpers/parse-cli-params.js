import { cliParamsMap } from '../configs/cli-params-map.js';
import { parseArrayParameter } from './parse-array-parameter.js';
import { availableCommands } from '../configs/available-commands.js';
import { logger } from './logger.js';

const getParsedValue = (value, type) => {
  if (type === 'array') {
    return parseArrayParameter(value);
  }

  if (type === 'number') {
    return Number(value);
  }

  return value;
};

const parseCliParams = () => {
  const terminalArgs = process.argv;

  if (
    terminalArgs.length <= 2 ||
    !availableCommands.includes(terminalArgs[2])
  ) {
    const commandsListString = availableCommands.join(', ');

    logger.error(
      `Error: Provide one of the available commands [${commandsListString}]`,
    );

    process.exit(0);
  }

  const params = {
    envFile: '.env',
    collections: [],
    command: terminalArgs[2],
    maxFilesNumber: 100,
  };

  if (terminalArgs.length <= 3) {
    return params;
  }

  const cliParams = terminalArgs.slice(3);

  for (const param of cliParams) {
    const [key, value] = param.split('=');

    const config = cliParamsMap[key];

    if (config && value) {
      params[config.prop] = getParsedValue(value, config.type);
    }
  }

  return params;
};

export { parseCliParams };
