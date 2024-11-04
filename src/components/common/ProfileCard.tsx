import React from 'react'
import Image from 'next/image'
import FacebookIcon from '../icons/fb-icon'
import LinkedinIcon from '../icons/linkedin-icon'
import XIcon from '../icons/x-icon'
import InstagramIcon from '../icons/instagram-icon'
import { IMAGES } from '@/src/constants/images'
import { Inter } from 'next/font/google'
import ProfileInfoItem from './ProfileInfoItem'
import { CiMobile3 } from 'react-icons/ci'
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa";
import { HiMiniBriefcase } from "react-icons/hi2";
import { HiOutlineHashtag } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5"

import { FaEdit } from "react-icons/fa";

import Button from '../Button'

const inter = Inter({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal', 'italic'],
    display: 'swap'
})
const ProfileCard = () => {
    return (
        <article className={`bg-white shadow-md rounded-md border border-gray-border p-4 pb-6 ${inter.className}`}>
            <div className="flex gap-4 ">
                <div className="flex flex-col items-center">
                    <Image className='rounded-full max-w-[6rem] object-contain' src={IMAGES.dummyImage} height={1000} width={1000} alt={"User Image"} />
                    {/* social Icons */}
                    <div className="mt-2 flex gap-1 items-center ">
                        <FacebookIcon classNames='w-4' />
                        <LinkedinIcon classNames='w-4' />
                        <InstagramIcon classNames='w-4' />
                        <LinkedinIcon classNames='w-4' />
                        {/* <XIcon classNames='w-5 h-5 bg-dark-navy rounded-full' /> */}
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <h1 className={`text-lg`}>Juliette Nicolas</h1>
                            <p className="text-xs text-gray-500">Human Resources</p>
                        </div>
                        <div className="h-5">
                            <Button classNames={'!bg-dark-navy !text-white !text-xs'} icon={<FaEdit />} name='Edit Profile'  />
                        </div>
                    </div>
                    <div className="flex mt-3 gap-4">
                        <ProfileInfoItem icon={CiMobile3} text='+123 456 78 90' title='Phone Number' />
                        <ProfileInfoItem icon={FaPhoneAlt} text='+123 456 78 90' title='Work Number' />
                        <ProfileInfoItem icon={MdEmail} text='juliette.nicolas@domain.com' title='Email' />
                    </div>
                    <div className="flex mt-3 gap-4">
                        <ProfileInfoItem icon={HiOutlineHashtag} text='1234567' title='Identification No.' />
                        <ProfileInfoItem icon={FaRegCalendar} text='24.01.2023' title='Hire Date' />
                        <ProfileInfoItem icon={FaRegCalendar} text='1yo 4m' title='Duration' />
                        <ProfileInfoItem icon={HiMiniBriefcase} text='Full Time' title='Work Type' />
                        <ProfileInfoItem icon={HiMiniBriefcase} text='Human Resources' title='Job Title' />
                        <ProfileInfoItem icon={IoLocationSharp} text='London, Utah' title='Location' />
                    </div>
                </div>
            </div>

        </article>
    )
}

export default ProfileCard