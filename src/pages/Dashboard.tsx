import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';
import { formatDate } from '../lib/utils';
import { Plus, Edit, Trash2, Eye, ThumbsUp, LogOut } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function Dashboard() {
  const { posts, loading, deletePost } = usePosts();
  const { signOut } = useAuth();

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja deletar "${title}"?`)) {
      try {
        await deletePost(id);
      } catch (error) {
        console.error('Erro ao deletar post:', error);
        alert('Erro ao deletar o post. Tente novamente.');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-stone-200 rounded w-1/3" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-stone-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Painel de Controle - Filosofia & Reflexões</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif text-stone-800 mb-2">
              Painel de Controle
            </h1>
            <p className="text-stone-600">
              Gerencie suas publicações e conteúdo
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/nova-publicacao"
              className="inline-flex items-center space-x-2 bg-stone-800 text-white px-6 py-3 rounded-lg hover:bg-stone-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Nova Publicação</span>
            </Link>
            
            <button
              onClick={signOut}
              className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-200">
            <h2 className="text-lg font-semibold text-stone-800">
              Suas Publicações ({posts.length})
            </h2>
          </div>

          {posts.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="text-lg font-medium text-stone-600 mb-2">
                Nenhuma publicação ainda
              </h3>
              <p className="text-stone-500 mb-6">
                Comece criando sua primeira reflexão filosófica
              </p>
              <Link
                to="/nova-publicacao"
                className="inline-flex items-center space-x-2 bg-stone-800 text-white px-6 py-3 rounded-lg hover:bg-stone-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Criar Primeira Publicação</span>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-stone-200">
              {posts.map((post) => (
                <div key={post.id} className="p-6 hover:bg-stone-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-stone-800 truncate">
                          {post.title}
                        </h3>
                        <div className="flex items-center space-x-1 text-sm text-stone-500">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{post.upvotes}</span>
                        </div>
                      </div>
                      
                      <p className="text-stone-600 text-sm mb-3">
                        {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-stone-500">
                        <span>Publicado em {formatDate(post.created_at)}</span>
                        <span>•</span>
                        <span>Slug: /{post.slug}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        to={`/post/${post.slug}`}
                        className="p-2 text-stone-600 hover:text-stone-800 hover:bg-stone-200 rounded-lg transition-colors"
                        title="Visualizar"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      
                      <Link
                        to={`/editar/${post.id}`}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                        title="Deletar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}