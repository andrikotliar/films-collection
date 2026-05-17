import type { CommonListQueryParams } from '@films-collection/shared';
import { ilike, type SQL } from 'drizzle-orm';
import type { PgColumn, PgTableWithColumns } from 'drizzle-orm/pg-core';
import { sqlSearchQuery } from '~/shared/helpers/sql-search-query.js';

type AnyTable = {
  name: any;
  columns: { id: PgColumn; title: PgColumn };
  schema: undefined;
  dialect: 'pg';
};

type Table = PgTableWithColumns<AnyTable>;

export const mapCommonFilters = <TTable extends Table>(
  queries: CommonListQueryParams,
  table: TTable,
): SQL[] => {
  const filters: SQL[] = [];

  const { q } = queries;

  if (q) {
    filters.push(ilike(table.title, sqlSearchQuery(q)));
  }

  return filters;
};
