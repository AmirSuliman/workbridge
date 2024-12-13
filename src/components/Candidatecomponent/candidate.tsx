import { IMAGES } from '@/constants/images';
import {
  FaEnvelope,
  FaGlobe,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaUsers,
} from 'react-icons/fa';
import UserImgPlaceholder from '../LeaveRequests/UserImgPlaceholder';
const Candidatecomponent = ({ data, jobTitle }) => {
  return (
    <>
      <div className="flex flex-row items-center gap-3 text-[18px] font-medium">
        <FaUsers /> Candidate
      </div>
      <div className="flex flex-col sm:flex-row items-start gap-8 mt-8">
        {data?.data?.profilePictureUrl ? (
          <img
            width={300}
            height={150}
            src={data.data?.profilePictureUrl || IMAGES.placeholderAvatar}
            alt="avatar"
            className="rounded-full size-20"
          />
        ) : (
          <UserImgPlaceholder
            name={`${data?.data?.firstName} ${data?.data?.lastName}`}
            className="size-20 !text-3xl"
          />
        )}
        <div className="flex flex-col ">
          <h1 className="text-[#0F172A] text-[24px] font-normal">
            {`${data?.data?.firstName} ${data?.data?.lastName}`}
          </h1>
          <p className="text-gray-400 text-[16px]">Applying for {jobTitle}</p>

          <div className="flex flex-col  sm:flex-row items-start sm:items-center gap-2 sm:gap-20 mt-6">
            <div className="flex flex-row gap-2 items-center text-[12px] text-gray-400">
              <FaMobileAlt />
              Phone Number
              <span className="text-black">{data?.data?.phone || 'N/A'}</span>
            </div>
            <div className="flex flex-row gap-2 items-center text-[12px] text-gray-400">
              <FaMapMarkerAlt />
              Address
              <span className="text-black">{data?.data?.address || 'N/A'}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8 mt-2">
            <div className="flex flex-row gap-2 items-center text-[12px] text-gray-400">
              <FaEnvelope />
              Email Address
              <span className="text-black">{data?.data?.email || 'N/A'}</span>
            </div>
            <div className="flex flex-row gap-2 items-center text-[12px] text-gray-400">
              <FaGlobe />
              Website
              <span className="text-black">{data?.data?.website || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center p-2">
        <a
          href={data?.data?.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-black text-white  items-center"
        >
          <FaLinkedin size={18} />{' '}
        </a>
        {/* <div className="p-2 rounded-full bg-black text-white items-center">
          <img src="/asdasd.png" alt="img" className="w-4" />
        </div> */}
      </div>
    </>
  );
};

export default Candidatecomponent;
