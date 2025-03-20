import Button from '@/components/Button';
import axiosInstance from '@/lib/axios';
import { Department } from '@/types/employee';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import Select from 'react-select';

const PolicyToDepartments = ({ onClose, postPolicy }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      departmentId: [],
    },
  });

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await axiosInstance.get('/departments');
        console.log(data, 'deptres');
        setDepartments(data.data.items);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch departments.');
      }
    };
    fetchDepartments();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (!data.departmentId || data.departmentId.length === 0) {
        toast.error("Please select at least one department.");
        return;
      }
  
      setLoading(true);
      await postPolicy();
  
      console.log(
        'postedPolicyId in modal: ',
        sessionStorage.getItem('policy')
      );
  
      const departmentIds = data.departmentId.map((dept) => dept.value);
  
      const response = await axiosInstance.post(`/policy/send/`, {
        policyId: sessionStorage.getItem('policy'),
        departmentId: departmentIds,
      });
  
      toast.success('Policy sent successfully!');
      setLoading(false);
      onClose();
      router.back();
      console.log('send policy res: ', response.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to send policy.');
      }
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="departmentId"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Select Department
          </label>
          <Controller
            name="departmentId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={
                  departments.map((dept) => ({
                    value: dept.id,
                    label: dept.name,
                  })) as any
                }
                className="mt-1 block w-full"
                isDisabled={loading}
              />
            )}
          />
        </div>

        <div className="flex items-center gap-4 justify-center mt-4 mb-0">
          <Button
            type="submit"
            disabled={loading}
            name={loading ? '' : 'Confirm'}
            icon={
              loading && (
                <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
              )
            }
            className="disabled:cursor-not-allowed"
          />
          <Button
            onClick={onClose}
            bg="transparent"
            textColor="black"
            name="Cancel"
          />
        </div>
      </form>
    </div>
  );
};

export default PolicyToDepartments;
