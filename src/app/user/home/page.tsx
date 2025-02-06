'use client';

import Button from '@/components/Button';
import Celebrations from '@/components/Celebrations/Celebrations';
import Companyinfo from '@/components/companyinformation/companyinformaion';
import NewEmployees from '@/components/NewEmployees/NewEmployees';
import SingleAnnouncement from '@/components/SingleAnnouncement/SingleAnnouncement';
import Training from '@/components/Training/Training';
import WhosOut from '@/components/WhosOut/WhosOut';
import Link from 'next/link';
import { HiSpeakerphone } from 'react-icons/hi';
import { PiArrowUpRightThin } from 'react-icons/pi';
import Evaluation from './components/evaluation';
import Newpolicyupdate from './components/newpolicyupdate';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';
import { getSession } from 'next-auth/react';

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

  const fetchSession = async (): Promise<Session | null> => {
    const session = await getSession();
    console.log('session: ', session);
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
  console.log('Home employeeId: ', employeeId);

  useEffect(() => {
    const getEvaluationNotification = async () => {
      try {
        if (employeeId) {
          const response = await axiosInstance.get(
            `/survey/notification/employee/${employeeId.employeeId}`
          );
          console.log('Evalution response: ', response.data.data.notifications);
          setEvaluation(response.data.data.notifications);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEvaluationNotification();
  }, [employeeId]);
  console.log('surveys: ');
  return (
    <div className="p-6">
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WhosOut />

        {evaluation
          ? evaluation.length > 0 && <Evaluation evaluation={evaluation} />
          : ''}
        <Newpolicyupdate />

        <Celebrations />
        <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 space-y-2">
          <header className="px-4 flex items-center gap-4 justify-between">
            <h1 className="flex items-center gap-4 font-semibold text-xl mb-4">
              <HiSpeakerphone />
              Announcements
            </h1>
            <Link href="/hr/announcements-&-policies/announcements">
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
        <Training />
        <NewEmployees />
        <Companyinfo />
      </main>
    </div>
  );
};
export default Home;
