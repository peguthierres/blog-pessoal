import { Link } from 'react-router-dom';
import { BookOpen, PenTool } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-stone-700" />
            <div>
              <h1 className="text-2xl font-serif text-stone-800">
                Filosofia & Reflexões
              </h1>
              <p className="text-sm text-stone-600">
                Por Guthierres Cavalcante
              </p>
            </div>
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-stone-700 hover:text-stone-900 transition-colors"
            >
              Início
            </Link>
            <Link 
              to="/sobre" 
              className="text-stone-700 hover:text-stone-900 transition-colors"
            >
              Sobre
            </Link>
            <Link 
              to="/painel" 
              className="inline-flex items-center space-x-2 bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
            >
              <PenTool className="w-4 h-4" />
              <span>Painel</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}