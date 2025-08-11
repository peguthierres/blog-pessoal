import { Link } from 'react-router-dom';
import { ThumbsUp, Share2 } from 'lucide-react';
import { Post } from '../hooks/usePosts';
import { formatDate, truncateContent } from '../lib/utils';
import { ShareButtons } from './ShareButtons';
import { useState } from 'react';

interface PostCardProps {
  post: Post;
  onUpvote: (postId: string) => void;
}

export function PostCard({ post, onUpvote }: PostCardProps) {
  const [showShareButtons, setShowShareButtons] = useState(false);

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    onUpvote(post.id);
  };

  const toggleShareButtons = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowShareButtons(!showShareButtons);
  };

  return (
    <article className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link to={`/post/${post.slug}`}>
        {post.image_url && (
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={post.image_url} 
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center text-sm text-stone-500 mb-3">
            <span>Por {post.profiles?.name}</span>
            <span className="mx-2">•</span>
            <time>{formatDate(post.created_at)}</time>
          </div>
          
          <h2 className="text-2xl font-serif text-stone-800 mb-3 leading-tight hover:text-stone-600 transition-colors">
            {post.title}
          </h2>
          
          <p className="text-stone-600 leading-relaxed mb-4">
            {truncateContent(post.content, 150)}
          </p>
          
          <div className="flex items-center justify-between">
            <button
              onClick={handleUpvote}
              className="inline-flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm font-medium">{post.upvotes}</span>
            </button>
            
            <div className="relative">
              <button
                onClick={toggleShareButtons}
                className="inline-flex items-center space-x-1 text-stone-600 hover:text-stone-800 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Compartilhar</span>
              </button>
              
              {showShareButtons && (
                <div className="absolute right-0 top-full mt-2 z-10">
                  <ShareButtons 
                    url={`${window.location.origin}/post/${post.slug}`}
                    title={post.title}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}