import ProfileAvatarItem from '@/components/common/ProfileAvatarItem';
import { IMAGES } from '@/constants/images';
import axiosInstance from '@/lib/axios';
import { EmployeeData } from '@/types/employee';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Employeelist = () => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const { managerId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const survey = searchParams.get('survey');
  const employeeId = searchParams.get('employee');
  // console.log('surveyId: ', survey, 'employeeId: ', employeeId);
  useEffect(() => {
    const getManagerEmployees = async () => {
      try {
        const response = await axiosInstance.get(`/employees/${managerId}`);
        console.log('resp:', response.data);
        setEmployees(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getManagerEmployees();
  }, [managerId]);

  return (
    <div className=" bg-white border rounded-[10px] mt-8">
      <h1 className="font-medium text-[18px] p-6">List of employees</h1>
      <div className="flex flex-col items-start w-full my-4">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <button
              onClick={(e) => {
                e.preventDefault();
                // manager and survey id
                router.push(
                  `user/home/evaluation-form/${managerId}?survey=${survey}&employee=${employee.id}`
                );
              }}
              key={employee.id}
              className={`flex flex-row items-center justify-between w-full py-2 px-6 hover:bg-gray-100 ${
                employee.id === Number(employeeId) ? 'bg-gray-100' : ''
              }`}
            >
              <div className="flex flex-row items-center gap-2 w-full">
                <ProfileAvatarItem
                  src={
                    employee.profilePictureUrl || IMAGES.placeholderAvatar.src
                  }
                  title={`${employee.firstName} ${employee.lastName}`}
                  subtitle={`${employee.tittle}`}
                />
              </div>
              <div className="text-[#00B87D] bg-[#D5F6DD] p-1 px-3 text-[12px] font-medium rounded ">
                Completed
              </div>
            </button>
          ))
        ) : (
          <div className="flex flex-row items-center justify-between w-full px-6">
            no employees avaible
          </div>
        )}
      </div>
    </div>
  );
};

export default Employeelist;
