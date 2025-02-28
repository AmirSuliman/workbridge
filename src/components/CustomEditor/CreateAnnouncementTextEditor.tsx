'use client';

import BulletList from '@tiptap/extension-bullet-list';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CreateAnnouncementToolBar from './CreateAnnouncementToolBar';

const CreateAnnouncementTextEditor = ({
  body,
  setContent,
  setAnnouncementType,
}: {
  body: string;
  setContent: (content: string) => void;
  setAnnouncementType: (type: string) => void;
}) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
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
    content: body,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="p-4 w-full">
      {/* Toolbar */}
      <CreateAnnouncementToolBar
        editor={editor}
        setAnnouncementType={setAnnouncementType}
      />
      {/* Editor */}
      <EditorContent editor={editor} className="bg-white rounded-lg border" />
    </div>
  );
};

export default CreateAnnouncementTextEditor;
