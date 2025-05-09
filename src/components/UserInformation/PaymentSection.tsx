import { Label } from '@/app/hr/employees/components/Helpers';
import axiosInstance from '@/lib/axios';
import { RootState } from '@/store/store';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { HiMiniBriefcase } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import Button from '../Button';
import AddPayments from './AddPayments';
import FormHeading from './FormHeading';
import InfoGrid from './InfoGrid';
import PaymentDeleteModal from './PaymentDeleteModal';

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

const PaymentSection = ({ employeeId }) => {
  const [isEditPayment, setisEditPayment] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [addeNew, setAddNew] = useState(false);
  const [payments, setPayments] = useState<PaymentProps[]>([]);
  const [currentPayment, setCurrentPayment] = useState<PaymentProps | null>(
    null
  );
  const user = useSelector((state: RootState) => state.myInfo);
  const role = user?.user?.role;

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosInstance.get(`/payments/${employeeId}`);
        console.log('payments res: ', response.data.data.items);
        setPayments(response.data.data.items);
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
  }, [employeeId]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleEdit = async (data) => {
    const payload = {
      employeeId: employeeId,
      paymentSchedule: data.paymentSchedule,
      note: data.note,
      overtime: data.overtime,
      payType: data.payType,
      payRate: data.payRate,
      effectiveDate: data.effectiveDate,
    };
    try {
      const response = await axiosInstance.put(
        `/payment/${paymentId}`,
        payload
      );
      console.log('put response: ', response.data);
      toast.success('Payment updated successfully.');

      // Update the local state
      const updatedPayments = payments.map((payment) =>
        payment.id === paymentId ? { ...payment, ...data } : payment
      );
      setPayments(updatedPayments);

      setisEditPayment(false);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Cannot update payment.');
      }
      console.log(error);
    }
  };

  const handleEditClick = (payment) => {
    setisEditPayment(true);
    setPaymentId(payment.id);
    setCurrentPayment(payment);

    // Pre-fill the form with existing data
    setValue('payRate', payment.payRate);
    setValue('payType', payment.payType);
    setValue('paymentSchedule', payment.paymentSchedule);
    setValue('note', payment.note);
    setValue('effectiveDate', payment.effectiveDate.split('T')[0]);
    setValue('overtime', payment.overtime);
  };

  return (
    <>
      <div className='p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5'>
        <div className='mb-5'>
          <FormHeading
            icon={<HiMiniBriefcase className='w-4' />}
            text='Payment'
          />
        </div>

        {!isEditPayment ? (
          <InfoGrid
            cols={6}
            headers={[
              'Effective Date',
              'Payrate',
              'Schedule',
              'Pay Type',
              'Overtime',
              'Note',
              '',
              '',
            ]}
            values={
              payments && payments.length > 0
                ? payments.map((payment) => [
                    payment.effectiveDate
                      ? payment.effectiveDate.split('T')[0]
                      : '',
                    payment.payRate || '',
                    payment.paymentSchedule || '',
                    payment.payType || '',
                    payment.overtime ? 'Liable' : 'Exempt',
                    payment.note || '',
                    !isUserPanel && (
                      <FaTrash
                        className='cursor-pointer'
                        key={payment.id}
                        onClick={(e) => {
                          e.preventDefault();
                          setDeleteModal(true);
                          setAddNew(false);
                          setPaymentId(payment.id);
                        }}
                      />
                    ),
                    !isUserPanel && (
                      <FaEdit
                        className='cursor-pointer'
                        key={payment.id}
                        onClick={(e) => {
                          e.preventDefault();
                          handleEditClick(payment);
                        }}
                      />
                    ),
                  ])
                : [['', '', '', '', '', '', '', '']]
            }
          />
        ) : (
          <div>
            <div className='grid grid-cols-3 gap-4'>
              <article>
                <Label text='Pay rate*' />
                <input
                  type='number'
                  className='form-input'
                  {...register(`payRate`, {
                    required: 'Pay rate is required',
                    valueAsNumber: true,
                  })}
                />
                {errors?.payRate && (
                  <span className='form-error'>
                    {errors?.payRate.message?.toString()}
                  </span>
                )}
              </article>
              <article>
                <Label text='Pay type*' />
                <select
                  className='form-input'
                  {...register('payType', {
                    required: 'Pay type is required',
                  })}
                >
                  <option value=''>Select PayType</option>
                  <option value='Salary'>Salary</option>
                  <option value='Contract'>Contract</option>
                  <option value='Bonus'>Bonus</option>
                </select>
                {errors?.payType && (
                  <span className='form-error'>
                    {errors?.payType.message?.toString()}
                  </span>
                )}
              </article>
              <article>
                <Label text='Schedule*' />
                <select
                  className='form-input'
                  {...register('paymentSchedule', {
                    required: 'Payment Schedule is required',
                  })}
                >
                  <option value=''>Select Schedule</option>
                  <option value='Weekly'>Weekly</option>
                  <option value='Biweekly'>Biweekly</option>
                  <option value='Once a month'>Once a month</option>
                </select>
                {errors?.paymentSchedule && (
                  <span className='form-error'>
                    {errors?.paymentSchedule?.message?.toString()}
                  </span>
                )}
              </article>

              <article>
                <Label text='Payment note' />
                <input
                  type='text'
                  className='form-input'
                  {...register('note')}
                />
                {errors?.note && (
                  <span className='form-error'>
                    {errors?.note.message?.toString()}
                  </span>
                )}
              </article>
              <article>
                <Label text='Effective date*' />
                <input
                  type='date'
                  className='form-input'
                  {...register('effectiveDate', {
                    required: 'Effective date is required',
                  })}
                />
                {errors?.effectiveDate && (
                  <span className='form-error'>
                    {errors?.effectiveDate.message?.toString()}
                  </span>
                )}
              </article>
              <article className='my-auto'>
                <label className='flex gap-2'>
                  <input
                    type='checkbox'
                    className='appearance-none border-2 border-black checked:bg-black size-4 rounded'
                    {...register('overtime')}
                  />
                  <span className='form-label'>Over time?</span>
                </label>
                {errors?.overtime && (
                  <span className='form-error'>
                    {errors?.overtime.message?.toString()}
                  </span>
                )}
              </article>
              <div className='flex gap-4 flex-wrap col-span-full justify-center mt-8'>
                <Button
                  onClick={handleSubmit(handleEdit)}
                  type='submit'
                  disabled={isSubmitting}
                  name={isSubmitting ? '' : 'Save Changes'}
                  icon={
                    isSubmitting && (
                      <BiLoaderCircle className='h-5 w-5 duration-100 animate-spin' />
                    )
                  }
                />
                <Button
                  bg='transparent'
                  textColor='black'
                  type='button'
                  name='Cancel'
                  onClick={() => setisEditPayment(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {!isUserPanel && !addeNew && !isEditPayment && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            setAddNew(true);
          }}
          name={'Add new payment'}
          icon=''
          className='w-full max-w-xl mx-auto col-span-full mt-4'
        />
      )}
      {!isUserPanel && addeNew && (
        <AddPayments
          setPayments={setPayments}
          employeeId={employeeId}
          setAddNew={setAddNew}
        />
      )}
      {!isUserPanel && deleteModal && (
        <PaymentDeleteModal
          onClose={() => {
            setDeleteModal(false);
          }}
          id={paymentId}
          setPayments={setPayments}
          payments={payments}
        />
      )}
    </>
  );
};

export default PaymentSection;
