'use client';

import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ToolBar from './ToolBar';

const CustomTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
      }),
    ],
    content: '<p>Hello World! 🌎️</p>',
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
        className="border border-gray-300 p-4 rounded bg-white focus:outline-none w-full"
      />
    </div>
  );
};

export default CustomTextEditor;
