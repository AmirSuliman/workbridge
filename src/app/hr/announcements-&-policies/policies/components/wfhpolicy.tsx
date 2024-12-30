'use client'
import Image from "next/image";
const Workfromhome =()=>{
   

    return(
        <div className="w-full">
       

            <div className="p-6 border rounded-[10px]">
               <h1 className="text-[32px] font-medium">Work from Home Policy Update</h1>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 mt-4">
                    <div className="flex flex-row items-center gap-1">
                      <Image src="/Group 1000004576.png" alt="img" width={20} height={20}/>
                      <p className="text-[13px] ">Posted by:</p>
                      <p className="text-[13px] font-semibold">Juliette Nicols</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <p className="text-[13px] ">Department:</p>
                      <p className="text-[13px] font-semibold">Sales</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <p className="text-[13px] ">Effective Date:</p>
                      <p className="text-[13px] font-semibold"> October 23, 2024</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <p className="text-[13px] ">Expiration Date:</p>
                      <p className="text-[13px] font-semibold"> October 23, 2024</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <p className="text-[13px] ">Time:</p>
                      <p className="text-[13px] font-semibold"> 10:41 AM</p>
                    </div>
                </div>
            </div>
             
             <div className="mt-8 p-4">
                <h2 className="text-[22px] font-semibold mb-2">Title Here</h2>
                <p className="text-[16px] font-normal">We are thrilled to announce an important update to our Work from Home policy. With the evolving nature of the workplace, we have made some adjustments to better accommodate your needs and ensure a more flexible, productive environment for everyone.</p>
                 <Image src="/policyimg.png" alt="img" width={1200} height={20} className="mt-6"/>

                 <h1 className="text-[22px] font-semibold mt-10 mb-1">Key Updates</h1>
                 <h2 className="text-[18px] font-semibold mb-1">Extended Remote Work Days</h2>
                 <p className="text-[16px] ">Employees can now work from home up to three days a week, giving you more flexibility to manage your work-life balance.</p>
             
                 <h2 className="text-[18px] font-semibold mb-1 mt-6">Enhanced Support</h2>
                 <p className="text-[16px] ">We are providing additional resources to set up your home office, including subsidies for ergonomic furniture and high-speed internet.</p>

                 <h2 className="text-[18px] font-semibold mb-1 mt-6">Regular Check-Ins</h2>
                 <p className="text-[16px] ">To maintain team cohesion, regular virtual check-ins will be scheduled to ensure everyone stays connected and aligned with company goals.</p>

                 <h2 className="text-[18px] font-semibold mb-1 mt-6">Performance Metrics</h2>
                 <p className="text-[16px] ">Updated metrics will be used to evaluate performance, focusing on output and results rather than hours worked.</p>

                 <h2 className="text-[18px] font-semibold mb-1 mt-6">Health and Wellness</h2>
                 <p className="text-[16px] ">We are introducing wellness programs and online fitness classes to help you stay healthy and energized.</p>

                 <h2 className="text-[18px] font-semibold mb-1 mt-8">Looking Ahead</h2>
                 <p className="text-[16px] ">We believe these updates will not only improve your work-life balance but also enhance your productivity and job satisfaction. We are committed to supporting you in this transition and ensuring that our work environment remains dynamic and responsive to your needs.
                 Thank you for your continued dedication and hard work. Let’s make the most of these new opportunities together!</p>
             </div>

             
        </div>
    )
}

export default Workfromhome;