import Image from 'next/image';
import Link from 'next/link';
import imageLoader from '../../../../../imageLoader';
import { useSession } from 'next-auth/react';

const Evaluation = ({ evaluation, employeeId }) => {
    const { data: session } = useSession();
    const userRole = session?.user?.role; 
    console.log(userRole, 'role');
  
  return (
    <div className="w-full p-6 bg-white rounded-[10px] border ">
      <p className="text-[18px] font-medium flex flex-row items-center gap-2">
        <Image
          loader={imageLoader}
          src="/Vector (Stroke).png"
          alt="img"
          width={30}
          height={30}
        />
        View Evaluation
      </p>
      {evaluation.map((item) => {
        const baseRoute = userRole === 'Admin' ? '/hr/home' : '/user/home';

        return (
          <div
            key={item.id}
            className="flex flex-row items-center justify-between w-full"
          >
            <div className="flex flex-col mt-8">
              <p className="text-[14px] font-semibold">Yearly Evaluation Form</p>
              <p className="text-[11px] font-bold">
                <span className="font-normal">Date:</span>{' '}
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
              </p>
            </div>
            <Link
              href={`${baseRoute}/userevaulationform?survey=${
                item.surveyId || ''
              }&employee=${item.employeeId || employeeId || ''}`}
              className="text-white text-[11px] bg-black p-2 rounded mt-3"
            >
              View Survey
            </Link>
          </div>
        );
      })}
      <div className="mt-5 w-full h-[1px] bg-gray-200" />
      <p className="text-[12px] font-normal mt-6">
        Evaluation forms are sent by HR to individual employees and or
        departments and must be completed.
      </p>
    </div>
  );
};

export default Evaluation;
