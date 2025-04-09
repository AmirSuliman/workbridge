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
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      departmentId: [],
    },
  });

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await axiosInstance.get('/departments');
        setDepartments(data.data.items);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch departments.');
      } finally {
        setLoadingDepartments(false);
      }
    };
    fetchDepartments();
  }, []);

  const departmentOptions = departments.map((dept) => ({
    value: dept.id,
    label: dept.name,
  }));

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setValue('departmentId', departmentOptions);
    } else {
      setValue('departmentId', []);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!data.departmentId || data.departmentId.length === 0) {
        toast.error("Please select at least one department.");
        return;
      }

      setLoading(true);
      await postPolicy();

      const departmentIds = data.departmentId.map((dept) => dept.value);

      const response = await axiosInstance.post(`/policy/send/`, {
        policyId: sessionStorage.getItem('policy'),
        departmentId: departmentIds,
      });

      toast.success('Policy sent successfully!');
      setLoading(false);
      onClose();
      router.back();
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
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Select Department
          </label>

          {loadingDepartments ? (
            <div className="flex justify-center my-4">
              <BiLoaderCircle className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : (
            <>
              {departments.length > 0 && (
                <>
                  <label className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700 font-semibold">Select All</span>
                  </label>

                  <Controller
                    name="departmentId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={departmentOptions}
                        className="mt-1 block w-full"
                        isDisabled={loading}
                        onChange={(selectedOptions) => {
                          field.onChange(selectedOptions);
                          setSelectAll(
                            selectedOptions.length === departmentOptions.length
                          );
                        }}
                      />
                    )}
                  />
                </>
              )}
            </>
          )}
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
