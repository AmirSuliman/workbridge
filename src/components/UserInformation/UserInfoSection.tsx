'use client'
import React from 'react';
import BasicInfoIcon from '../icons/basic-info-icon';
import FormHeading from './FormHeading';
import FormField from './FormField';
import { FaPhoneAlt } from 'react-icons/fa';
import { HiMiniGlobeAmericas, HiMiniHomeModern } from 'react-icons/hi2';

const UserInfoSection: React.FC = () => {
    console.log("rendered")

    return (<div className='p-4 rounded-md border-[1px] border-gray-border bg-white h-full'>
        {/* Basic Information */}
        <div className='my-5'>
            <FormHeading icon={<BasicInfoIcon classNames='w-4' />} text='Basic Information' />
            <div className="grid sm:grid-cols-3 gap-4 my-5">
                <FormField onChange={() => { }} label='First Name' value='Juliet' />
                <FormField onChange={() => { }} label='Middle Name' value='' />
                <FormField onChange={() => { }} label='Surname' value='Nicolas' />
                <FormField onChange={() => { }} label='Birthday' value='' />
                <FormField onChange={() => { }} label='Gender' value='' />
                <FormField onChange={() => { }} label='Marital Status' value='' />
            </div>
        </div>
        <hr className='text-white' />
        <div className='my-5'>


            <FormHeading icon={<HiMiniHomeModern className='w-4' />} text='Address' />
            <div className="grid sm:grid-cols-3 gap-4 mt-5">
                <FormField onChange={() => { }} label='Street 1' value='4799 Lamberts Branch Road' />
                <FormField onChange={() => { }} label='Street 2' value='' />
                <FormField onChange={() => { }} label='Zip' value='84116' />
                <FormField onChange={() => { }} label='City' value='Salt Lake City' />
                <FormField onChange={() => { }} label='Country' value='Utah' />
                <FormField onChange={() => { }} label=' State' value='Utah' />
            </div>
        </div>
        <hr />
        <div className='my-5'>
            <FormHeading icon={<FaPhoneAlt className='w-4' />} text='Contact' />
            <div className="grid sm:grid-cols-3 gap-4 mt-5">
                <FormField onChange={() => { }} label='Phone' value='+389 71 735 326' />
                <FormField onChange={() => { }} label='Work Phone' value='+389 71 735 326' />
            </div>
        </div>
        <hr />
        <div className='my-5'>

            <FormHeading icon={<HiMiniGlobeAmericas className='w-4' />} text='Social Links' />
            <div className="grid sm:grid-cols-3 gap-4 mt-5">
                <FormField onChange={() => { }} label='LinkedIn' value='/in/JuliettNicolas' />
                <FormField onChange={() => { }} label='Facebook' value='Juilett Nicolas' />
                <FormField onChange={() => { }} label='Instagram' value='@juliettnicolas' />
                <FormField onChange={() => { }} label='Personal Website' value='juliettnicolas.com' />
            </div>
        </div>



    </div>)

};
export default UserInfoSection;
