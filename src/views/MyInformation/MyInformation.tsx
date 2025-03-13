'use client';
import ProfileCard from '@/components/common/ProfileCard';
import TabButton from '@/components/common/TabsComponent/TabButton';
import TabComponent from '@/components/common/TabsComponent/TabComponent';
import TabsContainer from '@/components/common/TabsComponent/TabsContainer';
import DocumentSection from '@/components/UserInformation/DocumentSection';
import EmergencySection from '@/components/UserInformation/EmergencySection';
import EmploymentSection from '@/components/UserInformation/EmploymentSection';
import NotesSection from '@/components/UserInformation/NotesSection';
import PaymentSection from '@/components/UserInformation/PaymentSection';
import TimeOffSection from '@/components/UserInformation/TimeOffSection';
import UserInfoSection from '@/components/UserInformation/UserInfoSection';
import axiosInstance from '@/lib/axios';
import { putEmployeeSchema } from '@/schemas/employeeSchema';
import {
  clearEmployeeData,
  fetchEmployeeData,
  updateEmployeeData,
} from '@/store/slices/employeeInfoSlice';
import { setUser } from '@/store/slices/myInfoSlice';
import { AppDispatch, RootState } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

interface ErrorResponse {
  message: string;
}

const MyInformation = () => {
  const [myInfoLoading, setMyInfoLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.myInfo);
  const myId = user?.user?.employeeId; // This id is used to view the current logged in user's info
  const { empId } = useParams(); // This id is used to view any employee's info
  const { data: session } = useSession();
  const [editEmployee, setEditEmployee] = useState<boolean>(false);
  const [schemaErrors, setSchemaErrors] = useState<FieldErrors | undefined>(
    undefined
  );

  const [role, setRole] = useState<string>();

  useEffect(() => {
    const fetchSession = async () => {
    // const session = await getSession();
      setRole(session?.user?.role);
    };

    fetchSession();
  }, []);

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';

  const {
    data: employeeData,
    error,
    loading,
  } = useSelector((state: RootState) => state.employee);

  const formattedData = {
    ...employeeData,
    birthday: employeeData?.birthday
      ? new Date(employeeData.birthday).toISOString().split('T')[0]
      : '',
    hireDate: employeeData?.hireDate
      ? new Date(employeeData.hireDate).toISOString().split('T')[0]
      : '',
    // effectiveDate: employeeData?.effectiveDate
    //   ? new Date(employeeData.effectiveDate).toISOString().split('T')[0]
    //   : '',
    salary: employeeData?.salary ? employeeData.salary : 0,
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

  const {
    reset,
    control,
    resetField,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(putEmployeeSchema),
    defaultValues: formattedData,
    mode: 'all',
  });

  useEffect(() => {
    const fetchMyId = async () => {
      if (session?.user?.accessToken) {
        try {
          const response = await axiosInstance.get('/user/my', {
            headers: { Authorization: `Bearer ${session.user.accessToken}` },
          });
          dispatch(setUser(response.data.data));
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error('Failed to load user data!');
        } finally {
          setMyInfoLoading(false);
        }
      } else {
        setMyInfoLoading(false);
        toast.error('Authentication failed. Please try again.');
      }
    };
    fetchMyId();
  }, [dispatch, session?.user?.accessToken]);

  useEffect(() => {
    // Fetch employee data if session and empId are valid
    if (
      !myInfoLoading &&
      session?.user.accessToken &&
      (empId || session?.user.userId)
    ) {
      dispatch(
        fetchEmployeeData({
          accessToken: session.user.accessToken,
          userId: Number(empId) || Number(myId),
        })
      );
    } else {
      console.log('Invalid session or user ID');
    }

    return () => {
      dispatch(clearEmployeeData());
    };
  }, [
    dispatch,
    empId,
    session?.user.accessToken,
    session?.user.userId,
    myId,
    myInfoLoading,
  ]);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // profile picture
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0];
        const fileType = file.type;

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
      console.log('Uploaded URL:', uploadedUrl);
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
    if (Object.keys(errors).length > 0) {
      toast.error(
        'Some input fields are missing in Personal or Employment tab!'
      );
    }
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
      reportingManagerId: data.reportingManagerId,
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

      console.log('put emp response: ', response.data);
      toast.success('Employee information updated successfully!');
      setEditLoading(false);
      setEditEmployee(false);
      dispatch(updateEmployeeData(response.data.data));

      // to immediatly get updated profile picture in the UserProfileInfo.tsx if a user update it
      if (!empId) {
        sessionStorage.setItem(
          'profilePictureUrl',
          response.data.data.profilePictureUrl
        );
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

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4">Error: {error}</div>;
  }

  if (!employeeData) {
    return <div className="p-4">No data available.</div>;
  }
  console.log('Form errors: ', schemaErrors);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`p-4 h-full`}>
      <ProfileCard
        setEditEmployee={setEditEmployee}
        editEmployee={editEmployee}
        employeeData={employeeData}
        loading={editLoading}
      />
      <TabsContainer containerClasses="my-1 pb-2 md:pb-4">
        <div className="flex gap-0  my-2 border-b-[1px] border-gray-border overflow-x-auto ">
          <TabButton
            isRootTab={true}
            name="Personal"
            href={`${
              empId
                ? `/${
                    isUserPanel ? 'user' : 'hr'
                  }/employees/employee-info/${empId}?tab=0`
                : `/${isUserPanel ? 'user' : 'hr'}/my-information?tab=0`
            }`}
          />
          <TabButton
            name="Employment"
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
                name="Time Off"
                href={`${
                  empId
                    ? `/${
                        isUserPanel ? 'user' : 'hr'
                      }/employees/employee-info/${empId}?tab=2`
                    : `/${isUserPanel ? 'user' : 'hr'}/my-information?tab=2`
                }`}
              />
              <TabButton
                name="Documents"
                href={`${
                  empId
                    ? `/${
                        isUserPanel ? 'user' : 'hr'
                      }/employees/employee-info/${empId}?tab=3`
                    : `/${isUserPanel ? 'user' : 'hr'}/my-information?tab=3`
                }`}
              />
              <TabButton
                name="Emergency"
                href={`${
                  empId
                    ? `/${
                        isUserPanel ? 'user' : 'hr'
                      }/employees/employee-info/${empId}?tab=4`
                    : `/${isUserPanel ? 'user' : 'hr'}/my-information?tab=4`
                }`}
              />
              <TabButton
                name="Notes"
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
                  name="Payments"
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
          <TabComponent index="0" isRootTab={true}>
            <UserInfoSection
              control={control}
              register={register}
              errors={schemaErrors}
              previewUrl={previewUrl}
              editEmployee={editEmployee}
              handleFileChange={handleFileChange}
            />
          </TabComponent>
          <TabComponent index="1">
            <EmploymentSection
              register={register}
              resetField={resetField}
              errors={schemaErrors}
              editEmployee={editEmployee}
              employeeData={employeeData}
            />
          </TabComponent>
          <TabComponent index="2">
            <TimeOffSection employeeData={employeeData} />
          </TabComponent>
          <TabComponent index="3">
            <DocumentSection employeeData={employeeData} />
          </TabComponent>
          <TabComponent index="4">
            <EmergencySection employeeData={employeeData} />
          </TabComponent>
          <TabComponent index="5">
            <NotesSection employeeId={empId || myId} />
          </TabComponent>
          {/* Superadmin can see all user's payments. Other users can see only thier own payments */}
          {(role === 'SuperAdmin' || !empId) && (
            <TabComponent index="6">
              <PaymentSection employeeId={empId || myId} />
            </TabComponent>
          )}
        </div>
      </TabsContainer>
    </form>
  );
};

export default MyInformation;
