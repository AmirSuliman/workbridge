import Evaluationsurvey from "../Evaluationresult/components/evaluationsurvey";
import Employeelist from "./components/employeelist";
import Questions from "./components/questions";



const Page =()=>{

    return(
        <>
         <Evaluationsurvey/>
        
         <div className="flex flex-row items-start gap-4 w-full ">
            <div className="w-[40%]">
               <Employeelist/>
            </div>
            <div className="flex-1">
              <Questions/>
            </div>
         </div>
        </>
    )
}

export default Page;