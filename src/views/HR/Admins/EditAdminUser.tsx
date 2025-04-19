import InputField from '@/components/common/InputField';
import SelectField from '@/components/common/SelectField';
import EyeIcon from '@/components/icons/eye-icon';
import WorkBridgeLogo from '@/components/icons/work-bridge-logo';
import Modal from '@/components/modal';
import axiosInstance from '@/lib/axios';
import { getAllEmployees } from '@/services/getAllEmployees';
import { fetchUserRoles } from '@/store/slices/userRolesSlice';
import { closeEditModal, updateUser } from '@/store/slices/userSlice';
import { AppDispatch, RootState } from '@/store/store';
import { EmployeeData } from '@/types/employee';
import { hrFormSchema } from '@/validations/formValidations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

interface Country {
  id: number;
  country: string;
  code: string;
}

type HRFormInputs = z.infer<typeof hrFormSchema>;

export default function EditAdminUser() {
  const dispatch = useDispatch<AppDispatch>();
  const { editModalOpen, userToEdit } = useSelector(
    (state: RootState) => state.users
  );
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { items } = useSelector((state: RootState) => state.userRoles.roles);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isManager, setIsManager] = useState(false);
  const [employees, setEmployees] = useState<EmployeeData[]>([]);

  const prefillUser = {
    email: userToEdit?.email,
    roleId: userToEdit?.roleId,
    // password: userToEdit?.password,
    lastName: userToEdit?.lastName,
    firstName: userToEdit?.firstName,
    // countryId: userToEdit?.employee?.countryId,
    // reportingManagerId: userToEdit?.employee?.reportingManagerId,
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<HRFormInputs>({
    resolver: zodResolver(hrFormSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    dispatch(fetchUserRoles() as any);
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getAllEmployees(1, 1000, '', true);
        setEmployees(response?.data?.items || []);
      } catch (error) {
        console.error('Error fetching employees: ', error);
        setEmployees([]);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/countries');
        setCountries(response.data?.data?.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Prefill form when userToEdit changes
  useEffect(() => {
    if (userToEdit) {
      reset(prefillUser); // Prefill all fields at once
      setIsManager((userToEdit as any).isManager || false);
    }
  }, [userToEdit, reset]);
  console.log('hr from errors: ', errors);

  if (!editModalOpen || !userToEdit) return null;

  const roles = items.map((role) => ({
    label: role.name as string,
    value: role.id as string,
  })) ?? [{ label: '', value: '' }];

  const onSubmit = async (data: HRFormInputs) => {
    setLoading(true);

    const payload = {
      ...data,
      id: userToEdit?.id, // Keep the existing ID for updating
      isManager,
      reportingManagerId: watch('reportingManagerId') || null,
      active: userToEdit?.active ?? true, // Add the active property
    };

    const response = await dispatch(updateUser(payload) as any);
    if (response?.type === 'users/updateUser/fulfilled') {
      dispatch(closeEditModal());
      toast.success('User updated successfully!');
    }

    setLoading(false);
  };

  const selectedRoleId = watch('roleId');

  return (
    <Modal onClose={() => dispatch(closeEditModal())}>
      <div className='bg-white rounded-sm md:min-w-[35rem] md:min-h-[28rem] px-8 p-4'>
        <WorkBridgeLogo classNames='max-w-[9rem] mb-[1.5rem]' />
        <h1 className='font-bold text-[#282828] mb-2'>Edit User</h1>
        <p className='text-sm text-[#282828] mb-4'>
          Update the details of the user.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-2'>
            <InputField
              name='firstName'
              placeholder='First Name'
              register={register}
              error={errors.firstName?.message}
            />
            <InputField
              name='lastName'
              placeholder='Last Name'
              register={register}
              error={errors.lastName?.message}
            />
            <InputField
              name='email'
              placeholder='Email'
              register={register}
              styles={{ container: 'col-span-2' }}
              error={errors.email?.message}
            />

            <div className='flex flex-col gap-1'>
              <SelectField
                name='roleId'
                register={register}
                error={errors.roleId?.message}
                options={roles}
                onChange={(e) => {
                  const roleId = Number(e.target.value);
                  setValue('roleId', roleId);
                  setIsManager(roleId === 1 || roleId === 2);
                }}
              />

              {(Number(selectedRoleId) === 1 ||
                Number(selectedRoleId) === 2) && (
                <div className='flex items-center col-span-2 mt-2 mb-3'>
                  <input
                    type='checkbox'
                    id='isManager'
                    checked={isManager}
                    onChange={(e) => setIsManager(e.target.checked)}
                    className='mr-2'
                  />
                  <label htmlFor='isManager' className='text-sm'>
                    Is Manager
                  </label>
                </div>
              )}
            </div>

            <article className='w-full'>
              <select {...register('countryId')} className='form-input'>
                <option value=''>Select a country*</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.country}
                  </option>
                ))}
              </select>
              {errors.countryId && (
                <span className='form-error'>{errors.countryId.message}</span>
              )}
            </article>

            <article className='w-full'>
              {Number(selectedRoleId) !== 2 && (
                <select
                  {...register('reportingManagerId', { valueAsNumber: true })}
                  className='form-input'
                >
                  <option value=''>Select Manager</option>
                  {employees
                    .filter((employee) => employee.isManager)
                    .map((manager) => (
                      <option key={manager.id} value={manager.id}>
                        {manager.firstName} {manager.lastName}
                      </option>
                    ))}
                </select>
              )}
              {errors.reportingManagerId && (
                <span className='form-error'>
                  {errors.reportingManagerId.message}
                </span>
              )}
            </article>

            <div className='relative w-full col-span-2'>
              <div className='relative flex items-center'>
                <InputField
                  name='password'
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder='Password'
                  register={register}
                  error={errors.password?.message && ''}
                />
                <button
                  type='button'
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500'
                >
                  <EyeIcon classNames='w-4' />
                </button>
              </div>
              {errors.password && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className='flex justify-start mt-4'>
            <button
              type='submit'
              className='bg-dark-navy text-white text-xs px-6 py-2 rounded-[3px] min-w-[10rem]'
              disabled={loading}
            >
              {loading ? (
                <BiLoaderCircle className='h-4 w-4 animate-spin mx-auto' />
              ) : (
                'Update'
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
