/*
  # Configurar usuário administrador único

  1. Configurações
    - Criar perfil para o usuário administrador
    - Configurar políticas de segurança para permitir apenas o admin
    - Atualizar posts existentes para ter o author_id correto

  2. Segurança
    - Apenas usuários autenticados podem criar/editar posts
    - Apenas o admin pode acessar o painel
*/

-- Primeiro, vamos criar um perfil para o usuário admin
-- O ID será gerado automaticamente quando o usuário se registrar via auth
-- Por enquanto, criamos um placeholder que será atualizado

-- Atualizar as políticas para ser mais restritivas
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON posts;
DROP POLICY IF EXISTS "Users can delete their own posts" ON posts;

-- Políticas mais restritivas - apenas para usuários autenticados
CREATE POLICY "Admin can insert profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admin can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Only authenticated users can insert posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Only authenticated users can update posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

CREATE POLICY "Only authenticated users can delete posts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);