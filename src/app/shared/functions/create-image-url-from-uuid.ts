import { supabase } from '../lib';

export const createImageUrlFromUuid = (id: string, mode: 'markdown' | 'html' = 'markdown'): string => {
  const { data } = supabase.storage.from('images').getPublicUrl(id);
  const url = data.publicUrl;

  if (!url) {
    return 'https://prpxpnwpzfhbitdjraol.supabase.co/storage/v1/object/public/images/430ac3f2-6b60-4b29-aa55-f0427352fe58';
  }

  console.log(data);

  return mode === 'markdown' ? `![image](${url})` : url;
}
