import { RouterCreator } from 'src/common';
import { InitialDataController } from 'src/modules/initial-data/initial-data.controller';

export const createInitialDataRouter: RouterCreator<InitialDataController> = (
  controller,
) => {
  return async (initialDataModule) => {
    initialDataModule.route({
      method: 'GET',
      url: '/',
      handler: controller.getConfig.bind(controller),
    });
  };
};
