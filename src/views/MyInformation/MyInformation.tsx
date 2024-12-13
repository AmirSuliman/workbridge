'use client';
import ProfileCard from '@/components/common/ProfileCard';
import Tab from '@/components/common/TabsComponent/Tab';
import TabPanel from '@/components/common/TabsComponent/TabPanel';
import TabsContainer from '@/components/common/TabsComponent/TabsContainer';
import DocumentSection from '@/components/UserInformation/DocumentSection';
import EmergencySection from '@/components/UserInformation/EmergencySection';
import EmploymentSection from '@/components/UserInformation/EmploymentSection';
import NotesSection from '@/components/UserInformation/NotesSection';
import TimeOffSection from '@/components/UserInformation/TimeOffSection';
import UserInfoSection from '@/components/UserInformation/UserInfoSection';
import axiosInstance from '@/lib/axios';
import {
  clearEmployeeData,
  fetchEmployeeData,
} from '@/store/slices/employeeInfoSlice';
import { AppDispatch, RootState } from '@/store/store';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

interface ErrorResponse {
  message: string;
}

const MyInformation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { empId } = useParams();
  const { data: session } = useSession();
  const [editEmployee, setEditEmployee] = useState<boolean>(false);
  const {
    data: employeeData,
    error,
    loading,
  } = useSelector((state: RootState) => state.employee);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: employeeData || undefined,
  });

  useEffect(() => {
    // Fetch employee data if session and empId are valid
    if (session?.user.accessToken && (empId || session.user.userId)) {
      dispatch(
        fetchEmployeeData({
          accessToken: session.user.accessToken,
          userId: empId || session.user.userId,
        })
      );
    } else {
      console.error('Invalid session or user ID');
    }

    return () => {
      dispatch(clearEmployeeData());
    };
  }, [dispatch, empId, session?.user.accessToken, session?.user.userId]);

  useEffect(() => {
    if (employeeData) {
      reset(employeeData);
      console.log(employeeData);
    }
  }, [employeeData, reset]);

  const onSubmit = async (data: any) => {
    try {
      await axiosInstance.put(
        `/employee/${empId || session?.user.userId}`,
        data
      );
      toast.success('Employee information updated successfully!');
    } catch (err) {
      console.error('Error updating employee data:', err);

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

  const UserInfoSectionMemo = useMemo(
    () => (
      <UserInfoSection
        editEmployee={editEmployee}
        register={register}
        errors={errors}
      />
    ),
    [editEmployee, errors, register]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employeeData) {
    return <div>No data available.</div>;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`p-4 h-full`}>
      <ProfileCard
        setEditEmployee={setEditEmployee}
        editEmployee={editEmployee}
        employeeData={employeeData}
      />
      <TabsContainer containerClasses="my-1 pb-2 md:pb-4">
        <div className="flex gap-0  my-2 border-b-[1px] border-gray-border overflow-x-auto ">
          <Tab
            index={0}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Personal
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
            Time Off{' '}
          </Tab>
          <Tab
            index={3}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Documents
          </Tab>
          <Tab
            index={4}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Emergency
          </Tab>
          {!empId && (
            <Tab
              index={5}
              tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
              activeTabStyle="font-semibold border-b-2 !border-dark-navy"
            >
              Notes
            </Tab>
          )}
        </div>
        <div>
          <TabPanel index={0}>{UserInfoSectionMemo}</TabPanel>
          <TabPanel index={1}>
            <EmploymentSection
              register={register}
              errors={errors}
              editEmployee={editEmployee}
              employeeData={employeeData}
            />
          </TabPanel>
          <TabPanel index={2}>
            <TimeOffSection />
          </TabPanel>
          <TabPanel index={3}>
            <DocumentSection />
          </TabPanel>
          <TabPanel index={4}>
            <EmergencySection />
          </TabPanel>
          {!empId && (
            <TabPanel index={5}>
              <NotesSection />
            </TabPanel>
          )}
        </div>
      </TabsContainer>
    </form>
  );
};

export default MyInformation;
