import Image from "next/image";

const Evaluationform =()=>{

    return(
        <div className="p-6 w-full">
            <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row items-center gap-2">
                        <Image src='/Vector (Stroke).png' alt="img" width={30} height={30}/>
                        <h1 className="text-[22px] font-semibold">Evaluation Form</h1>
                    </div>
                    <button className="border p-2 rounded bg-white px-4 text-[12px]">Cancel</button>
            </div>
          
          <div className="bg-white p-6 mt-5 rounded-[10px] border w-full">
             <div className="w-full flex flex-row items-center justify-between">
                <h1 className="text-[18px] font-medium">Yearly Evaluation Form</h1>
                <h2 className="text-[18px] font-medium">Question 1 out of 5</h2>
             </div>

             <label className="mt-12 flex flex-col ">
                <span className="text-[16px] text-gray-400 mb-1">Question</span>
                <div className="border p-3 rounded text-[18px]">
                How effectively has the employee met or exceeded their goals and objectives over the past period?
                </div>
             </label>

             <label className="mt-24 flex flex-col w-full">
                <span className="text-[16px] text-gray-400 mb-1">Answers</span>
                <div className="flex sm:flex-row flex-col gap-4 items-center justify-between text-center w-full">
                   <div className="border p-3 rounded hover:bg-black hover:text-white text-[13px] w-full">
                   Rarely meets goals
                   </div>
                   <div className="border p-3 rounded hover:bg-black hover:text-white text-[13px] w-full">
                   Often struggles to meet goals
                   </div>
                   <div className="border p-3 rounded hover:bg-black hover:text-white text-[13px] w-full">
                   Adequately meets most goals
                   </div>
                   <div className="border p-3 rounded hover:bg-black hover:text-white text-[13px] w-full">
                   Meets goals with occasional exceptions
                   </div>
                   <div className="border p-3 rounded hover:bg-black hover:text-white text-[13px] w-full">
                   Exceptional achievement, consistently exceeds goals
                   </div>
                </div>
              
             </label>

             <div className="flex flex-row items-center justify-end mt-32 gap-4">
                <button className="text-[14px] p-2 border rounded px-4 bg-white">Skip</button>
                <button className="text-[14px] p-2 border rounded px-4 bg-black text-white">Next Question</button>

             </div>
          </div>
        </div>
    )
}

export default Evaluationform;