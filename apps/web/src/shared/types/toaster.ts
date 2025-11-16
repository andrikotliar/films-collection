export type ToastType = 'error' | 'info' | 'success' | 'warning';

export type Toast = {
  id: number;
  message: string;
  type: ToastType;
};
