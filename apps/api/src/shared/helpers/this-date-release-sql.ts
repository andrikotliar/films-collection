import { sql } from 'drizzle-orm';

export const thisDateReleaseSql = () => {
  return sql`EXTRACT(MONTH FROM release_date) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(DAY FROM release_date) = EXTRACT(DAY FROM CURRENT_DATE)`;
};
