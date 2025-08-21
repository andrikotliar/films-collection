import { type ToastType } from '@/components/toaster-provider/types';
import { createContext } from 'react';

type ToasterMessageHandler = (message: string) => void;

export type ToasterContextValues = {
  [key in ToastType]: ToasterMessageHandler;
};

export const ToasterContext = createContext({} as ToasterContextValues);
