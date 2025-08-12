import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { PostEditor } from '../components/PostEditor';
import { uploadImage } from '../lib/utils';
import { generateSlug } from '../lib/utils';
import { Upload, Save, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { createPost } = usePosts();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSave = async (title: string, content: string, imageUrl: string | null) => {
    try {
      const slug = generateSlug(title);
      
      const post = await createPost({
        title,
        slug,
        content,
        image_url: imageUrl,
        author_id: '', // Will be set by createPost
        upvotes: 0,
      });
      
      navigate(`/post/${post.slug}`);
    } catch (err) {
      console.error('Erro ao salvar:', err);
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      let imageUrl = null;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          setError('Erro ao fazer upload da imagem');
          setLoading(false);
          return;
        }
      }

      await handleSave(title, content, imageUrl);
    } catch (err) {
      setError('Erro inesperado ao salvar a publicação');
    }

    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Nova Publicação - Filosofia & Reflexões</title>
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
            Nova Publicação
          </h1>
          <p className="text-stone-600">
            Compartilhe suas reflexões filosóficas com o mundo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-stone-700 mb-2">
              Título da publicação
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent text-lg"
              placeholder="Digite o título da sua reflexão..."
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-stone-700 mb-2">
              Imagem de capa (opcional)
            </label>
            <div className="flex items-center">
              <label className="flex items-center space-x-2 px-4 py-2 border border-stone-300 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Escolher imagem</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {imageFile && (
                <span className="ml-3 text-sm text-stone-600">
                  {imageFile.name}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Conteúdo
            </label>
            <PostEditor content={content} onChange={setContent} />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !title.trim() || !content.trim()}
              className="inline-flex items-center px-6 py-3 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Salvando...' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}