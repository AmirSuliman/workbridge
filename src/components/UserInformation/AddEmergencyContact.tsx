import { useForm } from 'react-hook-form';
import FormHeading from './FormHeading';
import BasicInfoIcon from '../icons/basic-info-icon';
import { HiMiniHomeModern } from 'react-icons/hi2';
import axiosInstance from '@/lib/axios';
import Button from '../Button';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setEmergencyContact } from '@/store/slices/emergencyContactSlice';

const AddEmergencyContact = ({
  setAddNew,
  employeeData,
  emergencyContacts,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    reset,
    register,
    formState,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(employeeSchema),
    // mode: 'onChange',
  });
  const { isSubmitting } = formState;
  const onSubmit = async (data: any) => {
    console.log('data: ', data);
    const payload = {
      employeeId: employeeData.id,
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName,
      phone: data.phone,
      workPhone: data.workPhone,
      email: data.email,
      location: {
        street1: data.location.street1,
        street2: data.location.street2,
        zipCode: data.location.zipCode,
        city: data.location.city,
        country: data.location.country,
        state: data.location.state,
      },
    };
    console.log('payload: ', payload);

    try {
      const response = await axiosInstance.post('/emergencyContact/', payload);
      console.log('res: ', response.data);
      dispatch(setEmergencyContact([...emergencyContacts, response.data.data]));
      toast.success('Emergency contact added successfully!');
      setAddNew(false);
      reset();
    } catch (error) {
      toast.error(
        (error as any).response?.data?.message || 'Cannot add emergency contact'
      );
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-4 mt-4 rounded-md border-[1px] border-gray-border bg-white h-full">
        <FormHeading
          icon={<BasicInfoIcon classNames="w-4" />}
          text="Emergency Contact"
        />
        <div className="grid sm:grid-cols-3 gap-4 my-5">
          <label className="form-label">
            First Name*
            <input
              type="text"
              className={`form-input`}
              {...register('firstName', { required: 'First name is required' })}
            />
            {errors?.firstName && (
              <p className="form-error">{String(errors?.firstName.message)}</p>
            )}
          </label>
          <label className="form-label">
            Middle Name
            <input
              type="text"
              className={`form-input`}
              {...register('middleName')}
            />
            {errors?.middleName && (
              <p className="form-error">{String(errors?.middleName.message)}</p>
            )}
          </label>
          <label className="form-label">
            Surname*
            <input
              type="text"
              className={`form-input`}
              {...register('lastName', { required: 'Last name is required' })}
            />
            {errors?.lastName && (
              <p className="form-error">{String(errors?.lastName.message)}</p>
            )}
          </label>
          <label className="form-label">
            Phone*
            <input
              type="text"
              className={`form-input`}
              {...register('phone', { required: 'Phone is required' })}
            />
            {errors?.phone && (
              <p className="form-error">{String(errors?.phone.message)}</p>
            )}
          </label>
          <label className="form-label">
            Work Phone
            <input
              type="text"
              className={`form-input`}
              {...register('workPhone')}
            />
            {errors?.workPhone && (
              <p className="form-error">{String(errors?.workPhone.message)}</p>
            )}
          </label>
          <label className="form-label">
            Email*
            <input
              type="email"
              className={`form-input`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="form-error">{String(errors.email.message)}</p>
            )}
          </label>
        </div>
        <hr className="text-white" />
        <div className="my-5">
          <FormHeading
            icon={<HiMiniHomeModern className="w-4" />}
            text="Address"
          />
          <div className="grid sm:grid-cols-3 gap-4 mt-5">
            <label className="form-label">
              Street 1
              <input
                type="text"
                className={`form-input`}
                {...register('location.street1')}
              />
              {errors?.location?.['street1'] && (
                <p className="form-error">
                  {errors.location['street1'].message}
                </p>
              )}
            </label>
            <label className="form-label">
              Street 2
              <input
                type="text"
                className={`form-input`}
                {...register('location.street2')}
              />
              {errors?.location?.['street2'] && (
                <p className="form-error">
                  {errors?.location?.['street2'].message}
                </p>
              )}
            </label>
            <label className="form-label">
              Zip
              <input
                type="number"
                className={`form-input`}
                {...register('location.zipCode', { valueAsNumber: true })}
              />
              {errors?.location?.['zipCode'] && (
                <p className="form-error">
                  {errors?.location?.['zipCode'].message}
                </p>
              )}
            </label>
            <label className="form-label">
              City
              <input
                type="text"
                className={`form-input`}
                {...register('location.city')}
              />
              {errors?.location?.['city'] && (
                <p className="form-error">
                  {errors?.location?.['city'].message}
                </p>
              )}
            </label>
            <label className="form-label">
              Country*
              <input
                type="text"
                className={`form-input`}
                {...register('location.country', {
                  required: 'Country is required',
                })}
              />
              {errors?.location?.['country'] && (
                <p className="form-error">
                  {errors?.location?.['country'].message}
                </p>
              )}
            </label>
            <label className="form-label">
              State
              <input
                type="text"
                className={`form-input`}
                {...register('location.state')}
              />
              {errors?.location?.['state'] && (
                <p className="form-error">
                  {errors?.location?.['state'].message}
                </p>
              )}
            </label>
          </div>
        </div>
      </div>
      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        name={isSubmitting ? '' : 'Save emergency contact'}
        icon={
          isSubmitting && (
            <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
          )
        }
        className="w-full max-w-xl mx-auto col-span-full mt-4"
      />
    </>
  );
};
export default AddEmergencyContact;
