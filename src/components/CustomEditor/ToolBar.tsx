import { FaBold, FaItalic, FaRedo, FaUndo } from 'react-icons/fa';
import { GrTextAlignCenter, GrTextAlignLeft } from 'react-icons/gr';
import { LuAlignJustify } from 'react-icons/lu';
import { MdLink, MdLinkOff } from 'react-icons/md';
import { Editor } from '@tiptap/react'; // Import the Editor type from TipTap
import { FaUnderline } from 'react-icons/fa6';

interface ToolBarProps {
  editor: Editor; // Define the editor prop type
}

const ToolBar: React.FC<ToolBarProps> = ({ editor }) => {
  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
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
        onClick={() => editor.chain().focus().toggleItalic().run()}
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
        onClick={() => editor.chain().focus().toggleUnderline().run()}
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
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`px-3 py-1 text-sm font-medium rounded ${
          editor.isActive({ textAlign: 'left' })
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        <GrTextAlignLeft size={14} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`px-3 py-1 text-sm font-medium rounded ${
          editor.isActive({ textAlign: 'center' })
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        <GrTextAlignCenter size={14} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`px-3 py-1 text-sm font-medium rounded ${
          editor.isActive({ textAlign: 'justify' })
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        <LuAlignJustify size={14} />
      </button>
      <button
        onClick={setLink}
        className="px-3 py-1 text-sm font-medium rounded bg-gray-200 hover:bg-gray-300"
      >
        <MdLink size={14} />
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
        className="px-3 py-1 text-sm font-medium rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <MdLinkOff size={14} />
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="px-3 py-1 hover:bg-gray-300 text-sm font-medium rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <FaUndo size={14} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="px-3 py-1 hover:bg-gray-300 text-sm font-medium rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <FaRedo size={14} />
      </button>
      <div className="flex flex-row gap-3 items-center ">
        <div className="p-2 bg-[#0F172A] rounded-full">
          <img src="/Union.png" alt="img" />
        </div>
        <div className="p-2 bg-[#00B87D] rounded-full">
          <img src="/important_details.png" alt="img" />
        </div>
        <div className="p-2 bg-[#F53649] mr-0 sm:mr-4 rounded-full">
          <img src="/important_details.png" alt="img" />
        </div>
      </div>
    </div>
  );
};
export default ToolBar;
