import axiosInstance from '@/lib/axios';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import Button from '../Button';
import {
  clearEmployeeData,
  fetchEmployeeData,
} from '@/store/slices/employeeInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { useSession } from 'next-auth/react';
import { isAxiosError } from 'axios';

// this component is used to update manager/employee profile picture
const UploadProfilePicture = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();

  const user = useSelector((state: RootState) => state.myInfo);
  const myId = user?.user?.employeeId; // This id is used to view the current logged in user's info
  const getMyInfo = useCallback(() => {
    // Fetch employee data if session and empId are valid
    if (session?.user.accessToken && session?.user.userId) {
      dispatch(
        fetchEmployeeData({
          accessToken: session.user.accessToken,
          userId: Number(myId),
        })
      );
    } else {
      console.log('Invalid session or user ID');
    }

    return () => {
      dispatch(clearEmployeeData());
    };
  }, [dispatch, session?.user.accessToken, session?.user.userId, myId]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0];

        if (!file.type.startsWith('image/')) {
          console.log('Selected file type: ', file.type);
          return toast.error('Only image files are allowed!');
        }
        setSelectedFile(file);
        const blobUrl = URL.createObjectURL(file);
        setPreviewUrl(blobUrl);
      }
    },
    []
  );

  // Handle profile picture upload
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a profile picture.');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axiosInstance.post('/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const uploadedUrl = response.data.data.url;
      // console.log('Uploaded URL:', uploadedUrl);
      setPreviewUrl(uploadedUrl);
      return { uploadedUrl, error: null };
    } catch (err) {
      console.error(err);
      return { error: err };
    }
  };

  const onSubmit = async () => {
    try {
      setLoader(true);
      let uploadResponse: { uploadedUrl?: string; error?: unknown } | null =
        null;
      if (selectedFile) {
        uploadResponse = (await handleUpload()) || { error: null };
      }

      // Add profilePictureUrl to payload
      const payLoad = {
        profilePictureUrl: uploadResponse?.uploadedUrl,
      };
      const response = await axiosInstance.put('/employee/profile/my', payLoad);

      console.log(
        'Image upload response: ',
        response.data.data.profilePictureUrl
      );
      toast.success('Image updated successfully!');
      sessionStorage.setItem(
        'profilePictureUrl',
        response.data.data.profilePictureUrl
      );

      // Dispatch a custom event to get profilePictureUpdated in the header component
      window.dispatchEvent(new Event('profilePictureUpdated'));
      getMyInfo();
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
      if (isAxiosError(error) && error.response)
        toast.error(error.response.data.message);
    }
  };

  return previewUrl ? (
    <>
      <Image
        src={previewUrl}
        alt="Avatar"
        width={700}
        height={700}
        className="absolute bg-white top-0 left-0 bottom-0 right-0 w-32 h-28 shrink-0 z-20 grow-0 rounded-full object-cover"
      />
      <div className="absolute bottom-0 flex gap-1 z-30 left-[50%] translate-x-[-50%]">
        <Button
          onClick={onSubmit}
          className="!py-[1px] !px-[4px] !text-[10px] shadow-md"
          name={`${loader ? '' : 'Save'}`}
          icon={
            loader ? (
              <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
            ) : (
              ''
            )
          }
        ></Button>
        <Button
          onClick={() => setPreviewUrl(null)}
          bg="white"
          textColor="black"
          className="!py-[1px] !px-[4px] !text-[10px] shadow-md"
          name="Cancel"
        ></Button>
      </div>
    </>
  ) : (
    <label className="hidden z-10 absolute top-0 left-0 bottom-0 right-0 bg-black/35 rounded-full group-hover:flex justify-center items-center cursor-pointer">
      <p className=" text-white text-5xl">+</p>
      <input
        name="profilePictureUrl"
        onChange={handleFileChange}
        accept="image/*"
        type="file"
        className="hidden"
      />
    </label>
  );
};
export default UploadProfilePicture;
