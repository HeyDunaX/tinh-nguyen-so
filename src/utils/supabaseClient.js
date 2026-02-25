import { createClient } from '@supabase/supabase-js';

// Sử dụng biến môi trường để bảo mật, tránh lộ key khi push GitHub
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
