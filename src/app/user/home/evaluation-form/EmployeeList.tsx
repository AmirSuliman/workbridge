import ProfileAvatarItem from '@/components/common/ProfileAvatarItem';
import { IMAGES } from '@/constants/images';
import axiosInstance from '@/lib/axios';
import { EmployeeData } from '@/types/employee';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Response from './Response';

const Employeelist = () => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const survey = searchParams.get('survey');
  const managerId = searchParams.get('employee'); 
  console.log(managerId, 'managerId');
  
  useEffect(() => {
    const getManagerEmployees = async () => {
      if (!managerId) return;
      try {
        const response = await axiosInstance.get(`/employees/${managerId}`);
        setEmployees(response.data.data);
        console.log(response, "employeeres");
      } catch (error) {
        console.log(error);
      }
    };
    getManagerEmployees();
  }, [managerId]);

  return (
    <div className='flex flex-col gap-8 w-full items-start sm:flex-row'>
      <div className="bg-white border rounded-[10px] mt-8 sm:w-[35%] w-full">
        <h1 className="font-medium text-[18px] p-6">List of Employees</h1>
        <div className="flex flex-col items-start w-full my-4">
          {employees.length > 0 ? (
            employees.map((employee) => (
              <button
                key={employee.id}
                onClick={() => setSelectedEmployeeId(employee.id)} // Set selected employee ID
                className={`flex flex-row items-center justify-between w-full py-2 px-6 hover:bg-gray-100 ${
                  employee.id === selectedEmployeeId ? 'bg-gray-100' : ''
                }`}
              >
                <div className="flex flex-row items-center gap-2 w-full">
                  <ProfileAvatarItem
                    src={employee.profilePictureUrl || IMAGES.placeholderAvatar.src}
                    title={`${employee.firstName} ${employee.lastName}`}
                    subtitle={employee.tittle}
                  />
                </div>
                <div className="text-[#00B87D] bg-[#D5F6DD] p-1 px-3 text-[12px] font-medium rounded">
                  Completed
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

      {/* Display message when no employee is selected */}
      {!selectedEmployeeId && employees.length > 0 && (
        <div className="bg-white p-6 mt-8 rounded-[10px] border w-full text-center">
          <p>Please select an employee to view their evaluation form.</p>
        </div>
      )}

      {/* Show Response Component When an Employee is Selected */}
      {selectedEmployeeId && (
        <div className='bg-white p-6 mt-8 rounded-[10px] border w-full'>
          <Response surveyId={survey} employeeId={selectedEmployeeId} managerId={managerId} />
        </div>
      )}
    </div>
  );
};

export default Employeelist;
