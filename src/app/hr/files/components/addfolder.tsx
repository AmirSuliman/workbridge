import { FaTimes } from 'react-icons/fa';

const Addfolder: React.FC<AddFolderProps> = ({ setIsModalOpen }) => {
  return (
    <div className="w-[700px] p-8 bg-white rounded shadow-lg relative">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
      >
        <FaTimes size={20} />
      </button>
      <h2 className="font-semibold text-xl mb-4">Add New Folder</h2>
    </div>
  );
};

export default Addfolder;
