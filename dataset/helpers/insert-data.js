import { Collection } from 'mongodb';
import { logger } from './logger.js';

/**
 *
 * @param {Collection} collection
 * @param {() => Promise<any>} getData
 * @returns {Promise<import('mongodb').InsertManyResult>}
 */
export const insertDataIntoCollection = async (collection, getData) => {
  const data = await getData();
  const result = await collection.insertMany(data);

  if (result.acknowledged) {
    logger.success(
      `Inserted into ${collection.collectionName}:`,
      result.insertedCount,
    );
  }

  return result;
};
