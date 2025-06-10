type StorageKeyType = 'films' | 'state';

type StorageStateValue = 'is_authenticated' | 'is_console_menu_open';
type StorageFilmsValue = 'last_visited' | 'new' | number;

type StorageValues = StorageFilmsValue | StorageStateValue;

export type LocalStorageKey = `${StorageKeyType}:${StorageValues}`;
