import {FaBullhorn} from 'react-icons/fa'
import { ArrowUpIcon } from '@heroicons/react/24/outline';

const Allannouncments = () =>{

    return(
       <div className="p-6 flex flex-col gap-6 w-full">
           <div className="p-6 bg-white rounded-[10px] w-full border">
                 <div className='flex flex-row items-center gap-3 '>
                    <FaBullhorn size={26}/>
                    <h1 className='text-[22px] font-medium'>New Policies Update</h1>
                 </div>
                 <p className='text-[14px] text-gray-400 mt-6 '>This Week</p>

                 <div className='flex flex-col gap-6 p-4 rounded border mt-8 '>
                     <div className='flex flex-row items-center justify-between'>
                         <h1 className='text-[14px] font-semibold'>WORK FROM HOME POLICY UPDATE</h1>
                         <p className='text-[12px] text-gray-400'>4 days ago</p>
                     </div>
                  
                  <div className='flex flex-row items-center justify-between'>
                     <div className="flex flex-row items-center gap-5">
                        <p className="text-[12px]">Posted by: <span className="font-semibold">Juliette Nicols</span></p>
                        <p className="text-[12px]">Effective Date:  <span className="font-semibold">October 23, 2024</span></p>
                    </div>
                    <button className='border p-2 px-3 text-[12px] rounded flex flex-row items-center gap-2 '>View <ArrowUpIcon  style={{ transform: 'rotate(45deg)' }} /></button>
                    </div>
                 </div>

                 <div className='flex flex-col gap-6 p-4 rounded border mt-8 '>
                     <div className='flex flex-row items-center justify-between'>
                         <h1 className='text-[14px] font-semibold'>WORK FROM HOME POLICY UPDATE</h1>
                         <p className='text-[12px] text-gray-400'>4 days ago</p>
                     </div>
                  
                  <div className='flex flex-row items-center justify-between'>
                     <div className="flex flex-row items-center gap-5">
                        <p className="text-[12px]">Posted by: <span className="font-semibold">Juliette Nicols</span></p>
                        <p className="text-[12px]">Effective Date:  <span className="font-semibold">October 23, 2024</span></p>
                    </div>
                    <button className='border p-2 px-3 text-[12px] rounded flex flex-row items-center gap-2 '>View <ArrowUpIcon  style={{ transform: 'rotate(45deg)' }} /></button>
                    </div>
                 </div>
           </div>


           <div className="p-6 bg-white rounded-[10px] w-full border">
                 <div className='flex flex-row items-center gap-3 '>
                    <FaBullhorn size={26}/>
                    <h1 className='text-[22px] font-medium'>Announcements</h1>
                 </div>
                 <p className='text-[14px] text-gray-400 mt-6 '>This Week</p>

                    <table className='w-full p-4 mt-6 '>
                      <tr className='w-full border-b text-[14px] p-3'>
                        <td className='p-4'>
                        Upcoming holiday on 31.12.2024 - Happy New years!
                        </td>
                        <td className='text-gray-400 p-4'>2 days ago</td>
                      </tr>

                      <tr className='w-full border-b text-[14px] p-3'>
                        <td className='p-4'>
                        Upcoming holiday on 31.12.2024 - Happy New years!
                        </td>
                        <td className='text-gray-400 p-4'>2 days ago</td>
                      </tr>

                      <tr className='w-full border-b text-[14px] p-3'>
                        <td className='p-4'>
                        Upcoming holiday on 31.12.2024 - Happy New years!
                        </td>
                        <td className='text-gray-400 p-4'>2 days ago</td>
                      </tr>

                      <tr className='w-full border-b text-[14px] p-3'>
                        <td className='p-4'>
                        Upcoming holiday on 31.12.2024 - Happy New years!
                        </td>
                        <td className='text-gray-400 p-4'>2 days ago</td>
                      </tr>
                    </table>
                                   

                 
           </div>

           <div className="p-6 bg-white rounded-[10px] w-full border">
                    <h1 className='text-[18px]  text-gray-400'>More Announcements</h1>

                    <table className='w-full p-4 mt-6 '>
                      <tr className='w-full border-b text-[14px] p-3'>
                        <td className='p-4'>
                        Upcoming holiday on 31.12.2024 - Happy New years!
                        </td>
                        <td className='text-gray-400 p-4'>2 days ago</td>
                      </tr>

                      <tr className='w-full border-b text-[14px] p-3'>
                        <td className='p-4'>
                        Upcoming holiday on 31.12.2024 - Happy New years!
                        </td>
                        <td className='text-gray-400 p-4'>2 days ago</td>
                      </tr>

                    </table>
                     
           </div>
       </div>
    )
}

export default Allannouncments;