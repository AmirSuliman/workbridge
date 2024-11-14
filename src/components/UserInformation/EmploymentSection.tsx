import React from 'react'
import FormHeading from './FormHeading'
import { HiMiniBriefcase } from 'react-icons/hi2'
import FormField from './FormField'
import InfoGrid from './InfoGrid'

const EmploymentSection = () => {
    return (
        <div className='p-4 rounded-md  h-full'>

            <div className='p-6 rounded-[10px] border-gray-border border-[1px] bg-white mb-4' >
                <div className='mb-5'>
                    <FormHeading icon={<HiMiniBriefcase className='w-4' />} text='Job' />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <FormField label='Hire Date' value='24.01.2023' />
                    <FormField label='Duration' value='1 Years 4 Months' />
                </div>
            </div>

            <div className='p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5' >
                <div className='mb-5'>
                    <FormHeading icon={<HiMiniBriefcase className='w-4' />} text='Employment Status' />
                </div>
                <InfoGrid headers={["Effective Date", "Work Type", "Note"]}  values={[["24.01.2023", "Fulltime", ""]]} />

            </div>

            <div className='p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5' >
                <div className='mb-5'>
                    <FormHeading icon={<HiMiniBriefcase className='w-4' />} text='Job Information' />
                </div>
                <InfoGrid  cols={6} headers={["Effective Date", "Location", "Division", "Department", "Job Title", "Reporting Message"]}
                    values={[["24.01.2023", "London, Utah", "USA", "Operations", "Human Resources", "John McAfee"]]} />

            </div>
            <div className='p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5' >
                <div className='mb-5'>
                    <FormHeading icon={<HiMiniBriefcase className='w-4' />} text='Payment' />
                </div>
                <InfoGrid   cols={6} headers={["Effective Date", "Payrate", "Schedule", "Pay Type", "Overtime", "Note"]}
                    values={[["24.01.2023", "$200,000", "Once a Month", "Salary", "Exempt", ""], ["24.01.2023", "$200,000", "Once a Month", "Salary", "Exempt", ""]]} />

            </div>

        </div>
    )
}

export default EmploymentSection