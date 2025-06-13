import {
  Message,
  MessagesWrapper,
} from '@/components/toaster-provider/components';
import { Toast, ToastType } from '@/components/toaster-provider/types';
import { ToasterContext, ToasterContextValues } from '@/contexts';
import { ReactNode, useMemo, useState } from 'react';

type ToasterProviderProps = {
  children?: ReactNode;
};

const messageTypeToTimeout: Record<ToastType, number> = {
  success: 3000,
  error: 5000,
  info: 6000,
  warning: 5000,
};

export const ToasterProvider = ({ children }: ToasterProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: ToastType, message: string) => {
    const id = Date.now();

    const newToast = {
      id,
      type,
      message,
    };

    setToasts((toasts) => [...toasts, newToast]);

    setTimeout(() => removeToast(newToast.id), messageTypeToTimeout[type]);
  };

  const removeToast = (id: number) => {
    setToasts((toasts) => {
      if (!toasts.length) {
        return [];
      }

      return toasts.filter((toast) => toast.id !== id);
    });
  };

  const providerValue = useMemo<ToasterContextValues>(() => {
    return {
      showSuccessMessage: (message) => addToast('success', message),
      showErrorMessage: (message) => addToast('error', message),
      showInfoMessage: (message) => addToast('info', message),
      showWarningMessage: (message) => addToast('warning', message),
    };
  }, []);

  return (
    <ToasterContext.Provider value={providerValue}>
      {children}
      <MessagesWrapper>
        {toasts.map((toast) => (
          <Message data={toast} key={toast.id} onRemove={removeToast} />
        ))}
      </MessagesWrapper>
    </ToasterContext.Provider>
  );
};
