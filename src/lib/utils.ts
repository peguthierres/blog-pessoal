export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/-+/g, '-');
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncateContent(content: string, maxLength: number = 200): string {
  const textContent = content.replace(/<[^>]*>/g, '');
  return textContent.length > maxLength 
    ? textContent.substring(0, maxLength) + '...' 
    : textContent;
}

export async function uploadImage(file: File): Promise<string | null> {
  const { supabase } = await import('./supabase');
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(fileName, file);

  if (error) {
    console.error('Upload error:', error);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(data.path);

  return publicUrl;
}