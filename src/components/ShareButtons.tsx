import { Mail, Facebook, MessageCircle } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    email: `mailto:?subject=${encodedTitle}&body=Confira este artigo: ${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
  };

  return (
    <div className="bg-white border border-stone-200 rounded-lg shadow-lg p-3 min-w-[200px]">
      <div className="space-y-2">
        <a
          href={shareLinks.email}
          className="flex items-center space-x-3 p-2 hover:bg-stone-50 rounded-lg transition-colors"
        >
          <Mail className="w-4 h-4 text-stone-600" />
          <span className="text-sm text-stone-700">Email</span>
        </a>
        
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-2 hover:bg-stone-50 rounded-lg transition-colors"
        >
          <Facebook className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-stone-700">Facebook</span>
        </a>
        
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-2 hover:bg-stone-50 rounded-lg transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm text-stone-700">WhatsApp</span>
        </a>
        
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-2 hover:bg-stone-50 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span className="text-sm text-stone-700">X (Twitter)</span>
        </a>
      </div>
    </div>
  );
}