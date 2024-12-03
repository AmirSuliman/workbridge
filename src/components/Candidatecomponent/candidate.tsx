import {
  FaEnvelope,
  FaGlobe,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaUsers,
} from 'react-icons/fa';
const Candidatecomponent = () => {
  return (
    <>
      <div className="flex flex-row items-center gap-3 text-[18px] font-medium">
        <FaUsers /> Candidate
      </div>
      <div className="flex flex-col sm:flex-row items-start gap-8 mt-8">
        <div className="p-10 rounded-full text-[45px] bg-[#F5F6FA] w-28 h-28 flex items-center justify-center text-gray-500 border">
          JB
        </div>
        <div className="flex flex-col ">
          <h1 className="text-[#0F172A] text-[24px] font-normal">
            Jordan Birkenstock
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
