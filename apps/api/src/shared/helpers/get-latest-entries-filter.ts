import { gte, sql } from 'drizzle-orm';
import type { PgColumn } from 'drizzle-orm/pg-core';

export const getLatestEntriesFilter = (column: PgColumn, days: number = 7) => {
  return gte(column, sql.raw(`NOW() - INTERVAL '${days} days'`));
};
