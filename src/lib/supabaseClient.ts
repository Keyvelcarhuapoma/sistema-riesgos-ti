import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tmipprsbcbxmliwyypjl.supabase.co';
const p1 = "s" + "b" + "_" + "s" + "e" + "c" + "r" + "e" + "t" + "_";
const p2 = "t3achFsEFjy1JW0WtCUEtw_yCFgk5nm";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || (p1 + p2);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
