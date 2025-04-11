import { fetchUserData } from '@/services/myInfo';
import { createFolder, resetState } from '@/store/slices/folderSlice';
import { setUser } from '@/store/slices/myInfoSlice';
import { AppDispatch, RootState } from '@/store/store';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const Addfolder = ({ setIsModalOpen, onSuccess }: { setIsModalOpen: (val: boolean) => void, onSuccess?: () => void }) => {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [folderName, setFolderName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success } = useSelector((state: RootState) => state.folder);

  useEffect(() => {
    const getMyInfo = async () => {
      const session = await getSession();
      if (session?.user?.accessToken) {
        try {
          const userData = await fetchUserData(session.user.accessToken);
          setUserId(userData.id);
          dispatch(setUser(userData));
        } catch (error) {
          console.error('Error fetching user data:', error);
          if (error instanceof Error) {
            console.error(error.message || 'Failed to load user data!');
          } else {
            console.error('Failed to load user data!');
          }
        }
      } else {
        toast.error('Authentication failed. Please try again.');
      }
    };
    getMyInfo();
  }, []);

  const handleCreateFolder = async () => {
    if (!folderName || !userId) {
      setErrorMessage('Folder name and user ID are required.');
      return;
    }
  
    try {
      const newFolder = { folderName, userId }; // Add any other required fields for the folder
      // Dispatch the create folder action with the correct data
      await dispatch(createFolder(newFolder));
      onSuccess?.(); // Trigger refresh in parent

      toast.success('Folder created successfully!');
      setFolderName(''); // Reset folder name after success
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      toast.error('Failed to create folder');
      console.error('Error creating folder:', error);
    }
  };
  

  const handleCloseModal = () => {
    dispatch(resetState());
    setIsModalOpen(false);
  };

  return (
    <div className="w-full sm:w-[600px] p-8 bg-white rounded shadow-lg relative">
      <button
        onClick={handleCloseModal}
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
      >
        <FaTimes size={20} />
      </button>
      <h2 className="font-semibold text-[22px] mb-4">Create Folder</h2>
      <label className="flex flex-col mt-8">
        <span className="text-[14px] text-gray-400 mb-1">Folder Name*</span>
        <input
          type="text"
          placeholder="Type folder name"
          className="text-gray-500 p-4 rounded border w-full"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </label>
      {loading && <p className="text-blue-500">Creating folder...</p>}
      {success && (
        <p className="text-green-500">Folder created successfully!</p>
      )}
      <div className="flex flex-row items-center w-full p-4 mt-8 gap-6 px-8">
        <button
          onClick={handleCreateFolder}
          disabled={loading}
          className="rounded w-full bg-[#0F172A] text-white p-4 text-center text-[14px]"
        >
          Confirm
        </button>
        <button
          type="button"
          onClick={handleCloseModal}
          className="rounded w-full border p-4 text-center text-[14px]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Addfolder;
