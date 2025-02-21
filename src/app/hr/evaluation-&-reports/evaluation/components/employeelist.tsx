import ProfileAvatarItem from '@/components/common/ProfileAvatarItem';
import { IMAGES } from '@/constants/images';
import axiosInstance from '@/lib/axios';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  title?: string;
  surveyStatus: string;
}
const Employeelist = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { managerId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const survey = searchParams.get('survey');
  const employeeId = searchParams.get('employee');

  console.log('searchParams:', searchParams.toString());
  console.log('surveyId:', survey, 'employeeId:', employeeId);

  useEffect(() => {
    const getManagerEmployees = async () => {
      if (!managerId || !survey) return;
      try {
        const response = await axiosInstance.get(`/survey/${survey}/manager/${managerId}`);
        console.log('API Response:', response.data);

        if (response.data?.data?.length > 0) {
          const surveyData = response.data.data[0];

          let mappedEmployees: Employee[] = [];
          if (surveyData.surveyEmployeeStatus.length > 0) {
            mappedEmployees = surveyData.surveyEmployeeStatus.map((empStatus) => ({
              id: empStatus.employee?.id || null,
              firstName: empStatus.employee?.firstName || 'Unknown',
              lastName: empStatus.employee?.lastName || '',
              profilePictureUrl: empStatus.employee?.profilePictureUrl || IMAGES.placeholderAvatar.src,
              title: empStatus.employee?.department?.name || 'No Title',
              surveyStatus: empStatus.status || 'Pending',
            }));
          }

          setEmployees(mappedEmployees);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    getManagerEmployees();
  }, [managerId, survey]);

  return (
    <div className="bg-white border rounded-[10px] mt-8">
      <h1 className="font-medium text-[18px] p-6">List of Employees</h1>
      <div className="flex flex-col items-start w-full my-4">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (!survey) {
                  console.warn('Survey ID is missing');
                  return;
                }

                router.push(
                  `/hr/evaluation-&-reports/evaluation/${managerId}?survey=${survey}&employee=${employee.id}`
                );
              }}
              key={employee.id}
              className={`flex flex-row items-center justify-between w-full py-2 px-6 hover:bg-gray-100 ${
                employee.id === Number(employeeId) ? 'bg-gray-100' : ''
              }`}
            >
              <div className="flex flex-row items-center gap-2 w-full">
                <ProfileAvatarItem
                  src={employee.profilePictureUrl}
                  title={`${employee.firstName} ${employee.lastName}`}
                  subtitle={employee.title}
                />
              </div>
              <div className="text-[#00B87D] bg-[#D5F6DD] p-1 px-3 text-[12px] font-medium rounded">
                {employee.surveyStatus}
              </div>
            </button>
          ))
        ) : (
          <div className="flex flex-row items-center justify-between w-full px-6">
            No employees available
          </div>
        )}
      </div>
    </div>
  );
};

export default Employeelist;
