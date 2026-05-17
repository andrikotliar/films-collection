import { and, count, type SQL } from 'drizzle-orm';
import type { PgTable } from 'drizzle-orm/pg-core';
import type { Database } from '~/plugins/index.js';
import { getFirstValue } from '~/shared/helpers/get-first-value.js';

export const getCount = async (db: Database, table: PgTable, filters?: SQL[]) => {
  const result = await getFirstValue(
    db
      .select({ count: count() })
      .from(table)
      .where(filters ? and(...filters) : undefined),
  );

  return result?.count ?? 0;
};
