import React from 'react'
import UmbrellaIcon from '../icons/umbrella-icon'
import VacationsCard from './VacationsCard'
import InfoGrid from './InfoGrid'
import FormHeading from './FormHeading'
import ClockRotateIcon from '../icons/clock-rotate-icon'
import SickPersonIcon from '../icons/sick-person-icon'
import LabelWithIcon from '../common/LabelWithIcon'
import { FaEdit } from 'react-icons/fa'
import SickCard from './sickCard'

const TimeOffSection = () => {
    const values = [
        [
            <LabelWithIcon
                key={4}
                icon={<UmbrellaIcon classNames="w-4 text-white" />}
                title="Vacation"
                iconStyles="bg-[#00B87D]"
            />,
            "28 August",
            "31 August",
            <span key={7} className="text-[#25A244] font-[500]">Approved</span>,
            "",
            "",
            "",
            <FaEdit key={0} className='text-dark-navy w-5' />
        ],
        [
            <LabelWithIcon
                icon={<SickPersonIcon classNames="w-4 text-white" />}
                title="Sick Leave"
                iconStyles="bg-[#F53649]"
                key={5}
            />,
            "4 September",
            "5 September",
            <span key={8} >Waiting for Approval</span>,
            "",
            "",
            "",
            <FaEdit key={1} className='text-dark-navy w-5' />
        ],
        [
            <LabelWithIcon
                key={6}
                icon={<UmbrellaIcon classNames="w-4 text-white" />}
                title="Vacation"
                iconStyles="bg-[#00B87D]"
            />,
            "28 August",
            "31 August",
            <span key={9} >Waiting For Approval</span>,
            "",
            "",
            "",
            <FaEdit key={2} className='text-dark-navy w-5' />
        ]
    ];

    return (
        <div className='p-1 rounded-md  h-full'>
            <div className="flex flex-col md:flex-row gap-6">
                <VacationsCard />
                <SickCard/>
            </div>
            <div className='bg-white  mt-5 border border-gray-border rounded-[10px] p-3 md:p-5 w-full '>
                <FormHeading classNames='mb-[2rem]' icon={<UmbrellaIcon classNames='w-4 text-dark-navy' />} text='Upcoming Time Off' />
                <InfoGrid
                    headers={["Time Off Type", "Time Off Start", "Time Off End", "Status"]}
                    values={values}

                />

            </div>
            <div className='bg-white  mt-5 border border-gray-border rounded-[10px] p-3 md:p-5 w-full '>
                <FormHeading classNames='mb-5' icon={<ClockRotateIcon classNames='w-4' />} text='Time Off History' />
                <InfoGrid
                    headers={["Type", "Date From", "Date to", "Approved By"]}
                    values={[["Vacation", "24.03.2024", "01.04.2024", "Eliott Page"]]}

                />
            </div>
        </div>
    )
}

export default TimeOffSection