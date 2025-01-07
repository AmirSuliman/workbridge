import Image from "next/image";
import Link from "next/link";

const Evaluation =()=>{

    return(
        <div className="w-full p-6 bg-white rounded-[10px] border ">
            <p className="text-[18px] font-medium flex flex-row items-center gap-2"> 
                <Image src='/Vector (Stroke).png' alt="img" width={30} height={30}/>
                Evaluation</p>
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-col mt-8">
                   <p className="text-[14px] font-semibold">Yearly Evaluation Form</p>
                   <p className="text-[11px]">Date: October 23, 2024</p>
                </div>
                <Link href="/user/home/EvaluationForm">
                <button className="text-white text-[11px] bg-black p-2 rounded mt-3">
                  Start Survey
                </button>
              </Link>            
              </div>

            <div className="mt-5 w-full h-[1px] bg-gray-200"/>

            <p className="text-[12px] font-normal mt-6">Evaluation forms are sent by HR to individual employees and or departments and must be completed.</p>
        </div>
    )
}

export default Evaluation;