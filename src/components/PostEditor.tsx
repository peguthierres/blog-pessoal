import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Link as LinkIcon,
  Image as ImageIcon,
  Type,
  Heading2
} from 'lucide-react';

interface PostEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function PostEditor({ content, onChange }: PostEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('URL do link:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('URL da imagem:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border border-stone-200 rounded-lg overflow-hidden">
      <div className="border-b border-stone-200 p-3 bg-stone-50">
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded hover:bg-stone-200 transition-colors ${
              editor.isActive('heading', { level: 2 }) ? 'bg-stone-200' : ''
            }`}
          >
            <Heading2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`p-2 rounded hover:bg-stone-200 transition-colors ${
              editor.isActive('paragraph') ? 'bg-stone-200' : ''
            }`}
          >
            <Type className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-stone-300" />

          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-stone-200 transition-colors ${
              editor.isActive('bold') ? 'bg-stone-200' : ''
            }`}
          >
            <Bold className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-stone-200 transition-colors ${
              editor.isActive('italic') ? 'bg-stone-200' : ''
            }`}
          >
            <Italic className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-stone-300" />
          
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-stone-200 transition-colors ${
              editor.isActive('bulletList') ? 'bg-stone-200' : ''
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-stone-200 transition-colors ${
              editor.isActive('orderedList') ? 'bg-stone-200' : ''
            }`}
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-stone-200 transition-colors ${
              editor.isActive('blockquote') ? 'bg-stone-200' : ''
            }`}
          >
            <Quote className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-stone-300" />
          
          <button
            onClick={addLink}
            className="p-2 rounded hover:bg-stone-200 transition-colors"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          
          <button
            onClick={addImage}
            className="p-2 rounded hover:bg-stone-200 transition-colors"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <EditorContent 
        editor={editor} 
        className="min-h-[400px] p-4 prose prose-stone max-w-none focus:outline-none"
      />
    </div>
  );
}