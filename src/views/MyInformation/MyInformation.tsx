'use client';
import ProfileCard from '@/components/common/ProfileCard';
import ScreenLoader from '@/components/common/ScreenLoader';
import TabButton from '@/components/common/TabsComponent/TabButton';
import TabComponent from '@/components/common/TabsComponent/TabComponent';
import DocumentSection from '@/components/UserInformation/DocumentSection';
import EmergencySection from '@/components/UserInformation/EmergencySection';
import EmploymentSection from '@/components/UserInformation/EmploymentSection';
import NotesSection from '@/components/UserInformation/NotesSection';
import PaymentSection from '@/components/UserInformation/PaymentSection';
import TimeOffSection from '@/components/UserInformation/TimeOffSection';
import UserInfoSection from '@/components/UserInformation/UserInfoSection';
import axiosInstance from '@/lib/axios';
import { getEmployeeSchema } from '@/schemas/employeeSchema';
import {
  clearEmployeeData,
  fetchEmployeeData,
  updateEmployeeData,
} from '@/store/slices/employeeInfoSlice';
import { AppDispatch, RootState } from '@/store/store';
import {
  employmentTabValidation,
  personalTabValidation,
} from '@/utils/tabValidations';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

interface ErrorResponse {
  message: string;
}

const MyInformation = () => {
  const [editLoading, setEditLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.myInfo);
  const role = user?.user?.role;
  const myId = user?.user?.employeeId; // This id is used to view the current logged in user's info
  const { empId } = useParams(); // This id is used to view any employee's info
  const [editEmployee, setEditEmployee] = useState<boolean>(false);
  const [schemaErrors, setSchemaErrors] = useState<FieldErrors | undefined>(
    undefined
  );

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';

  const {
    data: employeeData,
    error,
    loading,
  } = useSelector((state: RootState) => state.employee);

  const formattedData = {
    ...employeeData,
    birthday: employeeData?.birthday
      ? new Date(employeeData?.birthday).toISOString().split('T')[0]
      : '',
    hireDate: employeeData?.hireDate
      ? new Date(employeeData?.hireDate).toISOString().split('T')[0]
      : '',
    salary: employeeData?.salary ? employeeData.salary : 0,
    country: employeeData?.country?.country || '',
    location: {
      zipCode: employeeData?.location?.zipCode || '',
      street1: employeeData?.location?.street1 || '',
      street2: employeeData?.location?.street2 || '',
      city: employeeData?.location?.city || '',
      country: employeeData?.location?.country || '',
      state: employeeData?.location?.state || '',
    },
    phoneNumber: employeeData?.phoneNumber || '',
    workPhone: employeeData?.workPhone || '',
  };

  // conditionaly get schema
  // if role is superadmin and emplId is not coming from the searchParams
  // then make the reporignManagerId required
  const putEmployeeSchema = getEmployeeSchema(role, empId);
  const {
    reset,
    control,
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(putEmployeeSchema),
    defaultValues: formattedData,
    mode: 'all',
  });

  useEffect(() => {
    // Fetch employee data if session and empId are valid

    if (empId || myId) {
      dispatch(
        fetchEmployeeData({
          userId: Number(empId) || Number(myId),
        })
      );
    } else {
      //Invalid session or user ID
    }

    return () => {
      dispatch(clearEmployeeData());
    };
  }, [dispatch, empId, myId]);

  // profile picture
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0];

        if (!file.type.startsWith('image/')) {
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
      setPreviewUrl(uploadedUrl);
      return { uploadedUrl, error: null };
    } catch (err) {
      console.error(err);
      return { error: err };
    }
  };

  useEffect(() => {
    if (employeeData) {
      reset(formattedData);
    }
  }, [employeeData, reset]);

  useEffect(() => {
    setSchemaErrors(errors);
  }, [errors]);

  const onSubmit = async (data: any) => {
    // PUT employee/id needs the following payload.
    // The data parameter ☝ contains extra fields that backend does not expect.
    const payLoad = {
      firstName: data.firstName,
      lastName: data.lastName,
      isManager: data.isManager,
      departmentId: data.departmentId,
      email: data.email,
      middleName: data.middleName,
      tittle: data.tittle,
      gender: data.gender,
      marritialStatus: data.marritialStatus,
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
      countryId: data.countryId,
      // don't send 0 to backend it gives error
      reportingManagerId:
        data.reportingManagerId === 0 ? undefined : data.reportingManagerId,
      employmentType: data.employmentType,
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
      setEditLoading(true);
      // handle profile picture to get url from the upload picture
      // then send that url to the backend as a profilePictureUrl
      let uploadResponse: { uploadedUrl?: string; error?: unknown } | null =
        null;
      if (selectedFile) {
        uploadResponse = (await handleUpload()) || { error: null };
      }

      // Add profilePictureUrl to payload
      const finalPayload = {
        ...payLoad,
        profilePictureUrl: uploadResponse?.uploadedUrl,
      };
      const response = await axiosInstance.put(
        `/employee/${empId || myId}`,
        finalPayload
      );

      toast.success('Employee information updated successfully!');
      setEditLoading(false);
      setEditEmployee(false);
      dispatch(
        updateEmployeeData({
          ...employeeData,
          ...response.data.data,
          location: {
            ...employeeData?.location,
            ...response.data.data.location,
          },
          country: {
            ...employeeData?.country,
            ...response.data.data.country,
          },
        })
      );

      // to immediatly get updated profile picture in the UserProfileInfo.tsx if a user update it
      if (!empId) {
        sessionStorage.setItem(
          'profilePictureUrl',
          response.data.data.profilePictureUrl
        );
        // Dispatch a custom event to get profilePictureUpdated in the header component
        window.dispatchEvent(new Event('profilePictureUpdated'));
      }
    } catch (err) {
      console.error('Error updating employee data:', err);
      setEditLoading(false);

      // Check if it's an AxiosError
      if ((err as AxiosError<ErrorResponse>).response) {
        const axiosError = err as AxiosError<ErrorResponse>;
        toast.error(
          axiosError.response?.data?.message ||
            'Failed to update employee data.'
        );
      } else {
        toast.error('Failed to update employee data.');
      }
    }
  };

  // Check if schemaErrors exist for each tab
  const hasPersonalErrors = schemaErrors
    ? Object.keys(schemaErrors).some((key) =>
        personalTabValidation.includes(key)
      )
    : false;

  const hasEmploymentErrors = schemaErrors
    ? Object.keys(schemaErrors).some((key) =>
        employmentTabValidation.includes(key)
      )
    : false;

  useEffect(() => {
    if (hasPersonalErrors) {
      toast.error('Some input fields are missing in the Personal tab!');
    }
    if (hasEmploymentErrors) {
      toast.error('Some input fields are missing in the Employment tab!');
    }
  }, [hasPersonalErrors, hasEmploymentErrors]);

  if (loading) {
    return (
      <div className='p-4'>
        <ScreenLoader />
      </div>
    );
  }

  if (error) {
    return <div className='p-4'>Error: {error}</div>;
  }

  if (!employeeData) {
    return <div className='p-4'>No data available.</div>;
  }

  return (
    <form className={`my-1 p-4 h-full`}>
      <ProfileCard
        onSubmit={handleSubmit(onSubmit)}
        setEditEmployee={setEditEmployee}
        editEmployee={editEmployee}
        employeeData={employeeData}
        loading={editLoading}
      />
      <div className='flex gap-0  my-2 border-b-[1px] border-gray-border overflow-x-auto '>
        <TabButton
          isRootTab={true}
          className={hasPersonalErrors ? `!border-red-500 text-red-500` : ''}
          name='Personal'
          href={`${
            empId
              ? `/${
                  isUserPanel ? 'user' : 'hr'
                }/employees/employee-info/${empId}?tab=0`
              : `/${isUserPanel ? 'user' : 'hr'}/my-information?tab=0`
          }`}
        />
        <TabButton
          className={hasEmploymentErrors ? `!border-red-500 text-red-500` : ''}
          name='Employment'
          href={`${
            empId
              ? `/${
                  isUserPanel ? 'user' : 'hr'
                }/employees/employee-info/${empId}?tab=1`
              : `/${isUserPanel ? 'user' : 'hr'}/my-information?tab=1`
          }`}
        />

        {/* If we are editing a user info then hide the following tabs */}
        {!editEmployee && (
          <>
            <TabButton
              name='Time Off'
              href={`${
                empId
                  ? `/${
                      isUserPanel ? 'user' : 'hr'
                    }/employees/employee-info/${empId}?tab=2`
                  : `/${isUserPanel ? 'user' : 'hr'}/my-information?tab=2`
              }`}
            />
            <TabButton
              name='Documents'
              href={`${
                empId
                  ? `/${
                      isUserPanel ? 'user' : 'hr'
                    }/employees/employee-info/${empId}?tab=3`
                  : `/${isUserPanel ? 'user' : 'hr'}/my-information?tab=3`
              }`}
            />
            <TabButton
              name='Emergency'
              href={`${
                empId
                  ? `/${
                      isUserPanel ? 'user' : 'hr'
                    }/employees/employee-info/${empId}?tab=4`
                  : `/${isUserPanel ? 'user' : 'hr'}/my-information?tab=4`
              }`}
            />
            <TabButton
              name='Notes'
              href={`${
                empId
                  ? `/${
                      isUserPanel ? 'user' : 'hr'
                    }/employees/employee-info/${empId}?tab=5`
                  : `/${isUserPanel ? 'user' : 'hr'}/my-information?tab=5`
              }`}
            />

            {/* Superadmin can see all user's payments. Other users can see only thier own payments */}

            {(role === 'SuperAdmin' || !empId) && (
              <TabButton
                name='Payments'
                href={`${
                  empId
                    ? `/${
                        isUserPanel ? 'user' : 'hr'
                      }/employees/employee-info/${empId}?tab=6`
                    : `/${isUserPanel ? 'user' : 'hr'}/my-information?tab=6`
                }`}
              />
            )}
          </>
        )}
      </div>
      <div>
        <TabComponent index='0' isRootTab={true}>
          <UserInfoSection
            control={control}
            register={register}
            errors={schemaErrors}
            previewUrl={previewUrl}
            editEmployee={editEmployee}
            handleFileChange={handleFileChange}
          />
        </TabComponent>
        <TabComponent index='1'>
          <EmploymentSection
            register={register}
            resetField={resetField}
            errors={schemaErrors}
            editEmployee={editEmployee}
            employeeData={employeeData}
          />
        </TabComponent>
        <TabComponent index='2'>
          <TimeOffSection employeeData={employeeData} />
        </TabComponent>
        <TabComponent index='3'>
          <DocumentSection employeeData={employeeData} />
        </TabComponent>
        <TabComponent index='4'>
          <EmergencySection employeeData={employeeData} />
        </TabComponent>
        <TabComponent index='5'>
          <NotesSection employeeId={empId || myId} />
        </TabComponent>
        {/* Superadmin can see all user's payments. Other users can see only thier own payments */}
        {(role === 'SuperAdmin' || !empId) && (
          <TabComponent index='6'>
            <PaymentSection employeeId={empId || myId} />
          </TabComponent>
        )}
      </div>
    </form>
  );
};

export default MyInformation;
