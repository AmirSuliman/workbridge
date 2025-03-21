'use client';

import Evaluationsurvey from '../../components/departmentevaluationsurvey';
import Questions from '../components/questions';
const DepartmentEvaluationPage = () => {
  return (
    <>
      <Evaluationsurvey />
      <div className="flex flex-row items-start gap-4 w-full ">
        <div className="w-full">
            <Questions/>
        </div>
       
      </div>
    </>
  );
};

export default DepartmentEvaluationPage;
