


const Evaluationsurvey=()=>{

    return(
<div className="bg-white p-6 border rounded-[10px]">
            <div className="flex flex-row items-center justify-between w-full ">
                 <h1 className="font-medium text-[18px]">Evaluation Survey</h1>
                 <button className="text-[#00B87D] bg-[#D5F6DD] p-2 px-6 text-[16px] font-medium rounded ">Completed</button>
            </div>

            <div className="flex flex-row w-full sm:w-[70%] mt-10 gap-4">
                <label className="flex flex-col gap-1 w-full ">
                    <span className="text-gray-400 text-[14px]">Sent by</span>
                    <div className="p-3 w-full border rounded text-[14px]">Juliette Nicolas</div>
                </label>
                <label className="flex flex-col gap-1 w-full ">
                    <span className="text-gray-400 text-[14px]">Date</span>
                    <div className="p-3 w-full border rounded text-[14px]">12/11/2024</div>
                </label>
            </div>
            <div className="flex flex-row w-full sm:w-[70%] mt-6 gap-4 mb-10">
                <label className="flex flex-col gap-1 w-full ">
                    <span className="text-gray-400 text-[14px]">Department </span>
                    <div className="p-3 w-full border rounded text-[14px]">Marketing</div>
                </label>
                <label className="flex flex-col gap-1 w-full ">
                    <span className="text-gray-400 text-[14px]">Department Head</span>
                    <div className="p-3 w-full border rounded text-[14px]">Darlene Robertson</div>
                </label>
            </div>
          </div>
    )
}

export default Evaluationsurvey;