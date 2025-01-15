import { FaGlobe } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

const Companyinfo = () => {
  return (
    <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4">
      <div className="flex flex-row gap-2 items-center mb-8">
        <img src="/Vector.png" alt="img" className="w-8 " />
        <h1 className="text-[#0F172A] font-medium text-[18px]">
          Company Information
        </h1>
      </div>

      <div className="space-y-2 p-4 ">
        <p className="text-gray-400 font-medium text-[14px]">Company</p>
        <div className="flex flex-row gap-2 items-center text-[14px] ">
          <FaGlobe />
          isaconsulting.com
        </div>
        <div className="flex flex-row gap-2 items-center text-[14px]">
          <FaEnvelope />
          prosper@isaconsulting.com
        </div>
        <div className="flex flex-row gap-2 items-center text-[14px] mb-4">
          <FaPhone style={{ transform: 'rotate(90deg)' }} />
          +123 456 7890
        </div>
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

        <div className="flex flex-row gap-2 items-center text-[14px] mb-2">
          <FaEnvelope />
          prosper@isaconsulting.com
        </div>
        <div className="flex flex-row gap-2 items-center text-[14px] mb-4">
          <FaPhone style={{ transform: 'rotate(90deg)' }} />
          +123 456 7890
        </div>
      </div>
      <div className="w-full h-[1px] mb-4  bg-[#E8E8E8]" />

      <div className="space-y-2 p-4 ">
        <p className="text-gray-400 font-medium">Socials</p>
        <div className="flex flex-row gap-2 items-center text-[14px] ">
          <FaInstagram />
          @isaconsultinggroup
        </div>
        <div className="flex flex-row gap-2 items-center text-[14px]">
          <FaTwitter />
          isaconsulting_
        </div>
        <div className="flex flex-row gap-2 items-center text-[14px]">
          <FaLinkedin />
          ISA Consulting
        </div>
      </div>
    </section>
  );
};
export default Companyinfo;
