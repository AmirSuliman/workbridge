import Image from "next/image";

const Employeelist =()=>{

    return(
        <div className=" bg-white border rounded-[10px] mt-8">
        <h1 className="font-medium text-[18px] p-6">Questions</h1>
         <div className="flex flex-col items-start gap-6 w-full  mt-8 mb-4">
           <div className="flex flex-row items-center justify-between w-full px-6">
                <div className="flex flex-row items-center gap-2 w-full">
                   <Image src="/User.png" alt="img" width={50} height={30}/>
                   <div className="flex flex-col ">
                     <h1 className="text-[16px] font-medium">Darlene Robertson</h1>
                     <p className="text-[14px]">Marking Expert</p>
                   </div>
                </div>
                <button className="text-[#00B87D] bg-[#D5F6DD] p-2 px-6 text-[16px] font-medium rounded ">Completed</button>
           </div>
          <div className="w-full h-[1px] bg-gray-200"/>
           <div className="flex flex-row items-center justify-between w-full px-6 ">
                <div className="flex flex-row items-center gap-2 w-full">
                   <Image src="/User.png" alt="img" width={50} height={30}/>
                   <div className="flex flex-col ">
                     <h1 className="text-[16px] font-medium">Darlene Robertson</h1>
                     <p className="text-[14px]">Marking Expert</p>
                   </div>
                </div>
                <button className="text-[#00B87D] bg-[#D5F6DD] p-2 px-6 text-[16px] font-medium rounded ">Completed</button>
           </div>
           <div className="w-full h-[1px] bg-gray-200"/>

           <div className="flex flex-row items-center justify-between w-full px-6 ">
                <div className="flex flex-row items-center gap-2 w-full">
                   <Image src="/User.png" alt="img" width={50} height={30}/>
                   <div className="flex flex-col ">
                     <h1 className="text-[16px] font-medium">Darlene Robertson</h1>
                     <p className="text-[14px]">Marking Expert</p>
                   </div>
                </div>
                <button className="text-[#00B87D] bg-[#D5F6DD] p-2 px-6 text-[16px] font-medium rounded ">Completed</button>
           </div>

      </div>
      </div>
    )
}

export default Employeelist;