'use client'
import { FaBox } from "react-icons/fa";
import CustomTextEditor from "@/components/CustomEditor/CustomTextEditor";
import { useState } from "react";
import Image from "next/image";

const Addnewpolicies =()=>{
  const [body, setBody] = useState('');

    return(
        <div className="w-full">
         <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-[22px] font-semibold">Create new policy</h1>
          <div className="flex flex-row items-center gap-2">
            <button className="text-[14px] p-2 bg-black text-white rounded">Save Draft</button>
            <button 
             onClick={() => window.location.href = '/hr/Policies/Previewpolicy'}
            className="text-[14px] p-2 border rounded">Preview Policy</button>
            <button className="text-[14px] p-2 ">Cancel</button>
          </div>
          </div>

           <div className="bg-white rounded-[10px] border p-6 w-full mt-8">
            <h1 className="flex flex-row items-center gap-2 text-[18px] font-medium">
              <Image src="/iconpolicy.png" alt="img" width={20} height={20}/>  
            New Policy
            </h1>
            
            <form className="w-full mt-8">
               <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-8">
                    <label className="flex flex-col gap-1 w-full">
                       <span className="text-[14px] text-gray-400 font-medium">
                          Policy Title
                       </span>
                       <input type="text" placeholder="Add a title for policy" className="p-3 w-full border rounded-lg focus:outline-none"/>
                    </label>
                    <label className="flex flex-col gap-1 w-full">
                      <span className="text-[14px] text-gray-400 font-medium">
                        Policy Type
                      </span>
                      <select
                        className="p-3 w-full border rounded-lg focus:outline-none focus:border-gray-300 bg-white text-gray-400"
                      >
                        <option>
                          Select a Policy Type
                        </option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1 w-full">
                      <span className="text-[14px] text-gray-400 font-medium">
                      Departments
                      </span>
                      <select
                        className="p-3 w-full border rounded-lg focus:outline-none focus:border-gray-300 bg-white text-gray-400"
                      >
                        <option >
                        Sales Departments
                        </option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                      </select>
                    </label>
                                       
               </div>

               <div className="flex flex-col sm:flex-row items-center justify-between gap-2  sm:gap-8 mt-8">
               <label className="flex flex-col gap-1 w-full">
                       <span className="text-[14px] text-gray-400 font-medium">
                       Effective Date
                       </span>
                       <input type="date" placeholder="Add a title for policy" className="p-3 w-full border text-gray-400 rounded-lg focus:outline-none"/>
                    </label>
                    <label className="flex flex-col gap-1 w-full">
                       <span className="text-[14px] text-gray-400 font-medium">
                       Expiration Date
                       </span>
                       <input type="date" placeholder="Add a title for policy" className="p-3 w-full border text-gray-400 rounded-lg focus:outline-none"/>
                    </label>
                    <label className="flex flex-col gap-1 w-full">
                       <span className="text-[14px] text-gray-400 font-medium">
                       Sending Date
                       </span>
                       <input type="date" placeholder="Add a title for policy" className="p-3 w-full border text-gray-400 rounded-lg focus:outline-none"/>
                    </label>
               </div>
               <div className="w-full h-[1.5px] bg-gray-300 mt-12 mb-8"/>

               <div>
                <h1 className="text-[18px] font-medium">Job Description</h1>
                <label className="flex flex-col gap-2 mt-8">
                  <span className=" text-[13px] text-gray-400">Description</span>
                  <div className="border rounded ">
                <CustomTextEditor setContent={setBody} body={body} />
                </div>
                </label>
               
               </div>
            </form>
           </div>
        </div>
    )
}

export default Addnewpolicies;