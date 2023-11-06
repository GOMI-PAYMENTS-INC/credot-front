export const useSessionStorage = {
  getItem: (key: string): any | null => {
    const item = sessionStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return null;
  },
  setItem: (key: string, value: any): void => {
    const stringifiedItem = JSON.stringify(value);
    sessionStorage.setItem(key, stringifiedItem);
    if (sessionStorage.getItem(key) !== null) {
      console.log(`${key} has been stored item into SessionStorage`);
    } else {
      throw new Error();
    }
  },
  removeItem: (key: string): string | void => {
    const storedItem = sessionStorage.getItem(key);
    if (storedItem !== null) {
      sessionStorage.removeItem(key);
      return storedItem;
    }
  },
  initializeItems: (): void => {
    sessionStorage.clear();
  },
};
