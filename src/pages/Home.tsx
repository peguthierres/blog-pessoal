import { PostCard } from '../components/PostCard';
import { usePosts } from '../hooks/usePosts';
import { BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function Home() {
  const { posts, loading, upvotePost } = usePosts();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-stone-100 overflow-hidden animate-pulse">
              <div className="aspect-video bg-stone-200" />
              <div className="p-6 space-y-4">
                <div className="h-4 bg-stone-200 rounded w-1/3" />
                <div className="h-6 bg-stone-200 rounded" />
                <div className="space-y-2">
                  <div className="h-4 bg-stone-200 rounded" />
                  <div className="h-4 bg-stone-200 rounded w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Filosofia & Reflexões - Blog sobre pensamento e vida</title>
        <meta name="description" content="Um espaço para reflexões profundas sobre filosofia, vida e existência. Explore ideias que transformam perspectivas." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-stone-400 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-stone-600 mb-2">
              Ainda não há publicações
            </h2>
            <p className="text-stone-500">
              As primeiras reflexões filosóficas aparecerão em breve.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-serif text-stone-800 mb-4">
                Reflexões Filosóficas
              </h1>
              <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
                Explore pensamentos profundos sobre vida, existência e o significado das coisas.
                Um espaço para contemplação e diálogo intelectual.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onUpvote={upvotePost}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}