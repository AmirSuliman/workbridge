'use client';
import Button from '@/components/Button';
import TabButton from '@/components/common/TabsComponent/TabButton';
import TabComponent from '@/components/common/TabsComponent/TabComponent';
import axiosInstance from '@/lib/axios';
import { employeeSchema } from '@/schemas/employeeSchema';
import { updateEmployeeData } from '@/store/slices/employeeInfoSlice';
import { AppDispatch } from '@/store/store';
import { EmployeeData } from '@/types/employee';
import {
  employmentTabValidation,
  personalTabValidation,
} from '@/utils/tabValidations';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TbEdit } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import BasicInfo from '../components/form/BasicInfo';
import Employment from '../components/form/Employement';
import SuccessMessage from './SuccessMessage';

interface Country {
  id: number;
  country: string;
  code: string;
}

const CreateEmployee = () => {
  const [loader, setLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesResponse = await axiosInstance.get('/countries');
        if (countriesResponse.data?.data?.items) {
          setCountries(countriesResponse.data.data.items);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // profile picture
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
  const handleUpload = useCallback(async () => {
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
  }, []);

  const formMethods = useForm<EmployeeData>({
    resolver: zodResolver(employeeSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = formMethods;

  const onSubmit = async (data) => {
    // console.log('onsubmit data: ', data);
    const payLoad = {
      firstName: data.firstName,
      lastName: data.lastName,
      departmentId: data.departmentId,
      email: data.email,
      middleName: data.middleName,
      salary: data.salary,
      tittle: data.tittle,
      gender: data.gender,
      marritialStatus: data.marritialStatus,
      paymentSchedule: data.paymentSchedule,
      payType: data.payType,
      overtime: data.overtime,
      note: data.note,
      linkedin: data.linkedin,
      instagram: data.instagram,
      website: data.website,
      facebook: data.facebook,
      hireDate: data.hireDate,
      birthday: data.birthday,
      phoneNumber: data.phoneNumber,
      workPhone: data.workPhone,
      reportingManagerId: data.reportingManagerId,
      employmentType: data.employmentType,
      isManager: data.isManager,
      countryId: data.countryId,
      location: {
        street1: data.location.street1,
        street2: data.location.street2,
        zipCode: data.location.zipCode,
        city: data.location.city,
        country: data.location.country,
        state: data.location.state,
      },
    };

    try {
      setLoader(true);
      // handle profile picture to get url from the upload picture
      // then send that url to the backend as a profilePictureUrl
      if (selectedFile) {
        await handleUpload();
      }

      const response = await axiosInstance.post('/employee', {
        ...payLoad,
        profilePictureUrl: previewUrl,
      });
      dispatch(updateEmployeeData(response.data.data));
      toast.success('Employee created successfully!');
      setShowSuccess(true);
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

  // Check if schemaErrors exist for each tab
  const hasPersonalErrors = errors
    ? Object.keys(errors).some((key) => personalTabValidation.includes(key))
    : false;

  const hasEmploymentErrors = errors
    ? Object.keys(errors).some((key) => employmentTabValidation.includes(key))
    : false;

  useEffect(() => {
    if (hasPersonalErrors) {
      toast.error('Some input fields are missing in the Personal tab!');
    }
    if (hasEmploymentErrors) {
      toast.error('Some input fields are missing in the Employment tab!');
    }
  }, [hasPersonalErrors, hasEmploymentErrors]);

  console.log('Form errors: ', errors);

  return (
    <main>
      {showSuccess && (
        <SuccessMessage
          onClose={() => {
            router.push('/hr/employees');
            setShowSuccess(false);
          }}
        />
      )}
      <div className='flex justify-between'>
        <h1 className='flex items-center gap-x-2'>
          <TbEdit />
          <span>Create Employee</span>
        </h1>
        <div className='flex items-center gap-x-2'>
          <Button name='Save Draft' />
          <Button
            name='Cancel'
            className='bg-transparent border-none !text-black'
            onClick={() => router.back()}
          />
        </div>
      </div>
      {/* tabs */}
      <div className='my-1 pb-2 md:pb-4'>
        <div className='flex gap-0  my-2 border-b-[1px] border-gray-border overflow-x-auto '>
          <TabButton
            isRootTab={true}
            className={hasPersonalErrors ? `!border-red-500 text-red-500` : ''}
            name='Basic Information'
            href={`/hr/employees/create-employee?tab=0`}
          />
          <TabButton
            className={
              hasEmploymentErrors ? `!border-red-500 text-red-500` : ''
            }
            name='Employment'
            href={`/hr/employees/create-employee?tab=1`}
          />
        </div>
        <div>
          {/* using form provider for multi-step form */}
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TabComponent index='0' isRootTab={true}>
                <BasicInfo
                  countries={countries}
                  previewUrl={previewUrl}
                  handleFileChange={handleFileChange}
                />
              </TabComponent>
              <TabComponent index='1'>
                <Employment loader={loader} />
              </TabComponent>
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
};

export default CreateEmployee;
