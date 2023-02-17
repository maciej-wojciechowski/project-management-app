export type ValueOf<T> = T[keyof T];

export type Nullable<T> = Record<keyof T, ValueOf<T> | null>;
