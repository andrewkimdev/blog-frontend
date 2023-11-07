import { environment } from 'src/environments/environment';

export const createImageUrlFromUuid = (id: string): string => {
  return `![image](${environment.baseUrl}/images/${id})`;
}
