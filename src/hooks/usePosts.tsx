import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url?: string;
  author_id: string;
  upvotes: number;
  created_at: string;
  profiles?: {
    id: string;
    name: string;
    email: string;
  };
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select(`
          *,
          profiles(id, name, email)
        `)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: Omit<Post, 'id' | 'created_at' | 'profiles'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error: createError } = await supabase
        .from('posts')
        .insert([{ ...postData, author_id: user.id }])
        .select(`
          *,
          profiles(id, name, email)
        `)
        .single();

      if (createError) {
        throw createError;
      }

      setPosts(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
      throw err;
    }
  };

  const updatePost = async (id: string, updates: Partial<Post>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error: updateError } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id)
        .eq('author_id', user.id)
        .select(`
          *,
          profiles(id, name, email)
        `)
        .single();

      if (updateError) {
        throw updateError;
      }

      setPosts(prev => prev.map(post => post.id === id ? data : post));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
      throw err;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error: deleteError } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .eq('author_id', user.id);

      if (deleteError) {
        throw deleteError;
      }

      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
}

export function usePost(slug: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select(`
          *,
          profiles(id, name, email)
        `)
        .eq('slug', slug)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Post not found');
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return {
    post,
    loading,
    error,
    fetchPost,
  };
}