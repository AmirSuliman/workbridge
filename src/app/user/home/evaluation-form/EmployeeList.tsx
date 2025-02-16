import ProfileAvatarItem from '@/components/common/ProfileAvatarItem';
import { IMAGES } from '@/constants/images';
import axiosInstance from '@/lib/axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Response from './Response';


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
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const survey = searchParams.get('survey');
  const managerId = searchParams.get('employee');

  useEffect(() => {
    const getManagerEmployees = async () => {
      if (!managerId || !survey) return;
      try {
        const response = await axiosInstance.get(`/survey/${survey}/manager/${managerId}`);
        if (response.data?.data?.length > 0) {
          const mappedEmployees = response.data.data[0].surveyEmployeeStatus.map((empStatus) => ({
            id: empStatus.employee.id,
            firstName: empStatus.employee.firstName,
            lastName: empStatus.employee.lastName,
            profilePictureUrl: IMAGES.placeholderAvatar.src, // Adjust if profile picture URL is available
            title: empStatus.employee.department?.name,
            surveyStatus: empStatus.status,
          }));
          setEmployees(mappedEmployees);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getManagerEmployees();
  }, [managerId, survey]);

  // Find the selected employee details
  const selectedEmployee = employees.find(emp => emp.id === selectedEmployeeId);
  const surveyStatus = selectedEmployee?.surveyStatus;

  return (
    <div className='flex flex-col gap-8 w-full items-start sm:flex-row'>
      <div className="bg-white border rounded-[10px] mt-8 sm:w-[35%] w-full">
        <h1 className="font-medium text-[18px] p-6">List of Employees</h1>
        <div className="flex flex-col items-start w-full my-4">
          {employees.length > 0 ? (
            employees.map((employee) => (
              <button
                key={employee.id}
                onClick={() => setSelectedEmployeeId(employee.id)}
                className={`flex flex-row items-center justify-between w-full py-2 px-6 hover:bg-gray-100 ${
                  employee.id === selectedEmployeeId ? 'bg-gray-100' : ''
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

      {/* Display message when no employee is selected */}
      {!selectedEmployeeId && employees.length > 0 && (
        <div className="bg-white p-6 mt-8 rounded-[10px] border w-full text-center">
          <p>Please select an employee to view their evaluation form.</p>
        </div>
      )}

      {selectedEmployeeId && (
        <div className='bg-white p-6 mt-8 rounded-[10px] border w-full'>
          {surveyStatus === 'Completed' ? (
            <p className="text-center text-green-600 font-semibold">Survey Completed</p>
          ) : (
            <Response 
              surveyId={survey} 
              employeeId={selectedEmployeeId} 
              managerId={managerId} 
              onSurveyUpdate={(updatedStatus) => {
                setEmployees((prevEmployees) =>
                  prevEmployees.map((emp) =>
                    emp.id === selectedEmployeeId ? { ...emp, surveyStatus: updatedStatus } : emp
                  )
                );
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Employeelist;
