import { FaArrowRight} from 'react-icons/fa';

const CandidateInfo = () =>{

    return(
       <>
         <div className='mt-8 space-y-8'>
              <div className='text-[18px] font-medium flex gap-3 flex-row items-center'> 
                <img src='/compensation.png' alt='img' className='w-5 h-5'/> Candidate Information
              </div>
               <div className='flex sm:flex-row flex-col items-center justify-between sm:gap-8 gap-2 '>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 text-[14px] mb-2 font-medium'>Full Name</span>
                      <div className='p-3 border rounded-lg w-full text-[14px] font-medium'>Jordan Birkenstock</div>
                   </div>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 font-medium text-[14px] mb-2'>Phone Number</span>
                      <div className='p-3 border rounded-lg w-full text-[14px] font-medium'>Jordan Birkenstock</div>
                   </div>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 text-[14px] mb-2 font-medium'>Full Name</span>
                      <div className='p-3 border rounded-lg w-full text-[14px] font-medium'>Jordan Birkenstock</div>
                   </div>
               </div>
            </div>

            <div className='w-full h-[1.5px] bg-gray-300 mt-8'/>
            
            <div className='mt-8 space-y-8'>
              <div className='text-[18px] font-medium flex gap-3 flex-row items-center'> 
                <img src='/compensation.png' alt='img' className='w-5 h-5'/> Documents
              </div>
               <div className='flex sm:flex-row flex-col items-center justify-between sm:gap-8 gap-2 '>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 text-[14px] mb-2 font-medium'>Resume</span>
                      <div className='p-4 bg-[#0F172A] text-white rounded-lg w-full text-[14px] font-medium flex flex-row items-center justify-between'>
                         Open Resume
                         <FaArrowRight className=" text-xl transform -rotate-45" />
                         </div>
                   </div>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 text-[14px] mb-2 font-medium'>Cover Letter</span>
                      <div className='p-4 bg-[#0F172A] text-white rounded-lg w-full text-[14px] font-medium flex flex-row items-center justify-between'>
                      Open Cover Letter
                         <FaArrowRight className=" text-xl transform -rotate-45" />
                         </div>
                   </div>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 text-[14px] mb-2 font-medium'>Open Portfolio</span>
                      <div className='p-4 bg-[#0F172A] text-white rounded-lg w-full text-[14px] font-medium flex flex-row items-center justify-between'>
                      Open Portfolio
                         <FaArrowRight className=" text-xl transform -rotate-45" />
                         </div>
                   </div>
               </div>

               <div className='w-full h-[1.5px] bg-gray-300 mt-8'/>

               <div className='mt-8 space-y-8'>
              <div className='text-[18px] font-medium flex gap-3 flex-row items-center'> 
                <img src='/compensation.png' alt='img' className='w-5 h-5'/>Education
              </div>
               <div className='flex sm:flex-row flex-col items-center w-full sm:w-[70%] justify-between sm:gap-8 gap-2 '>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 text-[14px] mb-2 font-medium'>University</span>
                      <div className='p-3 border rounded-lg w-full text-[14px] font-medium'>Massachusetts Institute of Technology</div>
                   </div>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 font-medium text-[14px] mb-2'>Country</span>
                      <div className='p-3 border rounded-lg w-full text-[14px] font-medium'>Massachusetts</div>
                   </div>
               </div>
            </div>

            <div className='w-full h-[1.5px] bg-gray-300 mt-8'/>

            <div className='mt-8 space-y-8'>
              <div className='text-[18px] font-medium flex gap-3 flex-row items-center'> 
                <img src='/compensation.png' alt='img' className='w-5 h-5'/>Address
              </div>
               <div className='flex sm:flex-row flex-col items-center  justify-between sm:gap-8 gap-2 '>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 text-[14px] mb-2 font-medium'>Street</span>
                      <div className='p-3 border rounded-lg w-full text-[14px] font-medium'>4799 Lamberts Branch Road</div>
                   </div>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 font-medium text-[14px] mb-2'>Street 2</span>
                      <div className='p-3 border rounded-lg w-full text-[14px] font-medium'>Massachusetts</div>
                   </div>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 font-medium text-[14px] mb-2'>Zip</span>
                      <div className='p-3 border rounded-lg w-full text-[14px] font-medium'>84116</div>
                   </div>
               </div>
               <div className='flex sm:flex-row flex-col items-center  justify-between sm:gap-8 gap-2 '>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 text-[14px] mb-2 font-medium'>City</span>
                      <div className='p-3 border rounded-lg w-full text-[14px] font-medium'>Salt Lake City</div>
                   </div>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 font-medium text-[14px] mb-2'>Country</span>
                      <div className='p-3 border rounded-lg w-full text-[14px] font-medium'>Utah</div>
                   </div>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 font-medium text-[14px] mb-2'>State</span>
                      <div className='p-3 border rounded-lg w-full text-[14px] font-medium'>Utah</div>
                   </div>
               </div>
            </div>
            <div className='w-full h-[1.5px] bg-gray-300 mt-8'/>
  
            <div className='mt-8 space-y-8'>
              <div className='text-[18px] font-medium flex gap-3 flex-row items-center'> 
                <img src='/compensation.png' alt='img' className='w-5 h-5'/>Social Links
              </div>
               <div className='flex sm:flex-row flex-col items-center w-full sm:w-[70%] justify-between sm:gap-8 gap-2 '>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 text-[14px] mb-2 font-medium'>LinkedIn</span>
                      <div className='p-3 border rounded-lg w-full text-[14px] font-medium'>/in/JuliettNicolas</div>
                   </div>
                   <div className='flex flex-col w-full'>
                      <span className='text-gray-400 font-medium text-[14px] mb-2'>Personal Website</span>
                      <div className='p-3 border rounded-lg w-full text-[14px] font-medium'>juliettnicolas.com</div>
                   </div>
               </div>
            </div>

            </div>

       </>

    )
}

export default CandidateInfo;