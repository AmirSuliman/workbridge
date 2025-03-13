'use client';

import Button from '@//components/Button';
import Celebrations from '@//components/Celebrations/Celebrations';
import Companyinfo from '@//components/companyinformation/companyinformaion';
import Employeementreport from '@//components/Employementreport/employmentreport';
import LeaveRequests from '@//components/LeaveRequests/LeaveRequests';
import NewEmployees from '@//components/NewEmployees/NewEmployees';
import SingleAnnouncement from '@//components/SingleAnnouncement/SingleAnnouncement';
import Training from '@//components/Training/Training';
import WhosOut from '@//components/WhosOut/WhosOut';
import Link from 'next/link';
import { HiSpeakerphone } from 'react-icons/hi';
import { PiArrowUpRightThin } from 'react-icons/pi';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Evaluation from '@/app/user/home/components/evaluation';
import axiosInstance from '@/lib/axios';

const Page = () => {
  const [role, setRole] = useState<string>();
  const [evaluation, setEvaluation] = useState<any[]>([]);
  const [employeeId, setEmployeeId] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSession = async (): Promise<Session | null> => {
    const session = await getSession();
    return session;
  };

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setRole(session?.user?.role);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchSessionAndSetEmployeeId = async () => {
      const session = await fetchSession();
      if (session?.user?.employeeId) {
        setEmployeeId({ employeeId: session.user.employeeId });
      } else {
        setEmployeeId({ employeeId: null });
      }
    };

    fetchSessionAndSetEmployeeId();
  }, []);

  useEffect(() => {
    const getEvaluationNotification = async () => {
      if (employeeId?.employeeId && role) {
        setLoading(true);
        try {
          const roleParam = role ===  'Manager' ? 'Manager' : 'Employee';
          const response = await axiosInstance.get(
            `/survey/notification/employee/${employeeId.employeeId}?role=${roleParam}`
          );
          console.log(response, 'resnotification');

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
          setLoading(false);
        }
      }
    };

    if (employeeId && role) {
      getEvaluationNotification();
    }
  }, [employeeId, role]);

  const isViewOnly = role === 'ViewOnly';
  const isHR = role === 'Admin'; 
  const isManager = role === 'Manager'; 
  return (
    <main className="flex flex-col sm:flex-row items-start gap-4 w-full">
      <div className="flex flex-col gap-4 w-full sm:w-[45%]">
        <WhosOut />
        <Companyinfo />
        <Employeementreport />
      </div>
      <div className="flex flex-col gap-4 flex-1">
      {(isHR || isManager || !isViewOnly)  && (
            <Evaluation evaluation={evaluation} employeeId={employeeId} />
          )}
        <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 space-y-2">
          
          <header className="px-4 flex items-center gap-4 justify-between">
            <h1 className="flex items-center gap-4 font-medium text-[18px] mb-4">
              <HiSpeakerphone />
              Announcements
            </h1>
            <Link href="/hr/announcements-&-policies/announcements">
              <Button
                name="See All"
                icon={<PiArrowUpRightThin size={18} />}
                bg="transparent"
                textColor="black"
                className="!text-[10px]"
              />
            </Link>
          </header>
          <SingleAnnouncement />
        </section>
        <LeaveRequests />
        <NewEmployees />
      </div>
    </main>
  );
};

export default Page;
