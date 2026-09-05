import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import clipboard from 'clipboardy';
import { logger } from '~/helpers/logger.js';

const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

export class HashService {
  hash(value: string) {
    const salt = randomBytes(SALT_LENGTH);

    const hashResult = scryptSync(value, salt, KEY_LENGTH);

    return `${salt.toString('base64')}:${hashResult.toString('base64')}`;
  }

  verify(input: string, hash: string) {
    const [saltString, hashString] = hash.split(':');

    if (!saltString || !hashString) {
      return false;
    }

    const salt = Buffer.from(saltString, 'base64');
    const expectedHash = Buffer.from(hashString, 'base64');

    const actualHash = scryptSync(input, salt, expectedHash.length);

    return actualHash.length === expectedHash.length && timingSafeEqual(actualHash, expectedHash);
  }
}

const run = async () => {
  const passwordInput = process.argv[2];

  if (!passwordInput) {
    logger.error('Usage: pnpm --filter @films-collection/scripts gen-pass <PASSWORD>');
    process.exit(1);
  }

  const hashService = new HashService();

  const password = hashService.hash(passwordInput);

  await clipboard.write(password);

  logger.info('Password generated and copied to the clipboard');
};

run().catch((error) => logger.error(`Error running generate password: ${error?.message}`));
