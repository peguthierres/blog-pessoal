import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';

export function Login() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSuccess = () => {
    navigate('/');
  };

  if (user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{mode === 'login' ? 'Login' : 'Criar conta'} - Filosofia & Reflexões</title>
      </Helmet>

      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-stone-800 mb-2">
              {mode === 'login' ? 'Bem-vindo de volta' : 'Junte-se a nós'}
            </h1>
            <p className="text-stone-600">
              {mode === 'login' 
                ? 'Entre para compartilhar suas reflexões' 
                : 'Crie sua conta e comece a publicar'
              }
            </p>
          </div>

          <AuthForm mode={mode} onSuccess={handleSuccess} />

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-stone-600 hover:text-stone-800 transition-colors"
            >
              {mode === 'login' 
                ? 'Não tem conta? Criar conta' 
                : 'Já tem conta? Fazer login'
              }
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
            >
              ← Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}