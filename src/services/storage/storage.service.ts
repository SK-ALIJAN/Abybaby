type StorageType = 'local' | 'session';

class StorageService {
    private getStorage(type: StorageType): Storage {
        return type === 'local' ? localStorage : sessionStorage;
    }

    set<T>(
        type: StorageType,
        key: string,
        value: T
    ): void {
        try {
            const storage = this.getStorage(type);
            storage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Storage set error:', error);
        }
    }

    get<T>(
        type: StorageType,
        key: string
    ): T | null {
        try {
            const storage = this.getStorage(type);
            const value = storage.getItem(key);
            return value ? JSON.parse(value) as T : null;
        } catch (error) {
            console.error('Storage get error:', error);
            return null;
        }
    }

    remove(type: StorageType, key: string): void {
        try {
            const storage = this.getStorage(type);
            storage.removeItem(key);
        } catch (error) {
            console.error('Storage remove error:', error);
        }
    }

    clear(type: StorageType): void {
        try {
            const storage = this.getStorage(type);
            storage.clear();
        } catch (error) {
            console.error('Storage clear error:', error);
        }
    }
}

export const storageService = new StorageService();
