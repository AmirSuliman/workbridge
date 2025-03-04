'use client';
import Modal from '@/components/modal/Modal';
import axiosInstance from '@/lib/axios';
import { formatFileSize } from '@/utils/formatFileSize';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  FaChevronDown,
  FaChevronRight,
  FaEdit,
  FaFolder,
  FaPlusCircle,
  FaUpload,
} from 'react-icons/fa';
import Addfolder from './components/addfolder';
import AddSubFolder from './components/addSubFolder';
import Deletedocument from './components/deletedocumnet';
import Editdocument from './components/editdocument';
import Editfolder from './components/editfolder';
import Uploadfiles from './components/uploadfiles';
import mammoth from 'mammoth';

interface Folder {
  id: string;
  parentId: number | null;
  fileName: string;
  files: File[];
  name: string;
  createdBy: number;
  folderId: string;
}
interface File {
  id: string;
  fileName: string;
  fileTitle: string;
  size: number;
  dateUploaded: string;
  fileType: string;
  folderId: string;
}

const HrFiles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [subfolderOpen, setSubfolderOpen] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState<Folder | null>(null);
  const [fileIdToDelete, setFileIdToDelete] = useState<string | null>(null);
  const [sortCriteria, setSortCriteria] = useState('Select');
  const [allFiles, setAllFiles] = useState<File[]>([]);
  const [isAllFilesActive, setIsAllFilesActive] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const { data: session } = useSession();
  const role = session?.user.role;
  const isUserPanel = role === 'ViewOnly' || role === 'Manager';

  const handleDocumentOpen = async (doc) => {
    const isEdge = window.navigator.userAgent.indexOf('Edg') > -1;
    const isOfficeDoc =
      doc.fileType.includes('openxmlformats-officedocument') ||
      doc.fileType === 'msword';

    if (isEdge && isOfficeDoc) {
      const link = document.createElement('a');
      link.href = doc.url;
      link.setAttribute('download', doc.fileName);
      link.setAttribute('target', '_self');
      link.click();
    } else {
      window.open(doc.url, '_blank');
    }

    if (doc.fileType === 'application/pdf' || doc.fileType === 'pdf') {
      try {
        const response = await fetch(doc.url);
        if (!response.ok)
          throw new Error(`PDF not found, status code: ${response.status}`);
        console.log('PDF fetched successfully');
      } catch (error) {
        setError(
          `Error loading PDF file. Please check the URL or try again. Details: ${
            (error as Error).message
          }`
        );
        console.log('Error loading PDF:', error);
      }
    } else if (
      doc.fileType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      try {
        const arrayBuffer = await fetch(doc.url).then((res) =>
          res.arrayBuffer()
        );
      } catch (error) {
        setError('Error loading Word document content.');
        console.log('Error loading Word document:', error);
      }
    } else {
      console.log('Unsupported file type:', doc.fileType);
    }
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

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [foldersResponse, filesResponse] = await Promise.all([
          axiosInstance.get('/folders'),
          axiosInstance.get('/files'),
        ]);

        setFolders(foldersResponse.data.data.items);
        setAllFiles(filesResponse.data.data.items);
        setIsAllFilesActive(true); // Ensure "All Files" is selected by default
        setActiveFolder(null); // No specific folder should be active
      } catch (err) {
        setError('Failed to load data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleEditdocument = (file: File) => {
    setDocumentId(file.id);
    setCurrentTitle(file.fileTitle);
    setCurrentFolderId(file.folderId);
    setIsModalOpen3(true);
  };

  const handleSortFiles = (criteria: string) => {
    if (!activeFolder && !isAllFilesActive) return;

    const sortedFiles = isAllFilesActive
      ? [...allFiles]
      : [...activeFolder!.files];

    if (criteria === 'Name') {
      sortedFiles.sort((a, b) => a.fileName.localeCompare(b.fileName));
    } else if (criteria === 'Date uploaded') {
      sortedFiles.sort(
        (a, b) =>
          new Date(a.dateUploaded).getTime() -
          new Date(b.dateUploaded).getTime()
      );
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

  const fetchFolderFiles = async (folder) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/files/${folder.id}`);
      setAllFiles(response.data.data.items);
      folder.files = response.data.data.items;
      setActiveFolder(folder);
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

  const handleDeletedocument = (fileId: string) => {
    setFileIdToDelete(fileId);
    setIsModalOpen4(true);
  };

  const handleFolderClick = (folder: Folder) => {
    fetchFolderFiles(folder);
    setActiveFolder(folder);
    setIsAllFilesActive(false);
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folder.id)) {
        next.delete(folder.id);
      } else {
        next.add(folder.id);
      }
      return next;
    });
  };

  const buildTree = (folders: Folder[]) => {
    const map: { [key: string]: Folder & { children: Folder[] } } = {};
    const tree: (Folder & { children: Folder[] })[] = [];
    folders.forEach((folder) => {
      map[folder.id] = { ...folder, children: [] };
    });
    folders.forEach((folder) => {
      if (folder.parentId) {
        const parent = map[folder.parentId];
        if (parent) {
          parent.children.push(map[folder.id]);
        } else {
          tree.push(map[folder.id]);
        }
      } else {
        tree.push(map[folder.id]);
      }
    });
    return tree;
  };

  const tree = useMemo(() => buildTree(folders), [folders]);

  const renderFolder = (folder, level) => (
    <div key={folder.id}>
      <div
        onClick={() => handleFolderClick(folder)}
        className={`flex flex-row items-center justify-between mb-1 p-3 cursor-pointer ${
          activeFolder?.id === folder.id
            ? 'bg-[#0F172A] text-white'
            : 'hover:bg-[#0F172A] hover:text-white'
        }`}
        style={{ paddingLeft: `${level * 10}px` }}
      >
        <div className="flex flex-row items-center gap-2 px-4 font-medium">
          <FaFolder size={20} />
          <p>{folder.name}</p>
          <span className="text-sm">
            {folder.children.length > 0 ? (
              expandedFolders.has(folder.id) ? (
                <FaChevronDown size={12} />
              ) : (
                <FaChevronRight size={12} />
              )
            ) : (
              <span className="w-4" /> // Spacer for folders without children
            )}
          </span>
        </div>
        <p className="px-4 text-gray-400 text-[16px]">
          {folder?.files?.length} Files
        </p>
      </div>
      {expandedFolders.has(folder.id) &&
        folder.children.map((child) => renderFolder(child, level + 1))}
    </div>
  );

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Image src="/folder.svg" alt="img" width={25} height={25} />
          <h1 className="font-semibold text-[22px]">Files</h1>
        </div>
        {!isUserPanel && (
          <div className="flex flex-row items-center gap-4">
            {activeFolder?.id && (
              <button
                onClick={() => {
                  setSubfolderOpen(true);
                }}
                className="flex flex-row items-center p-3 gap-2 px-4 bg-white border rounded text-[12px]"
              >
                Add Sub Folder <FaPlusCircle />
              </button>
            )}
            <button
              onClick={handleAddfolder}
              className="flex flex-row items-center p-3 gap-2 px-4 bg-white border rounded text-[12px]"
            >
              Add Folder <FaPlusCircle />
            </button>
            <button
              onClick={handleUploadfiles}
              className="flex flex-row items-center p-3 gap-2 px-4 bg-[#0F172A] text-white border rounded text-[12px]"
            >
              Upload Files <FaUpload />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-6 w-full mt-8">
        <div className="flex flex-col bg-white border rounded-[10px] w-fit whitespace-nowrap h-full">
          <h1 className="mt-6 px-4 font-medium text-[18px] text-[#0F172A] mb-4">
            Folders
          </h1>
          <div
            onClick={handleAllFilesClick}
            className={`flex flex-row items-center justify-between p-3 cursor-pointer ${
              isAllFilesActive
                ? 'bg-[#0F172A] text-white'
                : 'hover:bg-[#0F172A] hover:text-white'
            }`}
          >
            <div className="flex flex-row items-center gap-2  font-medium">
              <FaFolder size={20} />
              <p>All Files</p>
            </div>
            <p className="px-4 text-gray-400 text-sm">
              {allFiles.length} Files
            </p>
          </div>
          {loading && (
            <p className="text-center text-gray-500">Loading folders...</p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && folders.length > 0 ? (
            <div className="text-sm">
              {tree.map((folder) => renderFolder(folder, 0))}
            </div>
          ) : (
            !loading && (
              <p className="text-center text-gray-500">No folders found.</p>
            )
          )}
        </div>

        <div className="flex flex-col bg-white border rounded-[10px] p-5 w-full overflow-x-auto">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Image src="/folder.svg" alt="img" width={20} height={20} />
              <h1 className="font-medium text-[18px]">
                {isAllFilesActive
                  ? 'All Files'
                  : activeFolder
                  ? activeFolder.name
                  : 'Select a Folder'}
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
              {!isUserPanel && (
                <button
                  onClick={handleEditfolder}
                  className="flex flex-row items-center p-2 gap-2 px-4 bg-[#0F172A] text-white border rounded text-[12px]"
                  disabled={!activeFolder}
                >
                  Edit Folder <FaEdit />
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 w-full mb-2 overflow-x-auto">
            <table className="w-full">
              <thead className="text-gray-400 text-[14px] font-medium">
                <tr className="border-b">
                  <th className="p-4 font-medium text-left">Document Name</th>
                  <th className="p-4 font-medium text-left">Date Uploaded</th>
                  <th className="p-4 font-medium text-left">Size</th>
                  <th className="p-4 font-medium text-left">Filetype</th>
                  {!isUserPanel && (
                    <th className="p-4 font-medium text-center">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {isAllFilesActive ? (
                  allFiles.length > 0 ? (
                    allFiles.map((file, index) => (
                      <tr
                        key={index}
                        className="p-3 border-b text-[14px] font-normal hover:bg-gray-50"
                      >
                        <td
                          onClick={() => {
                            handleDocumentOpen(file);
                          }}
                          className="p-4 flex items-center gap-2 cursor-pointer"
                        >
                          {/* <input type="checkbox" /> */}
                          <span className="max-w-[300px] truncate">
                            {file.fileTitle || file.fileName}
                          </span>
                        </td>
                        <td className="p-4">{file.dateUploaded}</td>
                        <td className="p-4">{formatFileSize(file.size)}</td>
                        <td className="p-4">
                          {file.fileType
                            ? file.fileType ===
                              'vnd.openxmlformats-officedocument.wordprocessingml.document'
                              ? 'docx'
                              : file.fileType === 'msword'
                              ? 'doc'
                              : file.fileType
                            : ''}
                        </td>
                        {!isUserPanel && (
                          <td className="flex flex-row gap-3 justify-center items-center">
                            <Image
                              src="/edit.svg"
                              alt="edit"
                              width={10}
                              height={10}
                              onClick={() => handleEditdocument(file)}
                              className="cursor-pointer"
                            />
                            <Image
                              src="/delete.svg"
                              alt="del"
                              width={10}
                              height={10}
                              onClick={() => handleDeletedocument(file.id)}
                              className="cursor-pointer"
                            />
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500">
                        No files found.
                      </td>
                    </tr>
                  )
                ) : activeFolder ? (
                  activeFolder?.files?.length > 0 ? (
                    activeFolder.files.map((file, index) => (
                      <tr
                        key={index}
                        className="p-3 border-b text-[14px] font-normal hover:bg-gray-50"
                      >
                        <td
                          onClick={() => {
                            handleDocumentOpen(file);
                          }}
                          className="p-4 flex items-center gap-2 cursor-pointer"
                        >
                          {/* <input type="checkbox" /> */}
                          <span>{file.fileTitle || file.fileName}</span>
                        </td>
                        <td className="p-4">{file.dateUploaded}</td>
                        <td className="p-4">{file.size}</td>
                        <td className="p-4">
                          {file.fileType
                            ? file.fileType ===
                              'vnd.openxmlformats-officedocument.wordprocessingml.document'
                              ? 'docx'
                              : file.fileType === 'msword'
                              ? 'doc'
                              : file.fileType
                            : ''}
                        </td>
                        {!isUserPanel && (
                          <td className="flex flex-row gap-3 justify-center items-center">
                            <Image
                              src="/edit.svg"
                              alt="edit"
                              width={10}
                              height={10}
                              onClick={() => handleEditdocument(file)}
                              className="cursor-pointer"
                            />
                            <Image
                              src="/delete.svg"
                              alt="del"
                              width={10}
                              height={10}
                              onClick={() => handleDeletedocument(file.id)}
                              className="cursor-pointer"
                            />
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500">
                        This folder is empty. Use the upload button to add
                        files.
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500">
                      Select a folder to view its files.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Addfolder setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}

      {subfolderOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <AddSubFolder
            setIsModalOpen={setSubfolderOpen}
            // handleFolderClick={handleFolderClick}
            activeFolder={activeFolder}
          />
        </Modal>
      )}

      {isModalOpen1 && (
        <Modal onClose={() => setIsModalOpen1(false)}>
          <Uploadfiles setIsModalOpen1={setIsModalOpen1} />
        </Modal>
      )}
      {isModalOpen2 && activeFolder && (
        <Modal onClose={() => setIsModalOpen2(false)}>
          <Editfolder
            createdBy={activeFolder.createdBy}
            folderId={activeFolder.id}
            currentName={activeFolder.name}
            setIsModalOpen2={setIsModalOpen2}
            setFolders={setFolders}
          />
        </Modal>
      )}
      {isModalOpen3 && (
        <Modal onClose={() => setIsModalOpen3(false)}>
          <Editdocument
            setIsModalOpen3={setIsModalOpen3}
            documentId={documentId}
            currentTitle={currentTitle}
            currentFolderId={currentFolderId}
          />
        </Modal>
      )}
      {isModalOpen4 && (
        <Modal onClose={() => setIsModalOpen4(false)}>
          <Deletedocument
            setIsModalOpen4={setIsModalOpen4}
            fileId={fileIdToDelete}
            setFolders={setFolders}
            setAllFiles={setAllFiles}
            setActiveFolder={setActiveFolder}
          />
        </Modal>
      )}
    </div>
  );
};

export default HrFiles;
