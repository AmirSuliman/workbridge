import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import axiosInstance from "@/lib/axios";

const Editfolder = ({ folderId, currentName, setIsModalOpen2, setFolders, createdBy }) => {
  const [folderName, setFolderName] = useState(currentName);

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.put(`/folder/${folderId}`, {
        name: folderName,
        createdBy,
      });
  
      console.log(response, 'res');
      setFolders((prevFolders) => 
        prevFolders.map((folder) => 
          folder.id === folderId ? { ...folder, name: folderName } : folder
        )
      );
      setIsModalOpen2(false);
    } catch (error) {
      console.error("Failed to update folder:", error);
    }
  };
  

  return (
    <div className="w-full sm:w-[600px] p-8 bg-white rounded shadow-lg relative">
      <button
        onClick={() => setIsModalOpen2(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
      >
        <FaTimes size={20} />
      </button>
      <h2 className="font-semibold text-xl mb-4">Edit Folder</h2>
      <label className="flex flex-col mt-8">
        <span className="text-[14px] text-gray-400 mb-1">Folder Name*</span>
        <input
          type="text"
          placeholder="Type folder name"
          className="text-gray-500 p-4 rounded border w-full"
          value={folderName}
          onChange={handleFolderNameChange}
        />
      </label>

      <div className="flex flex-row items-center w-full p-4 mt-52 gap-6 px-8">
        <button
          onClick={handleSubmit}
          className="rounded w-full bg-[#0F172A] text-white p-4 text-center text-[14px]"
        >
          Confirm
        </button>
        <button
          onClick={() => setIsModalOpen2(false)}
          className="rounded w-full border p-4 text-center text-[14px]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Editfolder;
