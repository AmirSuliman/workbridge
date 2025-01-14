'use client';
import { useState, useEffect } from 'react';
import { FaFolder, FaPlusCircle, FaUpload, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '@/components/modal/Modal';
import Addfolder from './components/addfolder';
import Uploadfiles from './components/uploadfiles';
import Editfolder from './components/editfolder';
import Editdocument from './components/editdocument';
import Deletedocument from './components/deletedocumnet';
import axiosInstance from '@/lib/axios';

interface Folder {
  id: string;
  fileName: string;
  files: File[];
  name: string;
  createdBy: number;
}
interface File {
  id: string; 
  fileName: string;
  size: number;
  dateUploaded: string; 
  fileType: string; 
}

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState<Folder | null>(null);
  const [fileIdToDelete, setFileIdToDelete] = useState<string | null>(null);
  const [sortCriteria, setSortCriteria] = useState('Select');
  const [allFiles, setAllFiles] = useState<File[]>([]);
  const [isAllFilesActive, setIsAllFilesActive] = useState(false);

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

  const handleSortFolders = (criteria: string) => {
    setSortCriteria(criteria);
    const sortedFolders = [...folders];

    if (criteria === 'Name') {
      sortedFolders.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFolders(sortedFolders);
  };

  const handleSortFiles = (criteria: string) => {
    if (!activeFolder && !isAllFilesActive) return;

    const sortedFiles = isAllFilesActive ? [...allFiles] : [...activeFolder!.files];

    if (criteria === 'Name') {
      sortedFiles.sort((a, b) => a.fileName.localeCompare(b.fileName));
    } else if (criteria === 'Date uploaded') {
      sortedFiles.sort((a, b) => new Date(a.dateUploaded).getTime() - new Date(b.dateUploaded).getTime());
    } else if (criteria === 'Size') {
      sortedFiles.sort((a, b) => a.size - b.size);
    }

    if (isAllFilesActive) {
      setAllFiles(sortedFiles);
    } else {
      setActiveFolder({ ...activeFolder!, files: sortedFiles });
    }
  };

  const fetchAllFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/files');
      setAllFiles(response.data.data.items); 
    } catch (err) {
      setError('Failed to load files.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAllFilesClick = async () => {
    setActiveFolder(null);
    setIsAllFilesActive(true);
    await fetchAllFiles();
  };

  const handleAddfolder = () => {
    setIsModalOpen(true);
  };

  const handleUploadfiles = () => {
    setIsModalOpen1(true);
  };

  const handleEditfolder = () => {
    setIsModalOpen2(true);
  };

  const handleEditdocument = () => {
    setIsModalOpen3(true);
  };

  const handleDeletedocument = (fileId: string) => {
    setFileIdToDelete(fileId);
    setIsModalOpen4(true);
  };

  const handleFolderClick = (folder: Folder) => {
    setActiveFolder(folder);
    setIsAllFilesActive(false);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <FaFolder size={24} />
          <h1 className="font-semibold text-[22px]">Files</h1>
        </div>
        <div className="flex flex-row items-center gap-4">
          <button
            onClick={handleAddfolder}
            className="flex flex-row items-center p-3 gap-2 px-4 bg-white border rounded text-[12px]"
          >
            Add Folder <FaPlusCircle />
          </button>
          <button
            onClick={handleUploadfiles}
            className="flex flex-row items-center p-3 gap-2 px-4 bg-black text-white border rounded text-[12px]"
          >
            Upload Files <FaUpload />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-6 w-full mt-8">
        <div className="flex flex-col bg-white border rounded-[10px] w-full sm:w-[30%] h-[90vh]">
          <h1 className="mt-6 px-8 font-medium text-[18px] text-[#0F172A] mb-4">Folders</h1>
          <div
            onClick={handleAllFilesClick}
            className={`flex flex-row items-center justify-between mb-3 p-3 cursor-pointer ${
              isAllFilesActive ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
            }`}
          >
            <div className="flex flex-row items-center gap-2 px-4 font-medium">
              <FaFolder size={20} />
              <p>All Files</p>
            </div>
            <p className="px-4 text-gray-400 text-[16px]">{allFiles.length} Files</p>
          </div>
          {loading && <p className="text-center text-gray-500">Loading folders...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && folders.length > 0 ? (
            folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => handleFolderClick(folder)}
                className={`flex flex-row items-center justify-between mb-3 p-3 cursor-pointer ${
                  activeFolder?.id === folder.id ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
                }`}
              >
                <div className="flex flex-row items-center gap-2 px-4 font-medium">
                  <FaFolder size={20} />
                  <p>{folder.name}</p>
                </div>
                <p className="px-4 text-gray-400 text-[16px]">{folder.files.length} Files</p>
              </div>
            ))
          ) : (
            !loading && <p className="text-center text-gray-500">No folders found.</p>
          )}
        </div>

        <div className="flex flex-col bg-white border rounded-[10px] p-5 w-full sm:w-[70%] h-[90vh]">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <FaFolder size={20} />
              <h1 className="font-medium text-[18px]">
                {isAllFilesActive ? 'All Files' : activeFolder ? activeFolder.name : 'Select a Folder'}
              </h1>
            </div>
            <div className="flex flex-row items-center gap-3 text-xs">
              <label>
                <span>Sort</span>
                <select
                  className="p-1 border rounded ml-2 text-[12px]"
                  value={sortCriteria}
                  onChange={(e) => handleSortFiles(e.target.value)}
                >
                  <option>Select</option>
                  <option>Name</option>
                  <option>Date uploaded</option>
                  <option>Size</option>
                </select>
              </label>
              <button
                onClick={handleEditfolder}
                className="flex flex-row items-center p-2 gap-2 px-4 bg-black text-white border rounded text-[12px]"
                disabled={!activeFolder}
              >
                Edit Folder <FaEdit />
              </button>
            </div>
          </div>

          <div className="mt-8 w-full mb-2 overflow-x-auto">
            <table className="w-full">
              <thead className="text-gray-400 text-[14px] font-medium">
                <tr className="border-b">
                  <th className="p-4 text-left">Document Name</th>
                  <th className="p-4 text-left">Date Uploaded</th>
                  <th className="p-4 text-left">Size</th>
                  <th className="p-4 text-left">Filetype</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isAllFilesActive
                  ? allFiles.length > 0
                    ? allFiles.map((file, index) => (
                        <tr key={index} className="p-3 border-b text-[14px] font-normal hover:bg-gray-50">
                          <td className="p-4 flex items-center gap-2">
                            <input type="checkbox" />
                            <span>{file.fileName}</span>
                          </td>
                          <td className="p-4">{file.dateUploaded}</td>
                          <td className="p-4">{file.size}</td>
                          <td className="p-4">{file.fileType}</td>
                          <td className="flex flex-row gap-3 justify-center items-center">
                            <FaEdit onClick={handleEditdocument} className="cursor-pointer" />
                            <FaTrash onClick={() => handleDeletedocument(file.id)} className="cursor-pointer" />
                          </td>
                        </tr>
                      ))
                    : (
                      <tr>
                        <td colSpan={5} className="text-center text-gray-500">No files found.</td>
                      </tr>
                    )
                  : activeFolder
                  ? activeFolder.files.length > 0
                    ? activeFolder.files.map((file, index) => (
                        <tr key={index} className="p-3 border-b text-[14px] font-normal hover:bg-gray-50">
                          <td className="p-4 flex items-center gap-2">
                            <input type="checkbox" />
                            <span>{file.fileName}</span>
                          </td>
                          <td className="p-4">{file.dateUploaded}</td>
                          <td className="p-4">{file.size}</td>
                          <td className="p-4">{file.fileType}</td>
                          <td className="flex flex-row gap-3 justify-center items-center">
                            <FaEdit onClick={handleEditdocument} className="cursor-pointer" />
                            <FaTrash onClick={() => handleDeletedocument(file.id)} className="cursor-pointer" />
                          </td>
                        </tr>
                      ))
                    : (
                      <tr>
                        <td colSpan={5} className="text-center text-gray-500">This folder is empty. Use the upload button to add files or move files from other folders.</td>
                      </tr>
                    )
                  : (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500">Select a folder to view its files.</td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)}><Addfolder setIsModalOpen={setIsModalOpen} /></Modal>}
      {isModalOpen1 && <Modal onClose={() => setIsModalOpen1(false)}><Uploadfiles setIsModalOpen1={setIsModalOpen1} /></Modal>}
      {isModalOpen2 && activeFolder && <Modal onClose={() => setIsModalOpen2(false)}><Editfolder createdBy={activeFolder.createdBy} folderId={activeFolder.id} currentName={activeFolder.name} setIsModalOpen2={setIsModalOpen2} setFolders={setFolders} /></Modal>}
      {isModalOpen3 && <Modal onClose={() => setIsModalOpen3(false)}><Editdocument setIsModalOpen3={setIsModalOpen3} /></Modal>}
      {isModalOpen4 && <Modal onClose={() => setIsModalOpen4(false)}><Deletedocument setIsModalOpen4={setIsModalOpen4} fileId={fileIdToDelete} setFolders={setFolders} /></Modal>}
    </div>
  );
};

export default Page;
