'use client';

import axiosInstance from '@/lib/axios';
import { useEffect, useState } from 'react';
import { FaTimes, FaUpload } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface Folder {
  id: string;
  name: string;
  
}

interface UploadFilesProps {
  setIsModalOpen1: (val: boolean) => void;
  onFileUploaded?: (file: any) => void; // Adjust `file` type as needed
}

const UploadFiles = ({ setIsModalOpen1, onFileUploaded }: UploadFilesProps) => {
  const { data: session } = useSession();
  const userId = session?.user?.userId;
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [folderId, setFolderId] = useState<string>('');
  const [title, setTitle] = useState<string>('');

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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !folderId || !title) {
      setError('Please select a file, folder, and provide a title.');
      return;
    }
  
    if (!userId) {
      setError('User not authenticated.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('folderId', folderId);
    formData.append('fileTitle', title);
  
    try {
      setLoading(true);
  
      const uploadResponse = await axiosInstance.post(
        '/file/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentage = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentage);
            }
          },
        }
      );
  
      // Extract metadata from the API response
      const fileMetadata = uploadResponse.data?.data;
      if (!fileMetadata) {
        throw new Error('File upload failed, missing file metadata.');
      }
  
      // Construct the uploaded file object with the metadata from the response
      const uploadedFile = {
        id: fileMetadata.id,
        fileTitle: title,                   
        folderId,                          
        uploadedBy: userId,                 
        fileName: fileMetadata.fileName,    
        fileType: fileMetadata.fileType,    
        size: fileMetadata.size,           
        url: fileMetadata.url,              
        uploadedAt: fileMetadata.createdAt,
      };
  
      // Pass the uploaded file metadata to the parent component (if provided)
      if (onFileUploaded) {
        onFileUploaded(uploadedFile);
      }
  
      toast.success('File uploaded successfully!');
  
      const adminUploadResponse = await axiosInstance.post('/adminfile/upload', {
        fileId: fileMetadata.id,
        uploadedBy: userId,
      });
  
      // Reset progress bar and close modal
      setProgress(0);
      setIsModalOpen1(false);
    } catch (err) {
      setError('Failed to upload the file.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="w-full sm:w-[700px] p-8 bg-white rounded shadow-lg relative">
      <button
        type="button"
        onClick={() => setIsModalOpen1(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
      >
        <FaTimes size={20} />
      </button>
      <h2 className="font-semibold text-xl mb-4">Upload File</h2>

      {/* File Select */}
      <label className="text-gray-400 block text-sm mb-2 mt-8">Upload file</label>
      <label className="border-dashed border-2 border-gray-300 rounded-lg h-32 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition text-gray-400">
        <span className="text-black flex flex-row items-center gap-2 mt-2">
          Choose a file <FaUpload />
        </span>
        <input type="file" onChange={handleFileSelect} className="hidden" />
      </label>

      <div className="w-full mt-2">
        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-gray-400 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-gray-500 text-xs mt-1 text-right">{progress}%</div>
      </div>

      <div className="h-[1px] w-full bg-gray-200 mt-4" />

      {/* Folder and Document Title */}
      <div className="flex flex-row items-center w-full gap-6 mt-4">
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

      <p className="text-black text-[12px] mt-4">
        Leave blank for the file to be saved to the All Files folder
      </p>

      {/* Confirm and Cancel Buttons */}
      <div className="flex flex-row items-center w-full p-4 mt-16 gap-6 px-8">
        <button
          onClick={handleUpload}
          disabled={loading}
          className="rounded w-full bg-[#0F172A] text-white p-4 text-center text-[14px]"
        >
          {loading ? 'Uploading...' : 'Confirm'}
        </button>
        <button
          onClick={() => setIsModalOpen1(false)}
          className="rounded w-full border p-4 text-center text-[14px]"
        >
          Cancel
        </button>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default UploadFiles;
