const store = {} as { [key: string]: any };
export default {
  setItem(key: string, value: any) {
    store[key] = value;
  },
  getItem(key: string): any {
    return store[key];
  },
};
