export function pipe<T>(...fns: Array<(value: T) => T>) {
  return (x: T) => fns.reduce((v, f) => f(v), x);
}

export function toLowerCase(value: string): string {
  if (typeof value !== 'string') return value;
  return value.toLowerCase();
}

export function trim(value: string): string {
  if (typeof value !== 'string') return value;
  return value.trim();
}

export function toDate(value: string): Date {
  if (typeof value !== 'string') return value;
  const numericValue = Number(value);
  return new Date(numericValue);
}

export function toNumber(value: string): number {
  if (typeof value !== 'string') return value;
  return Number(value);
}

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
