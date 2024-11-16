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
import { RootState } from '@/src/store/store';
import { useDispatch, useSelector } from 'react-redux';
import SelectField from '../common/SelectField';
import { createUser } from '@/src/store/slices/userSlice';

type HRFormInputs = z.infer<typeof hrFormSchema>;
const HRForm = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.users);

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { items } = useSelector((state: RootState) => state.userRoles.roles);
    // console.log(rolesData, "rolesdata");
    // const roles = [{ label: 'HR', value: '1' }, { label: 'Admin', value: '2' }];
    const roles = items.map((role) => ({ label: role.name as string, value: role.id as string })) ?? [{ label: '', value: '' }];


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
        dispatch(createUser(data) as any);
        // setLoading(true);
        // axiosInstance.post(API_ROUTES.CREATE_USER, data).then(res => {
        //     toast.success("HR created Successfully!");
        //     setLoading(false);
        // }).catch(err => {
        //     toast.error(err?.response?.data?.message);
        //     setLoading(false);
        // })
        // console.log(data, 'Data');

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-2 grid grid-cols-2 gap-2 gap-y-1'>
                <InputField styles={style} name='firstName' placeholder='First Name' register={register} error={errors.firstName?.message} />
                <InputField styles={style} name='lastName' placeholder='Last Name' register={register} error={errors.lastName?.message} />
                <InputField name='email' placeholder='Email' register={register} styles={{ ...style, container: "col-span-2" }}
                    error={errors.email?.message} />

                {/* <InputField styles={{ ...style, container: "col-span-2" }} name='roleId' placeholder='Role ID' register={register} error={errors.roleId?.message} /> */}

                <SelectField name='roleId' register={register} error={errors.roleId?.message}
                    key={'roleId'} styles={{ ...style, container: "col-span-2" }}
                    placeholder='Select Role' options={roles} />

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
                    {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
                </div>
            </div>
            <div className='flex justify-start mt-4'>
                <button type='submit' className='bg-dark-navy text-white font-normal text-xs px-6 py-2 rounded-[3px] min-w-[10rem]' disabled={loading}>
                    {userState.createStatus == "loading" ? <BiLoaderCircle className="h-4 w-4 animate-spin mx-auto" /> : "Add New HR"}</button>
            </div>

        </form>

    )
}

export default HRForm