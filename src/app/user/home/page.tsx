'use client';

import Button from '@/components/Button';
import Celebrations from '@/components/Celebrations/Celebrations';
import Companyinfo from '@/components/companyinformation/companyinformaion';
import NewEmployees from '@/components/NewEmployees/NewEmployees';
import SingleAnnouncement from '@/components/Announcements/SingleAnnouncement';
import Training from '@/components/Training/Training';
import WhosOut from '@/components/WhosOut/WhosOut';
import axiosInstance from '@/lib/axios';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiSpeakerphone } from 'react-icons/hi';
import { PiArrowUpRightThin } from 'react-icons/pi';
import Evaluation from './components/evaluation';
import HomePolicies from './components/HomePolicies';
import UserEvaluation from './components/userevaulation';
import {
  clearEmployeeData,
  fetchEmployeeData,
} from '@/store/slices/employeeInfoSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';

interface InnerUser {
  active: boolean;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  permissions: string[];
  profilePictureUrl: string;
  role: string;
  roleId: number;
  userId: string;
  accessToken: string;
  employeeId?: number; // Add employeeId as optional
}

interface Session {
  user: InnerUser;
}

interface User {
  employeeId: number | null;
}

const Home = () => {
  const [evaluation, setEvaluation] = useState<any[]>([]);
  const [employeeId, setEmployeeId] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const fetchSession = async (): Promise<Session | null> => {
    const session = await getSession();
    console.log(session, 'session');
    return session;
  };

  useEffect(() => {
    const fetchSessionAndSetEmployeeId = async () => {
      const session = await fetchSession();
      if (session?.user?.employeeId) {
        setEmployeeId({ employeeId: session.user.employeeId });
      } else {
        setEmployeeId({ employeeId: null }); // Handle the case where employeeId is not available
      }
    };

    fetchSessionAndSetEmployeeId();
  }, []);

  useEffect(() => {
    // Fetch employee data if session and empId are valid
    if (session?.user.accessToken && session?.user?.employeeId) {
      dispatch(
        fetchEmployeeData({
          accessToken: session.user.accessToken,
          userId: session?.user?.employeeId,
        })
      );
    } else {
      console.log('Invalid session or user ID');
    }

    return () => {
      dispatch(clearEmployeeData());
    };
  }, [dispatch, session?.user.accessToken, session?.user?.employeeId]);

  const { data: employeeData } = useSelector(
    (state: RootState) => state.employee
  );
  console.log('employeeData:', employeeData);

  useEffect(() => {
    const getEvaluationNotification = async () => {
      if (employeeId?.employeeId && employeeData) { // Ensure employeeData is available
        setLoading(true); // Start loading while fetching
        try {
          // Determine roleParam based on isManager
          const roleParam = employeeData.isManager ? 'Manager' : 'Employee';
  
          const response = await axiosInstance.get(
            `/survey/notification/employee/${employeeId.employeeId}?role=${roleParam}`
          );
          console.log('resnotification', response);
  
          const updatedEvaluations = response.data.data.notifications.map(
            (item) => ({
              ...item,
              employeeId: employeeId.employeeId,
              surveyId:
                item.surveyId || item.surveyEmployeeStatus?.surveyId || null,
              surveyType: item.surveyType || '',
            })
          );
  
          setEvaluation(updatedEvaluations);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false); // Stop loading after API call completes
        }
      }
    };
  
    if (employeeId && employeeData) { // Ensure employeeData is available
      getEvaluationNotification();
    }
  }, [employeeId, employeeData]); 

  const isManager = employeeData?.isManager;
  console.log(isManager, 'manager');

  return (
    <div className="p-6">
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WhosOut />
        <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 space-y-2">
          <header className="px-4 flex items-center gap-4 justify-between">
            <h1 className="flex items-center gap-4 font-semibold text-xl mb-4">
              <HiSpeakerphone />
              Announcements
            </h1>
            <Link href="/user/home/all-announcements">
              <Button
                name="See All"
                icon={<PiArrowUpRightThin size={18} />}
                bg="transparent"
                textColor="black"
              />
            </Link>
          </header>
          <SingleAnnouncement />
        </section>

        {isManager && (
          <Evaluation evaluation={evaluation} employeeId={employeeId} />
        )}

        {!isManager && (
          <UserEvaluation evaluation={evaluation} employeeId={employeeId} />
        )}


        <HomePolicies />
        <Companyinfo />
        <NewEmployees />
      </main>
    </div>
  );
};

export default Home;