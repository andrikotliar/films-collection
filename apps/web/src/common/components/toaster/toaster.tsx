import { useEffect, useState } from 'react';
import { eventEmitter } from '~/services';
import { type Toast, type ToastType } from '~/common';
import { Message, MessagesWrapper } from './components';

const messageTypeToTimeout: Record<ToastType, number> = {
  success: 3000,
  error: 5000,
  info: 6000,
  warning: 5000,
};

export const Toaster = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = eventEmitter.on('toaster-message', (toast: Toast) => {
      setToasts((toasts) => [...toasts, toast]);

      setTimeout(() => removeToast(toast.id), messageTypeToTimeout[toast.type]);
    });

    return unsubscribe;
  }, []);

  const removeToast = (id: number) => {
    setToasts((toasts) => {
      if (!toasts.length) {
        return [];
      }

      return toasts.filter((toast) => toast.id !== id);
    });
  };

  return (
    <MessagesWrapper>
      {toasts.map((toast) => (
        <Message data={toast} key={toast.id} onRemove={removeToast} />
      ))}
    </MessagesWrapper>
  );
};
