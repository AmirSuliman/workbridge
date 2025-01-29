


const Questions =()=>{

    return(
        <div className="p-6 bg-white border rounded-[10px] mt-8">
              <h1 className="font-medium text-[18px]">Questions</h1>
               <div className="flex flex-col items-start gap-6 w-full  mt-8">
               <div className="flex flex-col gap-1 w-full ">
                    <span className="text-gray-400 text-[14px]">Question </span>
                    <div className="p-3 w-full border rounded text-[12px]">How effectively has the employee met or exceeded their goals and objectives over the past period?</div>
                </div>
                <div className="flex flex-col gap-1 w-full ">
                    <span className="text-gray-400 text-[14px]">Answer</span>
                    <div className="p-3 w-full border rounded text-[12px]">Exceptional achievement, consistently exceeds goals</div>
                </div>
               </div>

               <div className="flex flex-col  items-start gap-6 w-full mt-8">
               <div className="flex flex-col gap-1 w-full ">
                    <span className="text-gray-400 text-[14px]">Question </span>
                    <div className="p-3 w-full border rounded text-[12px]">How would you rate the quality and accuracy of the employee’s work?</div>
                </div>
                <div className="flex flex-col gap-1 w-full ">
                    <span className="text-gray-400 text-[14px]">Answer</span>
                    <div className="p-3 w-full border rounded text-[12px]">High quality, few minor errors </div>
                </div>
               </div>

               <div className="flex flex-col items-start gap-6 w-full  mt-8">
               <div className="flex flex-col gap-1 w-full ">
                    <span className="text-gray-400 text-[14px]">Question </span>
                    <div className="p-3 w-full border rounded text-[12px]">How proficient is the employee at identifying and solving problems?</div>
                </div>
                <div className="flex flex-col gap-1 w-full ">
                    <span className="text-gray-400 text-[14px]">Answer</span>
                    <div className="p-3 w-full border rounded text-[12px]">Adequate problem-solving, solves most issues</div>
                </div>
               </div>
          </div>
    )
}

export default Questions;