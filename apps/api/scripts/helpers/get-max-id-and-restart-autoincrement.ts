import { max, sql } from 'drizzle-orm';
import type { PgColumn, PgTableWithColumns, PgTransaction } from 'drizzle-orm/pg-core';

type AnyTable = {
  name: string;
  columns: { id: PgColumn; [key: string]: any };
  schema: undefined;
  dialect: 'pg';
};

export const getMaxIdAndRestartAutoIncrement = async (
  transaction: PgTransaction<any, any, any>,
  table: PgTableWithColumns<AnyTable>,
  tableName: string,
) => {
  const result = await transaction.select({ maxId: max(table.id) }).from(table);

  const maxId = (result[0]?.maxId as number) ?? 0;

  await transaction.execute(
    sql.raw(`ALTER SEQUENCE "${tableName}_id_seq" RESTART WITH ${maxId + 1}`),
  );
};
