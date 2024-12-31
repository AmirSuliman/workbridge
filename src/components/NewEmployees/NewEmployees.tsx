import { getAllEmployees } from '@/services/getAllEmployees';
import { AllEmployeeData } from '@/types/employee';
import { useEffect, useState } from 'react';
import ScreenLoader from '../common/ScreenLoader';
import NewEmployeeInfo from './NewEmployeeInfo';

const NewEmployees = () => {
  const [employees, setEmployeesState] = useState<
    AllEmployeeData | undefined
  >();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const { data } = await getAllEmployees(1, 100000);
        setEmployeesState(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const getNewEmployees = () => {
    if (!employees?.items) return [];
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return employees.items.filter((employee) => {
      const hireDate = new Date(employee.hireDate);
      return hireDate > oneMonthAgo;
    });
  };

  const newEmployees = getNewEmployees();

  return (
    <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4 space-y-4">
      <h1 className="flex items-center gap-4 font-semibold text-xl mb-4">
        <svg
          width="17"
          height="22"
          viewBox="0 0 17 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.73548 17.3261C6.3865 17.3261 8.19631 17.3261 8.19631 17.3261C8.19631 17.3261 10.0058 17.3261 10.6572 17.3261C11.3079 17.3261 11.6033 16.3794 11.2267 15.7102C10.943 15.2059 10.4782 14.6342 9.72184 14.3095C9.28892 14.6125 8.76297 14.7908 8.19631 14.7908C7.629 14.7908 7.10374 14.6125 6.67077 14.3095C5.9141 14.6342 5.4496 15.2059 5.16565 15.7102C4.78936 16.3794 5.08447 17.3261 5.73548 17.3261Z"
            fill="#0F172A"
          />
          <path
            d="M8.19631 14.1573C9.30797 14.1573 10.2086 13.257 10.2086 12.1453V11.6633C10.2086 10.5516 9.30801 9.65074 8.19631 9.65074C7.08465 9.65074 6.18374 10.5516 6.18374 11.6633V12.1453C6.18374 13.257 7.08465 14.1573 8.19631 14.1573Z"
            fill="#0F172A"
          />
          <path
            d="M14.1721 2.98261H11.1302V3.63459C11.1302 4.8927 10.1064 5.91652 8.84829 5.91652H7.54433C6.28622 5.91652 5.2624 4.8927 5.2624 3.63459V2.98261H2.2206C1.19995 2.98261 0.372559 3.81 0.372559 4.83061V19.39C0.372559 20.4106 1.19995 21.238 2.2206 21.238H14.172C15.1926 21.238 16.02 20.4106 16.02 19.39V4.83061C16.0201 3.81 15.1927 2.98261 14.1721 2.98261ZM14.0641 19.282H2.3285V6.73147H14.0641V19.282Z"
            fill="#0F172A"
          />
          <path
            d="M7.54433 5.26454H8.84829C9.74704 5.26454 10.4782 4.5333 10.4782 3.63459V2.33063C10.4782 1.43192 9.747 0.700684 8.84829 0.700684H7.54433C6.64563 0.700684 5.91438 1.43192 5.91438 2.33063V3.63459C5.91438 4.53326 6.64563 5.26454 7.54433 5.26454ZM7.21834 2.33063C7.21834 2.15045 7.36415 2.00464 7.54433 2.00464H8.84829C9.02851 2.00464 9.17428 2.15045 9.17428 2.33063V2.98261C9.17428 3.16279 9.02851 3.3086 8.84829 3.3086H7.54433C7.36415 3.3086 7.21834 3.16279 7.21834 2.98261V2.33063Z"
            fill="#0F172A"
          />
        </svg>
        New Employees
      </h1>
      {loading ? (
        <ScreenLoader />
      ) : (
        <main className="divide-y-[1px] divide-[#E8E8E8] space-y-4">
          {newEmployees.length === 0 ? (
            <p>No new employees in the past month</p>
          ) : (
            newEmployees.map((employee) => (
              <NewEmployeeInfo
                key={employee.id}
                name={`${employee.firstName} ${employee.lastName}`}
                title={employee.tittle}
                img={
                  employee.profilePictureUrl ? employee.profilePictureUrl : ''
                }
                location={`${employee?.location?.state}, ${employee?.location?.country}`}
                startDate={new Date(employee.hireDate).toDateString()}
                id={employee.id}
              />
            ))
          )}
        </main>
      )}
    </section>
  );
};
export default NewEmployees;
