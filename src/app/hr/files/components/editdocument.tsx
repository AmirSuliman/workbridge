'use client';
import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

interface Folder {
  id: string;
  name: string;
}

interface EditdocumentProps {
  setIsModalOpen3: (value: boolean) => void;
  documentId: string | null;
  currentTitle: string | null;
  currentFolderId: string | null;
}

const Editdocument: React.FC<EditdocumentProps> = ({
  setIsModalOpen3,
  documentId,
  currentTitle,
  currentFolderId,
}) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [title, setTitle] = useState(currentTitle || "");
  const [folderId, setFolderId] = useState(currentFolderId || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log("Document ID:", documentId);
  console.log("Current Title:", currentTitle);
  console.log("Current Folder ID:", currentFolderId);
  useEffect(() => {
    const fetchFolders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/folders');
        setFolders(response.data.data.items);
      } catch (err) {
        setError('Failed to load folders.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  const handleUpdateDocument = async () => {
    if (!title.trim() || !folderId) {
      setError("Title and folder are required.");
      return;
    }

    if (!documentId) {
      setError("Document ID is missing.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.put(`/file/${documentId}`, {
        fileTitle: title,
        folderId,
      });

      if (response.status === 200) {
        // Handle successful update
        setIsModalOpen3(false);
        window.location.reload(); // Refresh the page to reflect changes
      } else {
        setError("Failed to update document.");
      }
    } catch (err) {
      setError("Failed to update document.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full sm:w-[600px] p-8 bg-white rounded shadow-lg relative">
      <button
        onClick={() => setIsModalOpen3(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
      >
        <FaTimes size={20} />
      </button>
      <h2 className="font-semibold text-xl mb-4">Edit Document</h2>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <div className="flex flex-row items-center w-full gap-6 mt-8">
        <label className="flex flex-col w-full text-gray-400">
          <span className="mb-1 text-gray-400 text-[14px]">Folder</span>
          <select
            id="folderSelect"
            className="w-full border p-3 rounded"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
          >
            <option value="">Select a Folder</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col w-full">
          <span className="mb-1 text-gray-400 text-[14px]">Document Title</span>
          <input
            type="text"
            placeholder="Add document title"
            className="w-full border p-3 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-row items-center w-full p-4 mt-52 gap-6 px-8">
        <button
          className="rounded w-full bg-[#0F172A] text-white p-4 text-center text-[14px]"
          onClick={handleUpdateDocument}
          disabled={loading}
        >
          {loading ? "Updating..." : "Confirm"}
        </button>
        <button
          className="rounded w-full border p-4 text-center text-[14px]"
          onClick={() => setIsModalOpen3(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Editdocument;