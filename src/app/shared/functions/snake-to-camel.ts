type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}` ? `${P1}${Capitalize<P2>}${CamelCase<P3>}` : S;

export function snakeToCamel(str: string): string {
  return str.replace(/([-_]\w)/g, g => g[1].toUpperCase());
}

export function convertKeysToCamelCase<T extends Record<string, any>>(obj: any): T {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToCamelCase(item)) as unknown as T;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[snakeToCamel(key) as keyof T] = convertKeysToCamelCase(obj[key]);
      return acc;
    }, {} as T);
  }
  return obj as T;
}
