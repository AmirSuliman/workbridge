import React from 'react'
import FormHeading from '../UserInformation/FormHeading'
import EmployeesIcon from '../icons/employees-icon'
import InfoGrid from '../UserInformation/InfoGrid'
import SearchInput from '../common/SearchBar'
import ProfileAvatarItem from '../common/ProfileAvatarItem'
import { IMAGES } from '@/src/constants/images'
import { BiArrowFromRight } from 'react-icons/bi'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'



const EmployeesTab = () => {

    const values = [
        [<ProfileAvatarItem src={IMAGES.dummyImage.src} title='Darlene Peterson' subtitle='#12343' />, <p className='text-sm text-dark-navy font-[500]'>HR MANAGER</p>,
        <p className='text-sm text-dark-navy font-[500] whitespace-nowrap'>Human Resources</p>,
        <p className='text-xs text-dark-navy font-[500] whitespace-nowrap'>darlene.robertson@gmail.com</p>,
        <div className='flex flex-col '>
            <div className='text-sm text-dark-navy font-[500]'>24.01.2024</div>
            <div className='text-[10px] text-dark-navy font-[500]'>1 Year 4 Months </div>
        </div>, <MdOutlineKeyboardArrowRight
            className='w-6 h-6 border border-gray-border rounded-sm' />],
        [<ProfileAvatarItem src={IMAGES.dummyImage.src} title='Darlene Peterson' subtitle='#12343' />, <p className='text-sm text-dark-navy font-[500]'>HR MANAGER</p>,
        <p className='text-sm text-dark-navy font-[500]'>Human Resources</p>,
        <p className='text-sm text-dark-navy font-[500]'>darlene.robertson@gmail.com</p>,
        <div className='flex flex-col '>
            <div className='text-sm text-dark-navy font-[500]'>24.01.2024</div>
            <div className='text-[10px] text-dark-navy font-[500]'>1 Year 4 Months </div>
        </div>, <MdOutlineKeyboardArrowRight
            className='w-6 h-6 border border-gray-border rounded-sm' />],
        [<ProfileAvatarItem src={IMAGES.dummyImage.src} title='Darlene Peterson' subtitle='#12343' />, <p className='text-sm text-dark-navy font-[500]'>HR MANAGER</p>,
        <p className='text-sm text-dark-navy font-[500]'>Human Resources</p>,
        <p className='text-sm text-dark-navy font-[500]'>darlene.robertson@gmail.com</p>,
        <div className='flex flex-col '>
            <div className='text-sm text-dark-navy font-[500]'>24.01.2024</div>
            <div className='text-[10px] text-dark-navy font-[500]'>1 Year 4 Months </div>
        </div>, <MdOutlineKeyboardArrowRight
            className='w-6 h-6 border border-gray-border rounded-sm' />],
        [<ProfileAvatarItem src={IMAGES.dummyImage.src} title='Darlene Peterson' subtitle='#12343' />, <p className='text-sm text-dark-navy font-[500]'>HR MANAGER</p>,
        <p className='text-sm text-dark-navy font-[500]'>Human Resources</p>,
        <p className='text-sm text-dark-navy font-[500]'>darlene.robertson@gmail.com</p>,
        <div className='flex flex-col '>
            <div className='text-sm text-dark-navy font-[500]'>24.01.2024</div>
            <div className='text-[10px] text-dark-navy font-[500]'>1 Year 4 Months </div>
        </div>, <MdOutlineKeyboardArrowRight
            className='w-6 h-6 border border-gray-border rounded-sm' />],
        [<ProfileAvatarItem src={IMAGES.dummyImage.src} title='Darlene Peterson' subtitle='#12343' />, <p className='text-sm text-dark-navy font-[500]'>HR MANAGER</p>,
        <p className='text-sm text-dark-navy font-[500]'>Human Resources</p>,
        <p className='text-sm text-dark-navy font-[500]'>darlene.robertson@gmail.com</p>,
        <div className='flex flex-col '>
            <div className='text-sm text-dark-navy font-[500]'>24.01.2024</div>
            <div className='text-[10px] text-dark-navy font-[500]'>1 Year 4 Months </div>
        </div>, <MdOutlineKeyboardArrowRight
            className='w-6 h-6 border border-gray-border rounded-sm' />],
        [<ProfileAvatarItem src={IMAGES.dummyImage.src} title='Darlene Peterson' subtitle='#12343' />, <p className='text-sm text-dark-navy font-[500]'>HR MANAGER</p>,
        <p className='text-sm text-dark-navy font-[500]'>Human Resources</p>,
        <p className='text-sm text-dark-navy font-[500]'>darlene.robertson@gmail.com</p>,
        <div className='flex flex-col '>
            <div className='text-sm text-dark-navy font-[500]'>24.01.2024</div>
            <div className='text-[10px] text-dark-navy font-[500]'>1 Year 4 Months </div>
        </div>, <MdOutlineKeyboardArrowRight
            className='w-6 h-6 border border-gray-border rounded-sm' />],
    ]

    return (
        <div className='h-full p-2 ' >

            <FormHeading textClasses='text-xl font-[600] font-semibold ' classNames='mb-4' icon={<EmployeesIcon classNames='w-6' />} text='Employees' />

            <div className='bg-white border border-gray-border rounded-md p-3 '>
                {/* Filters Section */}
                <div className="flex gap-3 my-3"> <SearchInput placeholder='Search Employees' value='' />
                    <div className="flex gap-2  items-center">
                        <label className='text-sm text-[#abaeb4]' >Sort</label>
                        <select className='p-2 border w-full max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray ' >
                            <option>Select</option>
                            <option>Recently Added</option>
                            <option>Recently Added</option>
                            <option>Recently Added</option>
                        </select>
                    </div>

                    <div className="flex gap-2  items-center">
                        <label className='text-sm text-[#abaeb4]' >Filter</label>
                        <select className='p-2 border w-full max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray ' >
                            <option>Select</option>
                            <option>Recently Added</option>
                            <option>Recently Added</option>
                            <option>Recently Added</option>
                        </select>
                    </div>
                </div>
                <InfoGrid
                    headers={["Employee ID", "Job Title", "Department", "Email", "Hire Date", ""]}
                    values={values}
                    cols={6}
                    colSpans={[1, 1, 1, 1, 1, 1]}
                />
            </div>
        </div>
    )
}

export default EmployeesTab