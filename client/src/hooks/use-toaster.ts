import { ToasterContext } from '@/contexts';
import { useContext } from 'react';

export const useToaster = () => useContext(ToasterContext);
