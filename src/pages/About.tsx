import { BookOpen, Heart, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { AuthorBio } from '../components/AuthorBio';

export function About() {
  return (
    <>
      <Helmet>
        <title>Sobre - Filosofia & Reflexões</title>
        <meta name="description" content="Conheça mais sobre o Filosofia & Reflexões, um espaço dedicado ao pensamento profundo e diálogo intelectual." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-stone-800 mb-4">
            Sobre este espaço
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            Um lugar para contemplação, reflexão e diálogo sobre os grandes temas da existência humana.
          </p>
        </div>

        <div className="mb-12">
          <AuthorBio />
        </div>

        <div className="prose prose-stone prose-lg max-w-none text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-stone-600" />
              </div>
              <h3 className="font-serif text-xl text-stone-800 mb-2">Conhecimento</h3>
              <p className="text-stone-600">
                Exploramos ideias que moldaram o pensamento humano ao longo da história.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-stone-600" />
              </div>
              <h3 className="font-serif text-xl text-stone-800 mb-2">Reflexão</h3>
              <p className="text-stone-600">
                Um espaço para contemplar os significados profundos da vida e da experiência humana.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-stone-600" />
              </div>
              <h3 className="font-serif text-xl text-stone-800 mb-2">Diálogo</h3>
              <p className="text-stone-600">
                Promovemos o intercâmbio respeitoso de ideias e perspectivas diferentes.
              </p>
            </div>
          </div>

          <div className="bg-stone-50 rounded-xl p-8 mb-8">
            <h2 className="font-serif text-2xl text-stone-800 mb-4">Nossa missão</h2>
            <p className="text-stone-700 leading-relaxed mb-4">
              O <strong>Filosofia & Reflexões</strong> nasce da convicção de que o pensamento crítico 
              e a reflexão profunda são fundamentais para uma vida plena e consciente. Em um mundo 
              acelerado, criamos um espaço de pausa e contemplação.
            </p>
            <p className="text-stone-700 leading-relaxed">
              Aqui, exploramos questões fundamentais sobre a existência, a ética, a natureza da 
              realidade e o significado da vida humana. Cada artigo é um convite à reflexão pessoal 
              e ao diálogo construtivo.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-stone-800 mb-4">O que você encontrará</h2>
            <ul className="space-y-2 text-stone-700">
              <li><strong>Reflexões originais</strong> sobre temas universais da filosofia</li>
              <li><strong>Análises contemporâneas</strong> de questões éticas e morais</li>
              <li><strong>Explorações</strong> sobre consciência, identidade e propósito</li>
              <li><strong>Diálogos</strong> sobre filosofia aplicada ao cotidiano</li>
              <li><strong>Pensamentos</strong> sobre arte, beleza e expressão humana</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <blockquote className="text-xl font-serif text-stone-700 italic border-l-4 border-stone-300 pl-6">
            "A filosofia não é um luxo do pensamento, mas uma necessidade da alma humana 
            em busca de compreensão e significado."
          </blockquote>
        </div>
      </div>
    </>
  );
}