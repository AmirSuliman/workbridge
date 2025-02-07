import { HiMiniBriefcase } from 'react-icons/hi2';
import FormHeading from './FormHeading';
import InfoGrid from './InfoGrid';
import { Label } from '@/app/hr/employees/components/Helpers';
import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';
import AddPayments from './AddPayments';
import Button from '../Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
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
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { fields, append } = useFieldArray({
    control,
    name: 'editPayment',
  });

  const handleEdit = async (data) => {
    try {
      const response = await axiosInstance.put(`/payment/${paymentId}`, data);
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
              '',
              '',
            ]}
            values={
              payments && payments.length > 0
                ? payments.map((payment) => [
                    payment.effectiveDate.split('T')[0] || '',
                    payment.payRate || '',
                    payment.paymentSchedule || '',
                    payment.payType || '',
                    payment.overtime ? 'Liable' : 'Exempt',
                    payment.note || '',
                    <FaTrash
                      key={payment.id}
                      onClick={(e) => {
                        e.preventDefault();
                        setDeleteModal(true);
                        setAddNew(false);
                        setPaymentId(payment.id);
                      }}
                    />,
                    <FaEdit
                      key={payment.id}
                      onClick={(e) => {
                        e.preventDefault();
                        handleEditClick(payment);
                      }}
                    />,
                  ])
                : [['', '', '', '', '', '', '', '']]
            }
          />
        ) : (
          <div>
            {fields.map((item, index) => (
              <div key={item.id} className="grid grid-cols-3 gap-4">
                <article>
                  <Label text="Pay rate*" />
                  <input
                    type="number"
                    className="form-input"
                    {...register(`editPayment.${index}.payRate`, {
                      required: 'Pay rate is required',
                      valueAsNumber: true,
                    })}
                  />
                  {errors?.payRate && (
                    <span className="form-error">
                      {errors?.payRate.message?.toString()}
                    </span>
                  )}
                </article>
                <article>
                  <Label text="Pay type*" />
                  <select
                    className="form-input"
                    {...register('payType', {
                      required: 'Pay type is required',
                    })}
                  >
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
                  <select
                    className="form-input"
                    {...register('paymentSchedule', {
                      required: 'Payment Schedule is required',
                    })}
                  >
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

                <article>
                  <Label text="Payment note" />
                  <input
                    type="text"
                    className="form-input"
                    {...register('note')}
                  />
                  {errors?.note && (
                    <span className="form-error">
                      {errors?.note.message?.toString()}
                    </span>
                  )}
                </article>
                <article>
                  <Label text="Effective date*" />
                  <input
                    type="date"
                    className="form-input"
                    {...register('effectiveDate', {
                      required: 'Effective date is required',
                    })}
                  />
                  {errors?.effectiveDate && (
                    <span className="form-error">
                      {errors?.effectiveDate.message?.toString()}
                    </span>
                  )}
                </article>
                <article className="my-auto">
                  <label className="flex gap-2">
                    <input
                      type="checkbox"
                      className="appearance-none border-2 border-black checked:bg-black size-4 rounded"
                      {...register('overtime')}
                    />
                    <span className="form-label">Over time?</span>
                  </label>
                  {errors?.overtime && (
                    <span className="form-error">
                      {errors?.overtime.message?.toString()}
                    </span>
                  )}
                </article>
              </div>
            ))}
            <Button
              onClick={handleSubmit(handleEdit)}
              type="submit"
              name="Save Changes"
            />
            <Button
              type="button"
              name="Cancel"
              onClick={() => setisEditPayment(false)}
            />
          </div>
        )}
      </div>
      {!addeNew && !isEditPayment && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            setAddNew(true);
          }}
          name={'Add new payment'}
          icon=""
          className="w-full max-w-xl mx-auto col-span-full mt-4"
        />
      )}
      {addeNew && <AddPayments employeeId={employeeId} setAddNew={setAddNew} />}
      {deleteModal && (
        <PaymentDeleteModal
          onClose={() => {
            setDeleteModal(false);
          }}
          id={paymentId}
        />
      )}
    </>
  );
};

export default PaymentSection;
