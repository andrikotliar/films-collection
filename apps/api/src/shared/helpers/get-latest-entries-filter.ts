import { gte, sql } from 'drizzle-orm';
import type { PgColumn } from 'drizzle-orm/pg-core';

export const getLatestEntriesFilter = (column: PgColumn) => {
  return gte(column, sql`NOW() - INTERVAL '7 days'`);
};
