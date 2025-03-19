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
import { ChangeEventHandler } from 'react';

const CreateAnnouncementTextEditor = ({
  body,
  previewUrl,
  setContent,
  handleFileChange,
  announcementType,
  setAnnouncementType,
}: {
  body: string;
  previewUrl: string | null;
  setContent: (content: string) => void;
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
  announcementType: string;
  setAnnouncementType: (
    value: 'Miscellaneous' | 'Policy Changes' | 'Company Activity'
  ) => void;
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
        previewUrl={previewUrl}
        handleFileChange={handleFileChange}
        announcementType={announcementType}
        setAnnouncementType={setAnnouncementType}
      />
      {/* Editor */}
      <EditorContent editor={editor} className="bg-white rounded-lg border" />
    </div>
  );
};

export default CreateAnnouncementTextEditor;
