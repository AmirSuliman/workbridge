import { Label } from '@/app/hr/employees/components/Helpers';
import axiosInstance from '@/lib/axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from '../Button';
import { BiLoaderCircle } from 'react-icons/bi';

const AddPayments = ({ employeeId, setPayments, setAddNew }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
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
      const response = await axiosInstance.post('/payment', payload);
      toast.success('Payment added successfully!');
      setAddNew(false);
      setPayments((prevPayments) => [...prevPayments, response.data.data]);
    } catch (error) {
      toast.error(
        (error as any).response?.data?.message || 'Cannot add Payment'
      );
    }
  };
  return (
    <>
      <div className='grid grid-cols-3 gap-4 p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white'>
        <article>
          <Label text='Pay rate*' />
          <input
            type='number'
            // placeholder="Add annual compensation amount"
            className='form-input'
            {...register('payRate', {
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
          <input type='text' className='form-input' {...register('note')} />
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
      </div>
      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        name={isSubmitting ? '' : 'Save payment'}
        icon={
          isSubmitting && (
            <BiLoaderCircle className='h-5 w-5 duration-100 animate-spin' />
          )
        }
        className='w-full max-w-xl mx-auto col-span-full mt-4'
      />
    </>
  );
};
export default AddPayments;
