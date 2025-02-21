import { MoveUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="">
      <div className=" gap-6 p-8 px-4 mx-auto max-w-[1750px] sm:px-16 flex flex-col sm:flex-row items-center sm:items-start justify-between ">
        <div className="flex flex-col gap-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={130}
            height={60}
            className="cursor-pointer"
          />

          <p className="text-gray-400 font-medium text-[14px] mt-2 sm:mt-32 mb-2">
            Privacy Policy • Terms & Conditions • All Rights Reserved
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <Link href="/Demo">
            <button className="flex flex-row items-center justify-center gap-1 bg-[#0F172A] p-3 px-8 text-white rounded-lg text-[12px]">
              Try our <span className="font-bold">Demo</span>{' '}
              <MoveUpRight size={14} />
            </button>
          </Link>
          <div className="flex flex-row items-end  gap-4 mt-2 sm:mt-20 ">
            <div className="flex flex-col  text-end justify-end">
              <p className="text-[14px] text-gray-400">powered by </p>
              <p className="text-[14px] text-[#0F172A]">ISA Consulting Group</p>
            </div>
            <div className="mb-1">
              <Link href="https://isaconsulting.com/">
                <Image src="/isalogo.svg" alt="img" width={80} height={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
