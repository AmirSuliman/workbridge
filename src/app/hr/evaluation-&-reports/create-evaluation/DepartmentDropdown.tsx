import axiosInstance from '@/lib/axios';
import { useEffect, useState } from 'react';
import Select from 'react-select';


interface Department {
  id: string;  
  name: string;
  value?: string;  
  label?: string;  
}

const DepartmentDropdown = ({ departmentId, setValue, errors, onSelect }) => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await axiosInstance.get('/departments');
        const departmentOptions = data.data.items.map((dept) => ({
          value: dept.id, 
          label: dept.name, 
        }));
        
        setDepartments(departmentOptions);

        if (departmentId && departmentId.length) {
          const matchedDepartments = departmentOptions.filter((dept) =>
            departmentId.includes(dept.value)
          );
          setValue('departmentId', departmentId);
          onSelect(departmentId);
        }
      } catch (error) {
        console.error('Error fetching Departments:', error);
      }
    };

    fetchDepartments();
  }, [departmentId, setValue, onSelect]);

  const handleChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setValue('departmentId', selectedIds);
    onSelect(selectedIds);
  };

  return (
    <div>
      <Select
        options={departments}
        value={departments.filter((dept) => departmentId.includes(dept.value))}
        onChange={handleChange}
        isMulti
        className="w-[300px] border rounded"
      />
      {errors.departmentId && (
        <p className="text-red-500 text-sm">{errors.departmentId.message}</p>
      )}
    </div>
  );
};

export default DepartmentDropdown;
