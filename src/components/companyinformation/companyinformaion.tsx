import Link from 'next/link';
import {
  FaEnvelope,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
} from 'react-icons/fa';
import Contact from './Contact';

const Companyinfo = () => {
  return (
    <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4 ">
      <div className="flex flex-row gap-2 items-center mb-8">
        <img src="/Vector.png" alt="img" className="w-8 " />
        <h1 className="text-[#0F172A] font-medium text-[18px]">
          Company Information
        </h1>
      </div>

      <section className=" p-4 text-[#0F172A]">
        <h4 className=" font-medium text-[12px] opacity-50 mb-2">
          Company Contacts
        </h4>
        <div
          style={{
            scrollbarWidth: 'thin',
          }}
          className="w-full overflow-auto grid divide-y-[1px] divide-[#E8E8E8] grid-cols-2 gap-x-8 max-h-[400px] pr-2"
        >
          <Contact />
        </div>
      </section>
      <div className="w-full h-[1px] my-4 bg-[#E8E8E8]" />
      <div className="w-full overflow-auto grid grid-cols-2 gap-x-8 max-h-[400px] pr-2">
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
            href="mailto:info@isaworkbridge.com"
            target="_blank"
            className="flex flex-row gap-2 items-center text-[14px]"
          >
            <FaEnvelope />
            info@isaworkbridge.com
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
        {/* <div className="w-full h-[1px] mb-4 bg-[#E8E8E8]" /> */}
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
      </div>
    </section>
  );
};
export default Companyinfo;
