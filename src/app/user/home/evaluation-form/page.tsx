'use client';

import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import Response from './Response';
import Employeelist from './EmployeeList';
import DepartmentResponse from './departmentresponse';

const Evaluationform = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // ✅ Correct way to get query params
  const surveyType = searchParams.get('surveyType'); // Extract `surveyType`

  console.log(surveyType, "surveyType");

  return (
    <main className="p-6">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-2">
          <Image src="/Vector (Stroke).png" alt="img" width={30} height={30} />
          <h1 className="text-[22px] font-semibold">Evaluation Form</h1>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="border p-2 rounded bg-white px-4 text-[12px]"
        >
          Cancel
        </button>
      </div>
      <div className="flex gap-4 flex-col lg:flex-row">
        {surveyType === 'departmentSurvey' ? <DepartmentResponse /> : <Employeelist />}
      </div>
    </main>
  );
};

export default Evaluationform;
