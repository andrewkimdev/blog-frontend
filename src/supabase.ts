import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

const supabaseUrl = environment.supabase.SUPABASE_URL;
const supabaseAnonKey = environment.supabase.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
