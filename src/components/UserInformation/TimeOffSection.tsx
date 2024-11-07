import React from 'react'
import UmbrellaIcon from '../icons/umbrella-icon'
import VacationsCard from './VacationsCard'
import InfoGrid from './InfoGrid'
import FormHeading from './FormHeading'
import { LuAlarmClockOff } from 'react-icons/lu'
import ClockRotateIcon from '../icons/clock-rotate-icon'
import SickPersonIcon from '../icons/sick-person-icon'
import LabelWithIcon from '../common/LabelWithIcon'
import { FaEdit } from 'react-icons/fa'

const TimeOffSection = () => {
    const values = [
        [
            <LabelWithIcon
                icon={<UmbrellaIcon classNames="w-4 text-white" />}
                title="Vacation"
                iconStyles="bg-[#00B87D]"
            />,
            "28 August",
            "31 August",
            <span className="text-[#25A244] font-[500]">Approved</span>,
            "",
            "",
            "",
            <FaEdit className='text-dark-navy w-5' />
        ],
        [
            <LabelWithIcon
                icon={<SickPersonIcon classNames="w-4 text-white" />}
                title="Sick Leave"
                iconStyles="bg-[#F53649]"
            />,
            "4 September",
            "5 September",
            <span>Waiting for Approval</span>,
            "",
            "",
            "",
            <FaEdit className='text-dark-navy w-5' />
        ],
        [
            <LabelWithIcon
                icon={<UmbrellaIcon classNames="w-4 text-white" />}
                title="Vacation"
                iconStyles="bg-[#00B87D]"
            />,
            "28 August",
            "31 August",
            <span>Waiting For Approval</span>,
            "",
            "",
            "",
            <FaEdit className='text-dark-navy w-5' />
        ]
    ];

    return (
        <div className='p-4 rounded-md  h-full'>
            <div className="flex gap-6">
                <VacationsCard buttonText='Request Vaction' title='Request Vacation' daysCount={32} icon={<UmbrellaIcon classNames='w-4 h-4 font-bold text-white' />} iconStyles='bg-[#00B87D]' subtitle='Requests need to be made at least 48 hours prior.' />
                <VacationsCard buttonText='Request Sick Leave' title='Sick Leave Days' daysCount={21} icon={<SickPersonIcon classNames='w-4 h-4 font-bold text-white' />} iconStyles='bg-[#F53649]' subtitle='' />
            </div>
            <div className='bg-white rounded-sm mt-5 border-gray-border p-5'>
                <FormHeading classNames='mb-[2rem]' icon={<UmbrellaIcon classNames='w-4 text-dark-navy' />} text='Upcoming Time Off' />
                <InfoGrid
                    headers={["Time Off Type", "Time Off Start", "Time Off End", "Status"]}
                    values={values}

                />

            </div>
            <div className='bg-white rounded-sm mt-5 border-gray-border p-5'>
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