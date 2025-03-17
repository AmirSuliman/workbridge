import { Editor } from '@tiptap/react';
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaRedo,
  FaUndo,
} from 'react-icons/fa';
import { FaUnderline } from 'react-icons/fa6';
import { GrTextAlignCenter, GrTextAlignLeft } from 'react-icons/gr';
import { LuAlignJustify } from 'react-icons/lu';

interface ToolBarProps {
  editor: Editor;
}

const CreateJobToolBar: React.FC<ToolBarProps> = ({ editor }) => {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-3 py-1 grow-0 shrink-0 ${
          editor.isActive('bold')
            ? 'bg-blue-500 text-white'
            : 'hover:bg-gray-300'
        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
      >
        <FaBold size={14} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`px-3 py-1 grow-0 shrink-0 ${
          editor.isActive('italic')
            ? 'bg-blue-500 text-white'
            : 'hover:bg-gray-300'
        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
      >
        <FaItalic size={14} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`px-3 py-1 grow-0 shrink-0 ${
          editor.isActive('underline')
            ? 'bg-blue-500 text-white'
            : 'hover:bg-gray-300'
        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
      >
        <FaUnderline size={14} />
      </button>

      {/* Alignment Options */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign('left').run();
        }}
        className={`px-3 py-1 text-sm font-medium rounded ${
          editor.isActive({ textAlign: 'left' })
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        <GrTextAlignLeft size={14} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign('center').run();
        }}
        className={`px-3 py-1 text-sm font-medium rounded ${
          editor.isActive({ textAlign: 'center' })
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        <GrTextAlignCenter size={14} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign('justify').run();
        }}
        className={`px-3 py-1 text-sm font-medium rounded ${
          editor.isActive({ textAlign: 'justify' })
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        <LuAlignJustify size={14} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        className={`px-3 py-1 grow-0 shrink-0 ${
          editor.isActive('bulletList')
            ? 'bg-blue-500 text-white'
            : 'hover:bg-gray-300'
        }`}
      >
        <FaListUl size={14} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={`px-3 py-1 grow-0 shrink-0 ${
          editor.isActive('orderedList')
            ? 'bg-blue-500 text-white'
            : 'hover:bg-gray-300'
        }`}
      >
        <FaListOl size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="px-3 py-1 hover:bg-gray-300 text-sm font-medium rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <FaUndo size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="px-3 py-1 hover:bg-gray-300 text-sm font-medium rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <FaRedo size={14} />
      </button>
    </div>
  );
};
export default CreateJobToolBar;
