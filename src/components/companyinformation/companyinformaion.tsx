import Link from 'next/link';
import {
  FaEnvelope,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
} from 'react-icons/fa';

const Companyinfo = () => {
  return (
    <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4 ">
      <div className="flex flex-row gap-2 items-center mb-8">
        <img src="/Vector.png" alt="img" className="w-8 " />
        <h1 className="text-[#0F172A] font-medium text-[18px]">
          Company Information
        </h1>
      </div>

      <div className="space-y-2 p-4 ">
        <p className="text-gray-400 font-medium text-[14px]">Company</p>
        <Link
          href="https://isaconsulting.com/"
          target="_blank"
          className="flex flex-row gap-2 items-center text-[14px] "
        >
          <FaGlobe />
          isaconsulting.com
        </Link>
        <Link
          href="mailto:prosper@isaconsulting.com"
          target="_blank"
          className="flex flex-row gap-2 items-center text-[14px]"
        >
          <FaEnvelope />
          prosper@isaconsulting.com
        </Link>
        <Link
          href="tel:(888) 396-1112"
          target="_blank"
          className="flex flex-row gap-2 items-center text-[14px] mb-4"
        >
          <FaPhone style={{ transform: 'rotate(90deg)' }} />
          (888) 396-1112
        </Link>
      </div>
      <div className="w-full h-[1px] mb-4 bg-[#E8E8E8]" />

      <div className=" p-4 ">
        <p className="text-gray-400 font-medium text-[14px] mb-2">
          Company Contacts
        </p>
        <p className="text-[14px]">Firstname Lastname</p>
        <p className="text-gray-400 font-medium text-[14px] mb-2">
          Regional Officer
        </p>

        <Link
          href="mailto:prosper@isaconsulting.com"
          target="_blank"
          className="flex flex-row gap-2 items-center text-[14px] mb-2"
        >
          <FaEnvelope />
          prosper@isaconsulting.com
        </Link>
        <Link
          href="tel:(888) 396-1112"
          target="_blank"
          className="flex flex-row gap-2 items-center text-[14px] mb-4"
        >
          <FaPhone style={{ transform: 'rotate(90deg)' }} />
          (888) 396-1112
        </Link>
      </div>
      <div className="w-full h-[1px] mb-4  bg-[#E8E8E8]" />

      <div className="space-y-2 p-4 ">
        <p className="text-gray-400 font-medium">Socials</p>
        <Link
          href="https://www.instagram.com/isaconsultinggroup/"
          target="_blank"
          className="flex flex-row gap-2 items-center text-[14px] "
        >
          <FaInstagram />
          @isaconsultinggroup
        </Link>
        <Link
          href="https://twitter.com/ISAConsulting_"
          target="_blank"
          className="flex flex-row gap-2 items-center text-[14px]"
        >
          <FaTwitter />
          ISAConsulting_
        </Link>
        <Link
          href="https://www.linkedin.com/company/isaconsulting/mycompany/"
          target="_blank"
          className="flex flex-row gap-2 items-center text-[14px]"
        >
          <FaLinkedin />
          ISA Consulting
        </Link>
      </div>
    </section>
  );
};
export default Companyinfo;
