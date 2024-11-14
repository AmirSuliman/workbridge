'use client'
import React from 'react';
import BasicInfoIcon from '../icons/basic-info-icon';
import FormHeading from './FormHeading';
import FormField from './FormField';
import {  HiMiniHomeModern } from 'react-icons/hi2';

const EmergencySection: React.FC = () => {
    console.log("rendered")

    return (<div className='p-4 rounded-md border-[1px] border-gray-border bg-white h-full'>
        {/* Basic Information */}
        <div className='my-5'>
            <FormHeading icon={<BasicInfoIcon classNames='w-4' />} text='Emergency Contact' />
            <div className="grid sm:grid-cols-3 gap-4 my-5">
                <FormField onChange={() => { }} label='First Name' value='Juliet' />
                <FormField onChange={() => { }} label='Middle Name' value='' />
                <FormField onChange={() => { }} label='Surname' value='Nicolas' />
                <FormField onChange={() => { }} label='Phone' value='+123 456 78 90' />
                <FormField onChange={() => { }} label='Work Phone' value='+123 456 78 90' />
                <FormField onChange={() => { }} label='Email' value='emailaddress@gmail.com' />
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
       



    </div>)

};
export default EmergencySection;
