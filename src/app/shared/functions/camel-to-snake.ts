type SnakeCase<S extends string> = S extends `${infer P1}${infer P2}${infer P3}` ? (P2 extends Capitalize<P2> ? `${Lowercase<P1>}_${Lowercase<P2>}${SnakeCase<P3>}` : `${P1}${SnakeCase<`${P2}${P3}`>}`) : S;

export function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, g => `_${g.toLowerCase()}`);
}

export function convertKeysToSnakeCase<T extends Record<string, any>>(obj: any): T {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToSnakeCase(item)) as unknown as T;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[camelToSnake(key) as keyof T] = convertKeysToSnakeCase(obj[key]);
      return acc;
    }, {} as T);
  }
  return obj as T;
}
