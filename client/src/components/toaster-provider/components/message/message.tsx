import styles from './message.module.css';
import { Toast, ToastType } from '@/components/toaster-provider/types';
import classNames from 'classnames';
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  XIcon,
} from 'lucide-react';
import { FC, ReactNode } from 'react';

type MessageProps = {
  data: Toast;
  onRemove: (id: number) => void;
};

const typeToClassName: Record<ToastType, string> = {
  error: styles.errorMessage,
  success: styles.successMessage,
  warning: styles.warningMessage,
  info: styles.infoMessage,
};

const typeToIcon: Record<ToastType, ReactNode> = {
  error: <CircleAlertIcon />,
  success: <CircleCheckIcon />,
  warning: <TriangleAlertIcon />,
  info: <InfoIcon />,
};

export const Message: FC<MessageProps> = ({ data, onRemove }) => {
  return (
    <div
      className={classNames(styles.message, typeToClassName[data.type])}
      onClick={() => onRemove(data.id)}
    >
      <div className={styles.body}>
        <div className={styles.typeIcon}>{typeToIcon[data.type]}</div>
        <div className={styles.text}>{data.message}</div>
      </div>
      <XIcon className={styles.closeIcon} size={18} />
    </div>
  );
};
