import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePost } from '../hooks/usePosts';
import { formatDate } from '../lib/utils';
import { ShareButtons } from '../components/ShareButtons';
import { AuthorBio } from '../components/AuthorBio';
import { ThumbsUp, Share2, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Helmet } from 'react-helmet-async';

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading } = usePost(slug!);
  const navigate = useNavigate();
  const [showShareButtons, setShowShareButtons] = useState(false);
  const [upvotes, setUpvotes] = useState(0);

  useEffect(() => {
    if (post) {
      setUpvotes(post.upvotes);
    }
  }, [post]);

  const handleUpvote = async () => {
    if (!post) return;

    const { error } = await supabase
      .from('posts')
      .update({ upvotes: upvotes + 1 })
      .eq('id', post.id);

    if (!error) {
      setUpvotes(prev => prev + 1);
    }
  };

  const handleDelete = async () => {
    if (!post) return;
    
    if (window.confirm('Tem certeza que deseja deletar esta publicação?')) {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', post.id);

      if (!error) {
        navigate('/painel');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="aspect-video bg-stone-200 rounded-xl mb-8" />
          <div className="space-y-4">
            <div className="h-4 bg-stone-200 rounded w-1/3" />
            <div className="h-8 bg-stone-200 rounded" />
            <div className="space-y-2">
              <div className="h-4 bg-stone-200 rounded" />
              <div className="h-4 bg-stone-200 rounded w-5/6" />
              <div className="h-4 bg-stone-200 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-serif text-stone-600 mb-4">
          Artigo não encontrado
        </h1>
        <Link 
          to="/" 
          className="text-stone-600 hover:text-stone-800 inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar ao início
        </Link>
      </div>
    );
  }

  const currentUrl = `${window.location.origin}/post/${post.slug}`;

  return (
    <>
      <Helmet>
        <title>{post.title} - Filosofia & Reflexões</title>
        <meta name="description" content={post.content.replace(/<[^>]*>/g, '').substring(0, 160)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content.replace(/<[^>]*>/g, '').substring(0, 160)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        {post.image_url && <meta property="og:image" content={post.image_url} />}
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link 
          to="/" 
          className="text-stone-600 hover:text-stone-800 inline-flex items-center mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar ao início
        </Link>

        <article>
          {post.image_url && (
            <div className="aspect-video w-full rounded-xl overflow-hidden mb-8">
              <img 
                src={post.image_url} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <header className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-sm text-stone-500">
                <span>Por Guthierres Cavalcante</span>
                <span className="mx-2">•</span>
                <time>{formatDate(post.created_at)}</time>
              </div>
              
              <div className="flex items-center space-x-2">
                <Link
                  to={`/editar/${post.id}`}
                  className="p-2 text-stone-600 hover:text-stone-800 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleDelete}
                  className="p-2 text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h1 className="text-4xl font-serif text-stone-800 leading-tight">
              {post.title}
            </h1>
          </header>

          <div 
            className="prose prose-stone prose-lg max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="mt-12 pt-8 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <button
                onClick={handleUpvote}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                <ThumbsUp className="w-5 h-5" />
                <span className="font-medium">{upvotes}</span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowShareButtons(!showShareButtons)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-stone-800 text-white hover:bg-stone-700 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartilhar</span>
                </button>
                
                {showShareButtons && (
                  <div className="absolute right-0 top-full mt-2 z-10">
                    <ShareButtons url={currentUrl} title={post.title} />
                  </div>
                )}
              </div>
            </div>
          </footer>
        </article>

        <div className="mt-16 pt-8 border-t border-stone-200">
          <AuthorBio />
        </div>
      </div>
    </>
  );
}