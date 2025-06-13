import { ToastType } from '@/components/toaster-provider/types';
import { createContext } from 'react';

type ToasterMessageHandler = (message: string) => void;

type ToasterHandlerKey = `show${Capitalize<ToastType>}Message`;

export type ToasterContextValues = {
  [key in ToasterHandlerKey]: ToasterMessageHandler;
};

export const ToasterContext = createContext({} as ToasterContextValues);
