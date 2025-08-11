export function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center text-stone-600">
          <p className="text-sm">
            © {new Date().getFullYear()} Filosofia & Reflexões. 
            Todos os direitos reservados.
          </p>
          <p className="text-xs mt-2 text-stone-500">
            Um espaço para reflexões profundas e diálogos filosóficos.
          </p>
        </div>
      </div>
    </footer>
  );
}