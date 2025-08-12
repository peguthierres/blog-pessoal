import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { PostEditor } from '../components/PostEditor';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

import { Post } from '../hooks/usePosts';

export function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { updatePost } = usePosts();

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const { supabase } = await import('../lib/supabase');
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles(id, name, email)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Erro ao carregar post:', error);
      navigate('/painel');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (title: string, content: string, imageUrl: string | null) => {
    if (!post) return;

    try {
      await updatePost(post.id, {
        title,
        content,
        image_url: imageUrl,
      });

      navigate('/painel');
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-stone-200 rounded w-1/3" />
          <div className="h-64 bg-stone-200 rounded" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-serif text-stone-600 mb-4">
          Post não encontrado
        </h1>
        <button 
          onClick={() => navigate('/painel')}
          className="text-stone-600 hover:text-stone-800 inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar ao painel
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Editar: {post.title} - Filosofia & Reflexões</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/painel')}
          className="text-stone-600 hover:text-stone-800 inline-flex items-center mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar ao painel
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-serif text-stone-800 mb-2">
            Editar Publicação
          </h1>
          <p className="text-stone-600">
            Faça as alterações necessárias em sua reflexão
          </p>
        </div>

        <PostEditor
          initialTitle={post.title}
          initialContent={post.content}
          initialImageUrl={post.image_url}
          onSave={handleSave}
          submitText="Salvar Alterações"
        />
      </div>
    </>
  );
}