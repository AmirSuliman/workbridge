'use client';

import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import ToolBar from './ToolBar';

const CustomTextEditor = ({
  setContent,
}: {
  setContent: (content: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
        HTMLAttributes: {
          class: 'text-blue-500',
        },
      }),
    ],
    content: '<p>Hello World! 🌎️</p>',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML()); // Pass updated content to the parent component
    },
  });

  if (!editor) {
    return null; // Return null if editor is not initialized yet
  }

  return (
    <div className="p-4 w-full">
      {/* Toolbar */}
      <ToolBar editor={editor} />
      {/* Editor */}
      <EditorContent
        editor={editor}
        className="p-8 bg-white rounded-lg border"
      />
    </div>
  );
};

export default CustomTextEditor;
