import { NEW_ITEM_ID } from '../constants';

type StorageKeyType = 'films' | 'state';

type StorageStateValue = 'is_authenticated' | 'is_console_menu_open';
type StorageFilmsValue = typeof NEW_ITEM_ID | number;

type StorageValues = StorageFilmsValue | StorageStateValue;

export type LocalStorageKey = `${StorageKeyType}:${StorageValues}`;
