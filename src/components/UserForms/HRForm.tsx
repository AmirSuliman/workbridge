import React, { useState } from 'react'
import InputField from '../common/InputField'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { hrFormSchema } from '@/src/validations/formValidations';
import EyeIcon from '../icons/eye-icon';
import axiosInstance from '@/src/lib/axios';
import { API_ROUTES } from '@/src/constants/apiRoutes';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';

type HRFormInputs = z.infer<typeof hrFormSchema>;
const HRForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<HRFormInputs>({
        resolver: zodResolver(hrFormSchema),
        mode: 'onChange',
    });

    const style = { label: "", input: "text-xs", container: "", error: "text-[9px]" }
    const onSubmit = (data: HRFormInputs) => {
        setLoading(true);
        axiosInstance.post(API_ROUTES.CREATE_USER, data).then(res => {
            toast.success("HR created Successfully!");
            setLoading(false);
        }).catch(err => {
            toast.error(err?.response?.data?.message);
            setLoading(false);
        })
        console.log(data, 'Data');

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-2 grid grid-cols-2 gap-2 gap-y-1'>
                <InputField styles={style} name='firstName' placeholder='First Name' register={register} error={errors.firstName?.message} />
                <InputField styles={style} name='lastName' placeholder='Last Name' register={register} error={errors.lastName?.message} />
                <InputField styles={{ ...style, container: "col-span-2" }} name='email' placeholder='Email' register={register} error={errors.email?.message} />
                <InputField styles={{ ...style, container: "col-span-2" }} name='roleId' placeholder='Role ID' register={register} error={errors.roleId?.message} />
                <div className="relative w-full col-span-2">
                    <div className="relative flex items-center">
                        <InputField
                            name="password"
                            type={passwordVisible ? 'text' : 'password'} // Toggle input type based on visibility state
                            placeholder="Password"
                            register={register}
                            styles={style}
                            error={errors.password?.message && ''}
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility on click
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-auto"
                        >
                            <EyeIcon classNames="w-4" />
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex justify-start mt-4'>
                <button type='submit' className='bg-dark-navy text-white font-normal text-xs px-6 py-2 rounded-[3px] min-w-[10rem]' disabled={loading}>
                    {loading ? <BiLoaderCircle className="h-4 w-4 animate-spin mx-auto" /> : "Add New HR"}</button>
            </div>

        </form>

    )
}

export default HRForm