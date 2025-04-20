'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Employeelist from '../../../user/home/evaluation-form/EmployeeList';
import DepartmentResponse from '../../../user/home/evaluation-form/departmentresponse';
import imageLoader from '../../../../../imageLoader';

const Evaluationform = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const surveyType = searchParams.get('surveyType'); 

  console.log(surveyType, 'surveyType');

  return (
    <main className="p-6">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-2">
          <Image
            loader={imageLoader}
            src="/Vector (Stroke).png"
            alt="img"
            width={30}
            height={30}
          />
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
        {surveyType === 'departmentSurvey' ? (
          <DepartmentResponse />
        ) : (
          <Employeelist />
        )}
      </div>
    </main>
  );
};

export default Evaluationform;
