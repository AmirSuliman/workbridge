import axiosInstance from '@/lib/axios';
import { createUser } from '@/store/slices/userSlice';
import { RootState } from '@/store/store';
import { hrFormSchema } from '@/validations/formValidations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiLoaderCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import EyeIcon from '../icons/eye-icon';
interface Country {
  id: number;
  country: string;
  code: string;
}

type HRFormInputs = z.infer<typeof hrFormSchema>;
const HRForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.users);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { items } = useSelector((state: RootState) => state.userRoles.roles);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesResponse = await axiosInstance.get('/countries');
        if (countriesResponse.data?.data?.items) {
          setCountries(countriesResponse.data.data.items);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const roles = items.map((role) => ({
    label: role.name as string,
    value: role.id as string,
  })) ?? [{ label: '', value: '' }];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HRFormInputs>({
    resolver: zodResolver(hrFormSchema),
    mode: 'onChange',
  });

  const style = {
    label: '',
    input: 'text-xs',
    container: '',
    error: 'text-[9px]',
  };
  const onSubmit = async (data: HRFormInputs) => {
    console.log('admin form data: ', data);
    const response = await dispatch(createUser(data) as any);
    console.log('user res: ', response);
    if (response?.type === 'users/createUser/fulfilled') onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-2 grid grid-cols-2 gap-2 gap-y-1">
        <InputField
          styles={style}
          name="firstName"
          placeholder="First Name"
          register={register}
          error={errors.firstName?.message}
        />
        <InputField
          styles={style}
          name="lastName"
          placeholder="Last Name"
          register={register}
          error={errors.lastName?.message}
        />
        <InputField
          name="email"
          placeholder="Email"
          register={register}
          styles={{ ...style, container: 'col-span-2' }}
          error={errors.email?.message}
        />

        <SelectField
          name="roleId"
          register={register}
          error={errors.roleId?.message}
          key={'roleId'}
          // styles={{ ...style, container: 'col-span-2' }}
          placeholder="Select Role"
          options={roles}
        />

        <article className="w-full">
          {/* <Label text="Country*" /> */}
          <select
            {...register('countryId', {
              valueAsNumber: true,
              setValueAs: (value) => (value === '' ? null : Number(value)), // Handle empty string
            })}
            className="form-input"
          >
            <option value="">Select a country*</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.country}
              </option>
            ))}
          </select>
          {errors.countryId && (
            <span className="form-error">{errors.countryId.message}</span>
          )}
        </article>

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
      <div className="flex justify-start mt-4">
        <button
          type="submit"
          className="bg-dark-navy text-white font-normal text-xs px-6 py-2 rounded-[3px] min-w-[10rem]"
          disabled={loading}
        >
          {userState.createStatus == 'loading' ? (
            <BiLoaderCircle className="h-4 w-4 animate-spin mx-auto" />
          ) : (
            'Add'
          )}
        </button>
      </div>
    </form>
  );
};

export default HRForm;
