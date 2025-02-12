'use client';
import CustomTextEditor from '@/components/CustomEditor/CustomTextEditor';
import axiosInstance from '@/lib/axios';
import Image from 'next/image';
import toast from 'react-hot-toast';

import { getPolicy } from '@/services/getPolicy';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaBox } from 'react-icons/fa';
import { HiOutlineUpload } from 'react-icons/hi';
import PreviewPolicy from '../components/PreviewPolicy';
import axios from 'axios';
import SendPolicyModal from '../components/SendPolicyModal';
import { setUser } from '@/store/slices/myInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { useSession } from 'next-auth/react';
import { Policy } from '@/types/policy';

const Addnewpolicies = () => {
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [fileId, setFileId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openPolicyModa, setOpenPolicyMoad] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const dispatch = useDispatch<AppDispatch>();
  useSelector((state: RootState) => state.myInfo);
  const [myId, setMyId] = useState(null);

  const [policyData, setPolicyData] = useState<Policy>({
    id: null,
    type: '',
    title: '',
    status: '',
    fileId: null,
    previewUrl: null,
    description: '',
    effectiveDate: '',
    uploadBy: myId,
    totalEmployees: 0,
    employeeAccepted: 0,
    users: {
      firstName: '',
      lastName: '',
    },
  });

  const { data: session } = useSession();

  useEffect(() => {
    const fetchMyId = async () => {
      if (session?.user?.accessToken) {
        try {
          const response = await axiosInstance.get('/user/my', {
            headers: { Authorization: `Bearer ${session.user.accessToken}` },
          });
          const userId = response.data.data?.employeeId;
          setMyId(userId); // Save it locally
          dispatch(setUser(response.data.data)); // Update Redux as well
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error('Failed to load user data!');
        }
      } else {
        toast.error('Authentication failed. Please try again.');
      }
    };
    fetchMyId();
  }, [dispatch, session?.user?.accessToken]);

  useEffect(() => {
    const fetchPolicie = async () => {
      try {
        const response = await getPolicy(id);
        setPolicyData(response.data.data || {});
        console.log('policy res: ', response.data.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch policy.');
      }
    };

    fetchPolicie();
  }, []);

  const previewData = {
    type: policyData?.type || '',
    title: policyData?.title || '',
    status: policyData?.status || '',
    fileId: policyData?.fileId || fileId,
    previewUrl: policyData?.previewUrl || previewUrl,
    description: policyData?.description || '',
    effectiveDate: policyData?.effectiveDate
      ? new Date(policyData?.effectiveDate).toISOString().split('T')[0]
      : '',
  };

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: previewData,
  });

  useEffect(() => {
    if (policyData) {
      reset(previewData);
    }
  }, [reset, policyData]);

  const handleFileChange = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        return toast.error('Only JPEG and PNG files are allowed!');
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile || '');

    try {
      const response = await axiosInstance.post('/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const uploadedFileId = response.data.data.id;
      setFileId(uploadedFileId);
      setPreviewUrl(response.data.data.url);
      console.log('img upload: ', response.data);
      return uploadedFileId;
    } catch (err) {
      console.error('File upload failed:', err);
      toast.error('File upload failed. Please try again.');
      return null;
    }
  };
  const handleSaveDraft = async (data) => {
    try {
      setLoading(true);
      const uploadedFileId = await handleUpload();
      const payload = {
        ...data,
        fileId: uploadedFileId,
        status: 'Draft',
      };
      const response = await axiosInstance.put(`/policy/${id}`, payload);
      console.log('put policy res: ', response.data);
      toast.success('Draft saved successfully!');
      router.back();
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('An error occurred while saving the draft.');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (data) => {
    let uploadedFileId = null;
    try {
      setLoading(true);
      if (previewUrl && selectedFile) {
        uploadedFileId = await handleUpload();
      }
      const payload = {
        ...data,
        status: 'Published',
        uploadBy: myId,
        fileId: uploadedFileId,
      };
      const response = await axiosInstance.put(`/policy/${id}`, payload);
      console.log('put policy res: ', response.data);
      if (id) {
        sessionStorage.setItem('policy', id);
      }

      toast.success('Policy published successfully!');
      reset();
      return response.data.id;
    } catch (error) {
      console.error('Error publishing policy:', error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewPost = () => {
    setIsPreview(true);
  };
  const handleCancel = () => {
    reset();
    router.back();
  };

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-[22px] font-semibold">Create new policy</h1>
        <div className="flex flex-row items-center gap-2">
          {isPreview ? (
            <>
              <button
                onClick={() => setOpenPolicyMoad(true)}
                className="px-6 py-2 rounded-lg bg-[#0F172A] text-white text-[16px] flex justify-center disabled:cursor-not-allowed"
                disabled={loading}
              >
                Send
              </button>
              <button
                type="button"
                className="border px-6 py-2 rounded-lg"
                onClick={() => setIsPreview(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSubmit(handleSaveDraft)}
                disabled={loading}
                className="text-[14px] p-2 bg-black text-white rounded disabled:cursor-not-allowed"
              >
                {loading ? (
                  <BiLoaderCircle className="h-4 w-4 animate-spin mx-auto" />
                ) : (
                  'Save Draft'
                )}
              </button>
              <button
                onClick={handlePreviewPost}
                className="text-[14px] p-2 border rounded"
              >
                Preview Policy
              </button>
              <button onClick={handleCancel} className="text-[14px] p-2 ">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      {isPreview ? (
        <PreviewPolicy previewData={previewData} />
      ) : (
        <div className="bg-white rounded-[10px] border p-6 w-full mt-8">
          <h1 className="flex flex-row items-center gap-2 text-[18px] font-medium">
            <FaBox /> New Policy
          </h1>

          <form className="w-full mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-8">
              <label className="flex flex-col gap-1 w-full">
                <span className="text-[14px] text-gray-400 font-medium">
                  Policy Title
                </span>
                <input
                  type="text"
                  placeholder="Add a title for policy"
                  className="p-3 w-full border rounded-lg focus:outline-none"
                  {...register('title', {
                    required: 'Policy titile is required!',
                  })}
                />
                {errors.title && (
                  <span className="text-red-500 text-xs">
                    {errors.title?.message}
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-1 w-full">
                <span className="text-[14px] text-gray-400 font-medium">
                  Policy Type
                </span>
                <select
                  className="p-3 w-full border rounded-lg focus:outline-none focus:border-gray-300 bg-white text-black"
                  {...register('type', {
                    required: 'Policy type is required!',
                  })}
                >
                  <option value="">Select a Policy Type</option>
                  <optgroup label="Human Resources">
                    <option value="employee-benefits">Employee Benefits</option>
                    <option value="leave-attendance">
                      Leave and Attendance
                    </option>
                    <option value="code-of-conduct">Code of Conduct</option>
                    <option value="recruitment-hiring">
                      Recruitment and Hiring
                    </option>
                    <option value="workplace-harassment">
                      Workplace Harassment
                    </option>
                  </optgroup>
                  <optgroup label="Information Technology">
                    <option value="data-security">Data Security</option>
                    <option value="acceptable-use">
                      Acceptable Use Policy
                    </option>
                    <option value="byod">Bring Your Own Device (BYOD)</option>
                    <option value="software-use">
                      Software Installation and Use
                    </option>
                    <option value="password-management">
                      Password Management
                    </option>
                  </optgroup>
                  <optgroup label="Finance">
                    <option value="expense-reimbursement">
                      Expense Reimbursement
                    </option>
                    <option value="budget-allocation">Budget Allocation</option>
                    <option value="procurement">Procurement Policy</option>
                    <option value="financial-reporting">
                      Financial Reporting
                    </option>
                    <option value="travel-expense">Travel and Expense</option>
                  </optgroup>
                  <optgroup label="Operations">
                    <option value="health-safety">Health and Safety</option>
                    <option value="business-continuity">
                      Business Continuity
                    </option>
                    <option value="environmental">Environmental Policy</option>
                    <option value="quality-assurance">Quality Assurance</option>
                    <option value="vendor-management">Vendor Management</option>
                  </optgroup>
                  <optgroup label="Compliance and Legal">
                    <option value="anti-bribery">
                      Anti-Bribery and Corruption
                    </option>
                    <option value="data-protection">Data Protection</option>
                    <option value="whistleblower">Whistleblower Policy</option>
                    <option value="intellectual-property">
                      Intellectual Property
                    </option>
                  </optgroup>
                  <optgroup label="Other">
                    <option value="remote-work">Remote Work Policy</option>
                    <option value="social-media">Social Media Policy</option>
                    <option value="conflict-of-interest">
                      Conflict of Interest
                    </option>
                    <option value="performance-review">
                      Performance Review and Management
                    </option>
                  </optgroup>
                </select>

                {errors.type && (
                  <span className="text-red-500 text-xs">
                    {errors.type?.message}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1 w-full">
                <span className="text-[14px] text-gray-400 font-medium">
                  Effective Date
                </span>
                <input
                  type="date"
                  placeholder="Add a title for policy"
                  className="p-3 w-full border rounded-lg focus:outline-none"
                  {...register('effectiveDate', {
                    required: 'Effective is required!',
                  })}
                />
                {errors.effectiveDate && (
                  <span className="text-red-500 text-xs">
                    {errors.effectiveDate?.message}
                  </span>
                )}
              </label>
            </div>
            <div className="w-full h-[1.5px] bg-gray-300 mt-12 mb-8 " />
            {!previewUrl ? (
              <div>
                <label
                  htmlFor="policyImg"
                  className="cursor-pointer flex flex-col gap-1 text-gray-400 mb-8 max-w-xs"
                >
                  Upload image (Optional)
                  <div className="px-6 py-3 bg-black rounded-md flex gap-2 items-center justify-between  text-white">
                    Upload Image
                    <HiOutlineUpload />
                  </div>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    accept="image/*"
                    name="fileId"
                    id="policyImg"
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="my-4 relative">
                <button
                  onClick={() => setPreviewUrl(null)}
                  type="button"
                  className="absolute top-2 right-2 px-6 py-1 bg-white rounded-lg text-2xl"
                >
                  x
                </button>
                <Image
                  width={300}
                  height={150}
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-full mx-auto max-h-[500px] rounded-lg border"
                />
              </div>
            )}
            <h1 className="text-[18px] font-medium">Policy Description</h1>
            <label className="flex flex-col gap-2 mt-8">
              <span className=" text-[13px] text-gray-400">Description</span>
              <div
                onClick={(e) => e.preventDefault()}
                className="border rounded "
              >
                <Controller
                  name="description"
                  control={control}
                  defaultValue={policyData?.description}
                  render={({ field }) => (
                    <CustomTextEditor
                      setContent={(value) => field.onChange(value)}
                      body={field.value || policyData?.description}
                    />
                  )}
                />
                {errors.description && (
                  <span className="text-red-500 text-xs">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </label>
          </form>
        </div>
      )}
      {openPolicyModa && (
        <SendPolicyModal
          postPolicy={handleSubmit(handlePublish)}
          onClose={() => setOpenPolicyMoad(false)}
        />
      )}
    </div>
  );
};

export default Addnewpolicies;
