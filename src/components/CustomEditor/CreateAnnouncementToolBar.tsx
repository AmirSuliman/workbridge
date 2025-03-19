import {
  FaBold,
  FaImage,
  FaItalic,
  FaListOl,
  FaListUl,
  FaRedo,
  FaUndo,
} from 'react-icons/fa';
import { GrTextAlignCenter, GrTextAlignLeft } from 'react-icons/gr';
import { LuAlignJustify } from 'react-icons/lu';
import { MdLink, MdLinkOff } from 'react-icons/md';
import { Editor } from '@tiptap/react'; // Import the Editor type from TipTap
import { FaUnderline } from 'react-icons/fa6';
import Image from 'next/image';
import { ChangeEventHandler } from 'react';

interface ToolBarProps {
  editor: Editor;
  previewUrl: string | null;
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
  announcementType: string;
  setAnnouncementType: (
    value: 'Miscellaneous' | 'Policy Changes' | 'Company Activity'
  ) => void;
}

const CreateAnnouncementToolBar: React.FC<ToolBarProps> = ({
  editor,
  previewUrl,
  handleFileChange,
  announcementType,
  setAnnouncementType,
}) => {
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
      <label
        htmlFor="policyImg"
        className={`px-3 py-1 grow-0 shrink-0 rounded flex items-center justify-center ${
          previewUrl ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'
        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
      >
        <FaImage size={18} />
        <input
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          name="fileId"
          id="policyImg"
          className="hidden"
        />
      </label>
      <div className="flex flex-row gap-3 items-center ml-auto mr-0">
        <label
          onClick={() => {
            setAnnouncementType('Company Activity');
          }}
          className={`${
            announcementType === 'Company Activity'
              ? 'opacity-100'
              : 'opacity-50'
          } p-2 cursor-pointer bg-[#0F172A] rounded-full`}
        >
          <Image
            src="/Union.png"
            alt="Company Activity"
            width={20}
            height={20}
          />
        </label>
        <label
          onClick={() => {
            setAnnouncementType('Miscellaneous');
          }}
          className={`${
            announcementType === 'Miscellaneous' ? 'opacity-100' : 'opacity-50'
          } p-2 cursor-pointer bg-[#00B87D] rounded-full`}
        >
          <Image
            src="/important_details.png"
            alt="Miscellaneous"
            width={20}
            height={20}
          />
        </label>
        <label
          onClick={() => {
            setAnnouncementType('Policy Changes');
          }}
          className={`${
            announcementType === 'Policy Changes' ? 'opacity-100' : 'opacity-50'
          } p-2 cursor-pointer bg-[#F53649] mr-0 sm:mr-4 rounded-full`}
        >
          <Image
            src="/important_details.png"
            alt="Policy Changes"
            width={20}
            height={20}
          />
        </label>
      </div>
    </div>
  );
};
export default CreateAnnouncementToolBar;
