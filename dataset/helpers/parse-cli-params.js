import { cliParamsMap } from '../configs/cli-params-map.js';
import { defaultCliParams } from '../configs/default-cli-params.js';

const parseCliParams = () => {
  const params = process.argv;

  if (params.length <= 2) {
    return defaultCliParams;
  }

  const cliParams = params.slice(2);
  const parsedParams = {};

  for (const param of cliParams) {
    const [key, value] = param.split('=');

    const mapKey = cliParamsMap[key];

    if (mapKey && value) {
      parsedParams[mapKey] = value;
    }
  }

  if (!Object.keys(parsedParams).length) {
    return defaultCliParams;
  }

  return parsedParams;
};

export { parseCliParams };
