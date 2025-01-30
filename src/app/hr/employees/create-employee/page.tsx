'use client';
import Button from '@/components/Button';
import Tab from '@/components/common/TabsComponent/Tab';
import TabPanel from '@/components/common/TabsComponent/TabPanel';
import TabsContainer from '@/components/common/TabsComponent/TabsContainer';
import DocumentSection from '@/components/UserInformation/DocumentSection';
import axiosInstance from '@/lib/axios';
import { employeeSchema } from '@/schemas/employeeSchema';
import { updateEmployeeData } from '@/store/slices/employeeInfoSlice';
import { AppDispatch, RootState } from '@/store/store';
import { EmployeeData } from '@/types/employee';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TbEdit } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import BasicInfo from '../components/form/BasicInfo';
import Employment from '../components/form/Employement';

const CreateEmployee = () => {
  const [loader, setLoader] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data: employeeData } = useSelector(
    (state: RootState) => state.employee
  );
  // profile picture
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileType = file.type;

      if (!['image/png', 'image/jpeg'].includes(fileType)) {
        console.log('selected file type: ', fileType);
        return toast.error('Only jpeg, jpg and png files are allowed!');
      }
      setSelectedFile(file);
      const blobUrl = URL.createObjectURL(file);
      setPreviewUrl(blobUrl);
    }
  };

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
      console.log('Uploaded URL:', uploadedUrl);
      setPreviewUrl(uploadedUrl);
      return uploadedUrl;
    } catch (err) {
      console.error(err);
    }
  };

  const formMethods = useForm<EmployeeData>({
    resolver: zodResolver(employeeSchema),
    mode: 'onChange',
  });

  const { handleSubmit, reset } = formMethods;
  const onSubmit = async (data) => {
    console.log('onsubmit data: ', data);
    try {
      setLoader(true);
      // handle profile picture to get url from the upload picture
      // then send that url to the backend as a profilePictureUrl
      if (selectedFile) {
        await handleUpload();
      }

      const response = await axiosInstance.post('/employee', {
        ...data,
        profilePictureUrl: previewUrl,
      });
      dispatch(updateEmployeeData(response.data.data));
      toast.success('Employee created successfully!');
      reset();
      router.back();
      console.log('post employee: ', response.data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      setPreviewUrl(null);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred.');
      }
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  console.log('Form errors: ', formMethods.formState.errors);

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="flex items-center gap-x-2">
          <TbEdit />
          <span>Create Employee</span>
        </h1>
        <div className="flex items-center gap-x-2">
          <Button name="Save Draft" />
          <Button
            name="Cancel"
            className="bg-transparent border-none !text-black"
            onClick={() => router.back()}
          />
        </div>
      </div>
      {/* tabs */}
      <TabsContainer containerClasses="my-1 pb-2 md:pb-4">
        <div className="flex gap-0  my-2 border-b-[1px] border-gray-border overflow-x-auto ">
          <Tab
            index={0}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Basic Information
          </Tab>
          <Tab
            index={1}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Employment
          </Tab>
          {employeeData && (
            <Tab
              index={2}
              tabStyles="text-xs px-[3%] py-3 text-dark-navy whitespace-nowrap"
              activeTabStyle="font-semibold border-b-2 !border-dark-navy"
            >
              Documents
            </Tab>
          )}
        </div>
        <div>
          {/* using form provider for multi-step form */}
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TabPanel index={0}>
                <BasicInfo
                  previewUrl={previewUrl}
                  handleFileChange={handleFileChange}
                />
              </TabPanel>
              <TabPanel index={1}>
                <Employment loader={loader} />
              </TabPanel>
              {employeeData && (
                <TabPanel index={2}>
                  <DocumentSection employeeData={employeeData} />
                </TabPanel>
              )}
            </form>
          </FormProvider>
        </div>
      </TabsContainer>
    </main>
  );
};

export default CreateEmployee;
