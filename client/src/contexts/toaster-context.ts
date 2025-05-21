import { createContext } from 'react';

type ToasterMessageHandler = (message: string) => void;

export type ToasterContextValues = {
  error: ToasterMessageHandler;
  success: ToasterMessageHandler;
  info: ToasterMessageHandler;
  warning: ToasterMessageHandler;
};

export const ToasterContext = createContext({} as ToasterContextValues);
