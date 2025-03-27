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
import { getAllEmployees } from '@/services/getAllEmployees';
import { EmployeeData } from '@/types/employee';

interface Country {
  id: number;
  country: string;
  code: string;
}

type HRFormInputs = z.infer<typeof hrFormSchema>;

const HRForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.users);
  const [reportingManagerId, setReportingManagerId] = useState<number | null>(
    null
  );
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { items } = useSelector((state: RootState) => state.userRoles.roles);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isManager, setIsManager] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors },
  } = useForm<HRFormInputs>({
    resolver: zodResolver(hrFormSchema),
    mode: 'onChange',
  });

  const [employees, setEmployees] = useState<EmployeeData[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getAllEmployees(1, 1000, '', true);
        const items = response?.data?.items || []; // Ensure items is an array
        setEmployees(items);
      } catch (error) {
        console.error('Error fetching employees: ', error);
        setEmployees([]); // Ensure employees is always an array
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (reportingManagerId && employees.length > 0) {
      const matchedDepartment = employees.find(
        (employee) => employee.id === reportingManagerId
      );
      if (matchedDepartment) {
        resetField('reportingManagerId');
      }
    }
  }, [employees, reportingManagerId, resetField]);

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

  const onSubmit = async (data: HRFormInputs) => {
    const selectedManagerId = watch('reportingManagerId');
    if (!isManager && !selectedManagerId) {
      console.error('Reporting Manager ID is missing!');
      return;
    }

    const payload = {
      ...data,
      isManager,
      reportingManagerId: watch('reportingManagerId') || null,
    };

    console.log('Submitting Payload:', payload);

    const response = await dispatch(createUser(payload) as any);
    if (response?.type === 'users/createUser/fulfilled') {
      onClose();
    }
  };

  const selectedRoleId = watch('roleId');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-2 grid grid-cols-2 gap-2 gap-y-1">
        <InputField
          name="firstName"
          placeholder="First Name"
          register={register}
          error={errors.firstName?.message}
        />
        <InputField
          name="lastName"
          placeholder="Last Name"
          register={register}
          error={errors.lastName?.message}
        />
        <InputField
          name="email"
          placeholder="Email"
          register={register}
          styles={{ container: 'col-span-2' }}
          error={errors.email?.message}
        />

        <div className="flex flex-col gap-1">
          <SelectField
            name="roleId"
            register={register}
            error={errors.roleId?.message}
            key={'roleId'}
            options={roles}
            onChange={(e) => {
              const roleId = Number(e.target.value);
              console.log('Selected Role ID:', roleId);
              setValue('roleId', roleId);
            }}
          />

          {(Number(selectedRoleId) === 1 || Number(selectedRoleId) === 2) && (
            <div className="flex items-center col-span-2 mt-2 mb-3">
              <input
                type="checkbox"
                id="isManager"
                checked={isManager}
                onChange={(e) => setIsManager(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="isManager" className="text-sm">
                Is Manager
              </label>
            </div>
          )}
        </div>

        <article className="w-full">
          <select
            {...register('countryId', {
              valueAsNumber: true,
              setValueAs: (value) => (value === '' ? null : Number(value)),
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

        <article className="w-full">
          {Number(selectedRoleId) !== 2 && (
            <select
              {...register('reportingManagerId')}
              className="form-input"
              onChange={(e) => {
                const managerId = Number(e.target.value);
                setReportingManagerId(managerId);
                setValue('reportingManagerId', managerId, {
                  shouldValidate: true,
                }); // ✅ Ensure it's set in form state
              }}
            >
              <option value="">Select Manager</option>
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
            <span className="form-error">
              {errors.reportingManagerId.message}
            </span>
          )}
        </article>

        <div className="relative w-full col-span-2">
          <div className="relative flex items-center">
            <InputField
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              register={register}
              error={errors.password?.message && ''}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
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
