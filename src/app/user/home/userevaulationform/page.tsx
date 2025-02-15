'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Response from './response';
import { useSearchParams } from 'next/navigation';

const Evaluationform = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
const employeeId = searchParams.get('employee');

  console.log(employeeId, "employeeid");

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
         <Response />
      </div>
    </main>
  );
};

export default Evaluationform;
