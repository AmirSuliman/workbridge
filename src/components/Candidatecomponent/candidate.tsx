import {
  FaEnvelope,
  FaGlobe,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaUsers,
} from 'react-icons/fa';
import UserImgPlaceholder from '../LeaveRequests/UserImgPlaceholder';
import Image from 'next/image';
const Candidatecomponent = ({ data }) => {
  return (
    <>
      <div className="flex flex-row items-center gap-3 text-[18px] font-medium">
        <FaUsers /> Candidate
      </div>
      <div className="flex flex-col sm:flex-row items-start gap-8 mt-8">
        {data.data.profilePictureUrl ? (
          <Image
            width={300}
            height={150}
            src={data.data.profilePictureUrl}
            alt="avatar"
            className="rounded-full size-20"
          />
        ) : (
          <UserImgPlaceholder
            name={`${data.data.firstName} ${data.data.lastName}`}
            className="size-20 !text-3xl"
          />
        )}
        <div className="flex flex-col ">
          <h1 className="text-[#0F172A] text-[24px] font-normal">
            {`${data.data.firstName} ${data.data.lastName}`}
          </h1>
          <p className="text-gray-400 text-[16px]">
            Applying for Software Engineer
          </p>

          <div className="flex flex-col  sm:flex-row items-start sm:items-center gap-2 sm:gap-20 mt-6">
            <div className="flex flex-row gap-2 items-center text-[12px] text-gray-400">
              <FaMobileAlt />
              Phone Number
              <span className="text-black">+123 456 78 90</span>
            </div>
            <div className="flex flex-row gap-2 items-center text-[12px] text-gray-400">
              <FaMapMarkerAlt />
              Address
              <span className="text-black">N. Macedonia, Skopje, 1200</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8 mt-2">
            <div className="flex flex-row gap-2 items-center text-[12px] text-gray-400">
              <FaEnvelope />
              Email Address
              <span className="text-black">j.Birkenstock@domain.com</span>
            </div>
            <div className="flex flex-row gap-2 items-center text-[12px] text-gray-400">
              <FaGlobe />
              Website
              <span className="text-black">personalweb.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center p-2">
        <div className="p-2 rounded-full bg-black text-white  items-center">
          <FaLinkedin size={18} />{' '}
        </div>
        <div className="p-2 rounded-full bg-black text-white items-center">
          <img src="/asdasd.png" alt="img" className="w-4" />
        </div>
      </div>
    </>
  );
};

export default Candidatecomponent;
