export function checkStorage(key: string): boolean {
  return localStorage.getItem(key) !== null;
}

export function saveItem(key: string, value: any[]): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function readItem(key: string): any {
  return JSON.parse(localStorage.getItem(key) as string);
}
