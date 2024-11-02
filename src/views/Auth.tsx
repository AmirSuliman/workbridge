'use client'
import CircleIcon from '@/components/icons/circle-icon'
import GoogleLogo from '@/components/icons/google-logo'
import WorkBridgeLogo from '@/components/icons/work-bridge-logo'
import React from 'react'

const Auth = () => {
  return (
      <div className=' flex flex-col items-center justify-center my-auto h-[90%] mx-auto bg-gray-100' >
        <div className='sm:min-w-[26rem]'>

    <div className='flex flex-col bg-gray-100 '>
        <h2 className='text-black dark:text-white text-md text-center my-2 font-normal mt-[1rem]'>Sign-In as</h2>
        <div className="flex items-center gap-x-4 justify-center mb-6">
          <button className='flex shadow-lg items-center  gap-2 w-[9rem] text-black p-2 border shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]rounded-sm text-xs bg-white'>
            <CircleIcon classNames='w-4 '/>Human Resources
            </button>
          <button className='flex shadow-lg items-center  gap-2 w-[9rem] text-black p-2 border shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]rounded-sm text-xs bg-white'>
            <CircleIcon classNames=' w-4'/>
            Employee</button>
        </div>
        <div className='flex flex-col items-center bg-white h-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  pt-[2rem] px-[1rem]' >

       <WorkBridgeLogo classNames='max-w-[12rem] '/>

        <h3 className='text-lg mb-2'>Welcome</h3>
        <p className="text-sm mb-6">Sign In to ISA workBridge</p>
      
        <input className="p-2 px-3 shadow-xs outline-0 border border-gray-200 my-1 rounded-xs text-sm w-full" placeholder='Work Email' name='work email' type="text" />
        <input  className="p-2 px-3 shadow-xs outline-0 border border-gray-200 my-1 rounded-xs text-sm w-full" placeholder='Password' name='password' type="text" />
        <p className='text-[#007BB2]  font-semibold text-xs text-right my-2 w-full hover:cursor-pointer'>Forgot Password?</p>

    <button className='p-3 bg-[#0F172A] text-sm text-white w-full mt-4'>Continue</button>
    <p className='text-sm text-black text-xs w-full mt-3'>Don't have an account? <span className='text-[#007BB2]'>Sign Up</span></p>

        {/* Separation Line */}
        <div className="flex items-center my-4 w-full">
  <hr className="flex-grow border-t border-gray-300" />
  <span className="mx-6 text-gray-600 text-sm">OR</span>
  <hr className="flex-grow border-t border-gray-300" />
</div>

{/* Continue wit google Button */}
<button className='flex items-center gap-2 justify-center p-2 mb-6 text-[#0000009E] text-xs rounded-md border border-gray-200 w-full'>
  <GoogleLogo classNames='max-w-5'/>
    Continue with Google
</button>


    </div>
        </div>
        </div>
       </div>  
  )
}

export default Auth
