'use client';
import Button from '@/components/Button';
import Tab from '@/components/common/TabsComponent/Tab';
import TabPanel from '@/components/common/TabsComponent/TabPanel';
import TabsContainer from '@/components/common/TabsComponent/TabsContainer';
import { FormProvider, useForm } from 'react-hook-form';
import { TbEdit } from 'react-icons/tb';
import BasicInfo from '../components/form/BasicInfo';
import Documents from '../components/form/Documents';
import Employment from '../components/form/Employement';
import { EmployeeData } from '@/types/employee';
import axiosInstance from '@/lib/axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

const CreateEmployee = () => {
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // profile picture
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
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
      console.log('profilePic response: ', response.data);
      console.log('profilePic response url: ', response.data.data.url);
      setPreviewUrl(response.data.data.url);
    } catch (err) {
      console.error(err);
    }
  };

  const formMethods = useForm<EmployeeData>();
  const { handleSubmit, reset } = formMethods;
  const onSubmit = async (data) => {
    try {
      setLoader(true);
      // handle profile picture to get url from the upload picture
      // then send that url to the backend as a profilePictureUrl
      handleUpload();

      const response = await axiosInstance.post('/employee', {
        ...data,
        profilePictureUrl: previewUrl,
      });
      console.log('previewUrl after create employee: ', previewUrl);
      toast.success('Employee created successfully!');
      console.log('post employee: ', response);
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
      reset();
    }
    reset();
  };
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
          <Tab
            index={2}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Documents
          </Tab>
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
              <TabPanel index={2}>
                <Documents />
              </TabPanel>
            </form>
          </FormProvider>
        </div>
      </TabsContainer>
    </main>
  );
};

export default CreateEmployee;
