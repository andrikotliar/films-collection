import { FC, PropsWithChildren } from 'react';

import styles from './TitleRow.module.css';

const TitleRow: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.titleRow}>{children}</div>;
};

export { TitleRow };
