import type { Enum, PersonRole } from '@films-collection/shared';
import styles from './role-title.module.css';
import { personRoleToTitle } from '~/shared';

type RoleTitleProps = {
  role: Enum<typeof PersonRole>;
};

export const RoleTitle = ({ role }: RoleTitleProps) => {
  return <h3 className={styles.title}>{personRoleToTitle[role]}</h3>;
};
