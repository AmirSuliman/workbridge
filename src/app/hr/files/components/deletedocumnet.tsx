"use client";
import { FaTimes } from "react-icons/fa";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
const Deletedocument = ({ setIsModalOpen4, fileId, setFolders, setAllFiles, setActiveFolder }) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/file/${fileId}`);

      setFolders((prevFolders) =>
        prevFolders.map((folder) => ({
          ...folder,
          files: folder.files ? folder.files.filter((file) => file.id !== fileId) : [],
        }))
      );

      setAllFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));

      setActiveFolder((prevFolder) => {
        if (!prevFolder) return prevFolder;
        return {
          ...prevFolder,
          files: prevFolder.files.filter((file) => file.id !== fileId),
        };
      });
      toast.success("File deleted successfully!");

      setIsModalOpen4(false);
    } catch (err) {
      console.error("Error deleting file:", err);
      toast.error("Failed to delete the file. Please try again.");

    }
  };

  return (
    <div className="w-full sm:w-[600px] p-8 bg-white rounded shadow-lg relative">
      <button
        onClick={() => setIsModalOpen4(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
      >
        <FaTimes size={20} />
      </button>
      <h2 className="font-semibold text-xl mb-4">Delete</h2>
      <div className="text-center mt-16">
        <p className="text-[22px]">Are you sure you want to delete this item?</p>
        <p className="text-[16px] font-semibold">This action is irreversible</p>
        <div className="flex flex-row items-center w-full p-4 mt-24 gap-6 px-8">
          <button
            onClick={handleDelete}
            className="rounded w-full bg-[#0F172A] text-white p-4 text-center text-[14px]"
          >
            Confirm
          </button>
          <button
            onClick={() => setIsModalOpen4(false)}
            className="rounded w-full border p-4 text-center text-[14px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deletedocument;
