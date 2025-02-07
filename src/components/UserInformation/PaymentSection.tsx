import { HiMiniBriefcase } from 'react-icons/hi2';
import FormHeading from './FormHeading';
import InfoGrid from './InfoGrid';
import { Label } from '@/app/hr/employees/components/Helpers';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';

interface PaymentProps {
  id: number;
  note: string;
  paymentSchedule: string;
  payType: string;
  employeeId: number;
  overtime: boolean;
  payRate: number;
  effectiveDate: string;
  // createdAt: '2025-02-06T05:46:31.000Z';
}
// /payments/{employeeId}
const PaymentSection = ({ employeeId }) => {
  const [isEditPayment, setisEditPayment] = useState<boolean>(false);
  const [payments, setPayments] = useState<PaymentProps[]>([]);

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
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};
  return (
    <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5">
      <div className="mb-5">
        <FormHeading
          icon={<HiMiniBriefcase className="w-4" />}
          text="Payment"
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
          ]}
          values={
            payments && payments.length > 0
              ? payments.map((payment) => [
                  payment.effectiveDate.split('T')[0] || 'N/A',
                  payment.payRate || 'N/A',
                  payment.paymentSchedule || 'N/A',
                  payment.payType || 'N/A',
                  payment.overtime ? 'Liable' : 'Exempt',
                  payment.note || 'N/A',
                ])
              : [['', '', '', '', '', '']]
          }
        />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <article>
            <Label text="Compensation*" />
            <input
              type="text"
              placeholder="Add annual compensation amount"
              className="form-input"
              {...register('salary', {
                valueAsNumber: true,
              })}
            />
            {errors?.salary && (
              <span className="form-error">
                {errors?.salary.message?.toString()}
              </span>
            )}
          </article>
          <article>
            <Label text="Pay type" />
            <select className="form-input" {...register('payType')}>
              <option value="">Select PayType</option>
              <option value="Salary">Salary</option>
              <option value="Contract">Contract</option>
            </select>
            {errors?.payType && (
              <span className="form-error">
                {errors?.payType.message?.toString()}
              </span>
            )}
          </article>
          <article>
            <Label text="Schedule*" />
            <select className="form-input" {...register('paymentSchedule')}>
              <option value="">Select Schedule</option>
              <option value="Weekly">Weekly</option>
              <option value="Biweekly">Biweekly</option>
              <option value="Once a month">Once a month</option>
            </select>
            {errors?.paymentSchedule && (
              <span className="form-error">
                {errors?.paymentSchedule?.message?.toString()}
              </span>
            )}
          </article>
        </div>
      )}
    </div>
  );
};
export default PaymentSection;
