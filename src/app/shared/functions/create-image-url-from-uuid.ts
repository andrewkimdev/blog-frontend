import { environment } from 'src/environments/environment';

export const createImageUrlFromUuid = (id: string, mode: 'markdown' | 'html' = 'markdown'): string => {
  const url = `${environment.baseUrl}/images/${id}`;
  if (mode === 'markdown') {
    return `![image](${environment.baseUrl}/images/${id})`;
  } else {
    return url;
  }
}
