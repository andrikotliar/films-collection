import { HashService } from '~/modules/hash/hash.service.js';
import { logger } from './helpers/logger.js';

const run = () => {
  const desiredPassword = process.argv[2];
  const hashService = new HashService();

  if (!desiredPassword) {
    logger.error('Usage: pnpm --filter api gen:pwd <PASSWORD>');
    return;
  }

  try {
    const result = hashService.hash(desiredPassword);

    logger.success(result);
    process.exit(0);
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
    process.exit(1);
  }
};

run();
