import { FiPlusCircle } from "react-icons/fi";


const CreateEvaluation =()=>{
   
    return(
        <>
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="text-[22px] font-medium">Create Evaluation Survey</h1>
            <div className="flex flex-row items-center gap-3">
               <button className="p-2 px-2 bg-black rounded text-white text-[14px]">Save Draft</button>
               <button>Cancel</button>
            </div>
          </div>

          <div className=" bg-white rounded-[10px] border mt-8">
             <h1 className="text-[18px] font-medium p-6">Department</h1>
             <div className="flex flex-row items-center gap-4 mt-6 p-6 mb-4">
               <label className=" flex flex-col gap-1">
                <span className="text-gray-400">Department*</span>
                <select className="border p-3 px-4 w-[370px] rounded text-gray-400">
                    <option>Select a department</option>
                    <option>IT</option>
                    <option>CS</option>
                    <option>DCSE</option>
                </select>
               </label>

               <label className=" flex flex-col gap-1">
                <span className="text-gray-400">Department Head*</span>
                <select className="border p-3 px-4 w-[370px] rounded text-gray-400">
                    <option>Select department head</option>
                    <option>IT</option>
                    <option>CS</option>
                    <option>DCSE</option>
                </select>
               </label>
             </div>
             <div className="h-[1.5px] w-full bg-gray-300 "/>
            

             <h1 className="text-[18px] font-medium p-6 mt-6">Questions</h1>
             <div className="flex flex-row items-center gap-8  p-6">
               <label className=" flex flex-col gap-1">
                <span className="text-gray-400">Question</span>
                <input type="text " placeholder="Add your question" className=" border p-3 rounded w-[450px]"/>
                </label>
                <label><input type="checkbox" className="p-8 mt-6"/>   Allow response</label>
            </div>
            <div className="p-8 mb-24">
            <button className="bg-black text-white p-3 px-10 rounded flex flex-row items-center gap-3"><FiPlusCircle/> Add Question</button>
            </div>
          </div>


        </>
    )
}
export default CreateEvaluation;