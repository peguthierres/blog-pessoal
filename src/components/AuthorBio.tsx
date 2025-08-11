import { User, MapPin, BookOpen } from 'lucide-react';

export function AuthorBio() {
  return (
    <div className="bg-stone-50 rounded-xl p-8 border border-stone-200">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-stone-300 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-stone-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-serif text-stone-800 mb-2">
            Guthierres Cavalcante
          </h3>
          
          <div className="flex items-center space-x-4 text-sm text-stone-600 mb-3">
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>Entusiasta da Filosofia</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>São Miguel Paulista, SP</span>
            </div>
          </div>
          
          <p className="text-stone-700 leading-relaxed">
            Seminarista diocesano em São Miguel Paulista, apaixonado pela busca da sabedoria 
            e pela reflexão sobre os grandes temas da existência humana. Através deste espaço, 
            compartilho pensamentos e insights sobre filosofia, espiritualidade e a jornada 
            do conhecimento.
          </p>
        </div>
      </div>
    </div>
  );
}