import { type PropsWithChildren } from 'react';
import styles from "./links-group-wrapper.module.css";

export const LinksGroupWrapper = ({ children }: PropsWithChildren) => {
  return <div className={styles.links_group_wrapper}>{children}</div>;
};
