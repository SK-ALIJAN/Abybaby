export const PersistenceStorageKey = {
    TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    LANGUAGE: 'language',
    THEME: 'theme',
} as const;

export type PersistenceStorageKey =
    typeof PersistenceStorageKey[keyof typeof PersistenceStorageKey];
