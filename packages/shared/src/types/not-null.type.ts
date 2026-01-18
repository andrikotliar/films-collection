export type NotNull<T extends unknown | null> = Exclude<T, null>;
