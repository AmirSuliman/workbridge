import { FaCloudUploadAlt } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-[900px] max-h-[90vh] rounded-lg shadow-lg p-6 relative overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✖️
        </button>

        {/* Modal Header */}
        <div className="text-[#0F172A] text-[22px] font-semibold">
          Job Opening Preview
        </div>

        {/* Job Title Section */}
        <div className="flex flex-col mt-8">
          <p className="text-gray-400 text-[12px]">Job Title</p>
          <h1 className="text-[#0F172A] text-[22px] font-medium">Software Engineer</h1>
        </div>

        {/* Department, Employment Type, Experience */}
        <div className="flex flex-row w-full sm:w-[70%] items-center justify-between">
          <div className="flex flex-col mt-8">
            <p className="text-gray-400 text-[12px]">Department</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">IT Department</h1>
          </div>
          <div className="flex flex-col mt-8">
            <p className="text-gray-400 text-[12px]">Employment Type</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">Full time</h1>
          </div>
          <div className="flex flex-col mt-8">
            <p className="text-gray-400 text-[12px]">Min. Exp.</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">+2 years</h1>
          </div>
        </div>

        {/* Job Description */}
        <div className="flex flex-col mt-8">
          <p className="text-gray-400 text-[12px]">Description</p>
          <h1 className="text-[#0F172A] text-[16px] font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
          </h1>
        </div>

        {/* Compensation */}
        <div className="flex flex-col mt-8">
          <p className="text-gray-400 text-[12px]">Compensation</p>
          <h1 className="text-[#0F172A] text-[16px] font-medium">$150,000 - $200,000</h1>
        </div>

        {/* Divider */}
        <div className="w-full h-[1.5px] bg-gray-300 mt-8" />

        {/* Upload Buttons Section */}
        <div className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-5">
            {['Resume', 'Portfolio', 'Cover Letter'].map((label) => (
              <div key={label} className="flex flex-col gap-1">
                <p className="text-gray-400 text-[14px]">{label}*</p>
                <button className="bg-[#0F172A] flex flex-row p-3 w-[270px] items-center justify-between rounded-lg text-white">
                  Upload {label} <FaCloudUploadAlt />
                </button>
              </div>
            ))}
          </div>

          {/* Additional Details Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-5 mt-3">
            {['Address', 'Education', 'LinkedIn'].map((label) => (
              <div key={label} className="flex flex-col gap-1">
                <p className="text-gray-400 text-[14px]">{label}*</p>
                <button className="border flex flex-row p-3 items-center w-[270px] rounded-lg text-gray-400">
                  Add {label}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1.5px] bg-gray-300 mt-8 mb-8" />

        {/* Example Question Section */}
        <div className="flex flex-col gap-2">
          <p className='text-[#0F172A] font-medium text-[14px]'>This text is for an example question?</p>
          <input type='text' placeholder='Type your answer here' className='p-4 rounded-lg border w-[60%]'/>
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <p className='text-[#0F172A] font-medium text-[14px]'>This text is for an example question?</p>
          <input type='text' placeholder='Type your answer here' className='p-4 rounded-lg border w-[60%]'/>
        </div>

        <div className="w-full h-[1.5px] bg-gray-300 mt-8 mb-8" />

        <div className='flex flex-row items-center justify-between'>
           <div className='flex flex-col '>
               <p className='text-gray-400 text-[12px]'>Address</p>
               <h1 className='text-[#0F172A] text-[16px] font-medium'>2088 Hott Street</h1>
           </div>
           <div className='flex flex-col '>
               <p className='text-gray-400 text-[12px]'>Country</p>
               <h1 className='text-[#0F172A] text-[16px] font-medium'>Oklahoma</h1>
           </div>
           <div className='flex flex-col '>
               <p className='text-gray-400 text-[12px]'>City</p>
               <h1 className='text-[#0F172A] text-[16px] font-medium'>Oklahoma City</h1>
           </div>
           <div className='flex flex-col '>
               <p className='text-gray-400 text-[12px]'>Postal Code</p>
               <h1 className='text-[#0F172A] text-[16px] font-medium'>73102</h1>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
