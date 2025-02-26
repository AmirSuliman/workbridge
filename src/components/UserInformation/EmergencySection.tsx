import axiosInstance from '@/lib/axios';
import { emergencyContactSchema } from '@/schemas/employeeSchema';
import { setEmergencyContact } from '@/store/slices/emergencyContactSlice';
import { AppDispatch, RootState } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { GoPlusCircle } from 'react-icons/go';
import { HiMiniHomeModern } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';
import BasicInfoIcon from '../icons/basic-info-icon';
import Modal from '../modal';
import AddEmergencyContact from './AddEmergencyContact';
import EmergencyDeleteModal from './EmergencyDeleteModal';
import FormHeading from './FormHeading';
import InfoGrid from './InfoGrid';
import imageLoader from '../../../imageLoader';
interface PaymentProps {
  id: number;
  note: string;
  paymentSchedule: string;
  payType: string;
  employeeId: number;
  overtime: boolean;
  payRate: number;
  effectiveDate: string;
}

const EmergencySection = ({ employeeData }) => {
  const [isEditPayment, setisEditPayment] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [addeNew, setAddNew] = useState(false);
  // const [payments, setPayments] = useState<PaymentProps[]>([]);
  const [currentPayment, setCurrentPayment] = useState<PaymentProps | null>(
    null
  );

  const dispatch = useDispatch<AppDispatch>();
  const {
    contact: emergencyContacts,
    loading,
    error,
  } = useSelector((state: RootState) => state.emergencyContact);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosInstance.get(
          `/emergencyContacts/${employeeData.id}`
        );
        dispatch(setEmergencyContact(response.data.data.items));
      } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An unexpected error occurred');
        }
      }
    };
    fetchPayments();
  }, [employeeData.id]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(emergencyContactSchema),
    mode: 'onChange',
  });

  const handleEdit = async (data) => {
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
      const response = await axiosInstance.put(
        `/emergencyContact/${paymentId}`,
        payload
      );
      console.log('put response: ', response.data);
      toast.success('Contact updated successfully.');

      // Update the local state
      const updatedContacts = emergencyContacts.map((payment) =>
        payment.id === paymentId ? { ...payment, ...data } : payment
      );
      dispatch(setEmergencyContact(updatedContacts));
      setisEditPayment(false);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Cannot update contact.');
      }
      console.log(error);
    }
  };

  const handleEditClick = (payment) => {
    setisEditPayment(true);
    setPaymentId(payment.id);
    setCurrentPayment(payment);
    reset(payment);
  };

  return (
    <>
      <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5">
        <div className="mb-5 flex justify-between flex-wrap gap-4">
          <FormHeading
            icon={<Image src="/contact.svg" alt="img" width={17} height={17} />}
            text="Emergency Contact"
          />

          {!addeNew && !isEditPayment && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                setAddNew(true);
              }}
              name={'Add New Contact'}
              icon={<GoPlusCircle />}
              className="flex-row-reverse !text-[14px]"
            />
          )}
        </div>

        {!isEditPayment ? (
          <InfoGrid
            cols={6}
            headers={[
              'Contact Name',
              'Phone',
              'Work Phone',
              'Email',
              'Address',
              '',
              '',
            ]}
            values={
              emergencyContacts && emergencyContacts.length > 0
                ? emergencyContacts.map((payment) => [
                    `${payment.firstName || ''} ${payment.lastName || ''}`,
                    payment.phone || '',
                    payment.workPhone || '',
                    payment.email || '',
                    `${payment.location?.zipCode || ''} ${
                      payment.location?.street1 || ''
                    } ${payment.location?.city || ''} ${
                      payment.location?.state || ''
                    } ${payment.location?.country || ''}`,
                    <Image
                      src="/delete.svg"
                      width={10}
                      height={10}
                      alt="delete"
                      className="cursor-pointer"
                      key={payment.id}
                      onClick={(e) => {
                        e.preventDefault();
                        setDeleteModal(true);
                        setAddNew(false);
                        setPaymentId(payment.id);
                      }}
                    />,
                    <Image
                      src="/edit.svg"
                      width={10}
                      height={10}
                      alt="edit"
                      className="cursor-pointer"
                      key={payment.id}
                      onClick={(e) => {
                        e.preventDefault();
                        handleEditClick(payment);
                      }}
                    />,
                  ])
                : [['', '', '', '', '', '', '']]
            }
          />
        ) : (
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
                  {...register('firstName', {
                    required: 'First name is required',
                  })}
                />
                {errors?.firstName && (
                  <p className="form-error">
                    {String(errors?.firstName.message)}
                  </p>
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
                  <p className="form-error">
                    {String(errors?.middleName.message)}
                  </p>
                )}
              </label>
              <label className="form-label">
                Surname*
                <input
                  type="text"
                  className={`form-input`}
                  {...register('lastName', {
                    required: 'Last name is required',
                  })}
                />
                {errors?.lastName && (
                  <p className="form-error">
                    {String(errors?.lastName.message)}
                  </p>
                )}
              </label>
              <label className="form-label">
                Phone*
                <input
                  type="number"
                  className={`form-input`}
                  {...register('phone', { valueAsNumber: true })}
                />
                {errors?.phone && (
                  <p className="form-error">{String(errors?.phone.message)}</p>
                )}
              </label>
              <label className="form-label">
                Work Phone
                <input
                  type="number"
                  className={`form-input`}
                  {...register('workPhone', {
                    setValueAs: (value) =>
                      value === '' ? null : Number(value), // Handle empty string
                  })}
                />
                {errors?.workPhone && (
                  <p className="form-error">
                    {String(errors?.workPhone.message)}
                  </p>
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
                    {...register('location.zipCode', {
                      setValueAs: (value) =>
                        value === '' ? null : Number(value), // Handle empty string
                    })}
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
                <div className="flex gap-4 flex-wrap col-span-full justify-center mt-8">
                  <Button
                    onClick={handleSubmit(handleEdit)}
                    type="submit"
                    disabled={isSubmitting}
                    name={isSubmitting ? '' : 'Save Changes'}
                    icon={
                      isSubmitting && (
                        <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
                      )
                    }
                  />
                  <Button
                    bg="transparent"
                    textColor="black"
                    type="button"
                    name="Cancel"
                    onClick={() => setisEditPayment(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {addeNew && (
        <Modal
          onClose={() => {
            setAddNew(false);
          }}
        >
          <AddEmergencyContact
            employeeData={employeeData}
            emergencyContacts={emergencyContacts}
            setAddNew={setAddNew}
          />
        </Modal>
      )}
      {deleteModal && (
        <EmergencyDeleteModal
          onClose={() => {
            setDeleteModal(false);
          }}
          id={paymentId}
          emergencyContacts={emergencyContacts}
        />
      )}
    </>
  );
};

export default EmergencySection;
