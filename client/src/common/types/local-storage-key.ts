import { type NEW_ITEM_ID } from '../constants';

type StorageFilmsValue = typeof NEW_ITEM_ID | number | string;

export type LocalStorageKey = 'is_console_menu_open' | 'auth_exp' | `film_${StorageFilmsValue}`;
