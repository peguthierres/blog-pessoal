import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          image_url: string | null;
          author_id: string;
          created_at: string;
          upvotes: number;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: string;
          image_url?: string | null;
          author_id: string;
          created_at?: string;
          upvotes?: number;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string;
          image_url?: string | null;
          author_id?: string;
          created_at?: string;
          upvotes?: number;
        };
      };
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          created_at?: string;
        };
      };
    };
  };
};