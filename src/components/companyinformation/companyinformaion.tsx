import { FaGlobe } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';

const Companyinfo =()=>{

    return(
        <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4">
            <div className="flex flex-row gap-2 items-center mb-8">
               <img src="/Vector.png" alt="img" className="w-8 "/>
               <h1 className="text-[#0F172A] font-medium text-[18px]">Company Information</h1>
            </div>

            <div className="space-y-2">
                <p>Company</p>
                <div className="flex flex-row gap-2 items-center ">
                  <FaGlobe/>
                  isaconsulting.com
                </div>
                <div className="flex flex-row gap-2 items-center ">
                  <FaEnvelope/>
                  prosper@isaconsulting.com                
                  </div>
                  <div className="flex flex-row gap-2 items-center ">
                  <FaPhone style={{ transform: 'rotate(90deg)' }} />
                  prosper@isaconsulting.com                
                  </div>
            </div>
            <div className='w-full h-[1px] bg-[#E8E8E8]'/>
        </section>
    )
}
export default Companyinfo;