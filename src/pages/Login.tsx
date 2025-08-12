import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';

export function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/painel');
    }
  }, [user, navigate]);

  const handleSuccess = () => {
    navigate('/painel');
  };

  if (user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Login - Filosofia & Reflexões</title>
      </Helmet>

      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-stone-800 mb-2">
              Área do Administrador
            </h1>
            <p className="text-stone-600">
              Entre com suas credenciais para acessar o painel
            </p>
          </div>

          <AuthForm onSuccess={handleSuccess} />
        </div>
      </div>
    </>
  );
}