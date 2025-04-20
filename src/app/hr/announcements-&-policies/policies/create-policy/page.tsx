'use client';
import CustomTextEditor from '@/components/CustomEditor/CustomTextEditor';
import axiosInstance from '@/lib/axios';
import { publishPolicy } from '@/store/slices/postPolicy';
import { AppDispatch, RootState } from '@/store/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaBox } from 'react-icons/fa';
import { HiOutlineUpload } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import imageLoader from '../../../../../../imageLoader';
import PreviewPolicy from '../components/previewpolicyforcreate';
import SendPolicyModal from '../components/SendPolicyModal';

const CreatePolicy = () => {
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [selectedAttachment, setSelectedAttachment] = useState<File | null>(
    null
  );
  const [attachmentId, setAttachmentId] = useState<string | null>(null);
  // const [myId, setMyId] = useState<string | null>(null);
  const [openPolicyModa, setOpenPolicyMoad] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // // Fetch user data and set myId
  // useEffect(() => {
  //   const fetchMyId = async () => {
  //     if (session?.user?.accessToken) {
  //       try {
  //         const response = await axiosInstance.get('/user/my', {
  //           headers: { Authorization: `Bearer ${session.user.accessToken}` },
  //         });
  //         const userId = response.data.data?.id;
  //         setMyId(userId);
  //         dispatch(setUser(response.data.data));
  //       } catch (error) {
  //         toast.error('Failed to load user data!');
  //       }
  //     } else {
  //       toast.error('Authentication failed. Please try again.');
  //     }
  //   };
  //   fetchMyId();
  // }, [dispatch, session?.user?.accessToken]);

  const user = useSelector((state: RootState) => state.myInfo);

  const myId = user?.user?.employeeId;

  // Initialize form with default values
  const {
    control,
    handleSubmit,
    watch,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: '',
      title: '',
      status: '',
      fileId: fileId,
      uploadBy: myId,
      description: '', // description default value
      effectiveDate: '',
      attachmentId: attachmentId,
    },
  });

  // Watch form fields
  const type = watch('type');
  const title = watch('title');
  const status = watch('status');
  const description = watch('description');
  const effectiveDate = watch('effectiveDate');

  const previewData = {
    type,
    title,
    status,
    fileId,
    previewUrl,
    effectiveDate,
    uploadBy: myId,
    description,
    attachment: selectedAttachment
      ? {
          file: {
            name: selectedAttachment.name,
            url: URL.createObjectURL(selectedAttachment), // Create preview URL
          },
        }
      : null, // Ensure null if no attachment is selected
  };

  // Handle image selection and preview
  const handleFileChange = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (!file.type.startsWith('image/')) {
        toast.error('Only image files are allowed!');
        return;
      }
      setSelectedFile(file);
      const blobUrl = URL.createObjectURL(file);
      setPreviewUrl(blobUrl);
    }
  };

  // Handle image file upload
  const handleUpload = async () => {
    if (!selectedFile) return null;
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axiosInstance.post('/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFileId(response.data.data.id);
      setPreviewUrl(response.data.data.url);
      return response.data.data.id;
    } catch (err) {
      toast.error('Failed to upload image');
      return null;
    }
  };

  // Handle attachment selection
  const handleAttachmentChange = (event) => {
    const file = event.target.files?.[0];
    if (file && !file.type.startsWith('image/')) {
      setSelectedAttachment(file);
    } else {
      toast.error('Please upload non-image files as attachments!');
    }
  };

  // Handle attachment file upload
  const handleAttachmentUpload = async () => {
    if (!selectedAttachment) return null;
    const formData = new FormData();
    formData.append('file', selectedAttachment);
    try {
      const response = await axiosInstance.post('/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAttachmentId(response.data.data.id);
      return response.data.data.id;
    } catch (err) {
      toast.error('Failed to upload attachment');
      return null;
    }
  };

  // Save draft
  const handleSaveDraft = async (data) => {
    try {
      setLoading(true);
      let uploadedFileId = null;
      let uploadedAttachmentId = null;

      if (selectedFile) uploadedFileId = await handleUpload();
      if (selectedAttachment)
        uploadedAttachmentId = await handleAttachmentUpload();

      const payload = {
        ...data,
        fileId: uploadedFileId,
        attachmentId: uploadedAttachmentId,
        status: 'Draft',
        uploadBy: myId,
      };

      await axiosInstance.post('/policy/', payload);
      toast.success('Draft saved successfully!');
    } catch (error) {
      toast.error('Error saving draft');
    } finally {
      setLoading(false);
    }
  };

  // Publish policy
  const handlePublish = async (data) => {
    try {
      setLoading(true);
      let uploadedFileId = null;
      let uploadedAttachmentId = null;

      if (selectedFile) uploadedFileId = await handleUpload();
      if (selectedAttachment)
        uploadedAttachmentId = await handleAttachmentUpload();

      const payload = {
        ...data,
        fileId: uploadedFileId,
        attachmentId: uploadedAttachmentId,
        status: 'Published',
        uploadBy: myId,
      };

      const postedPolicy = await dispatch(publishPolicy(payload)).unwrap();
      if (postedPolicy.id) {
        sessionStorage.setItem('policy', postedPolicy.id.toString());
      }
      return postedPolicy.id;
    } catch (error) {
      toast.error('Error publishing policy');
    } finally {
      setLoading(false);
    }
  };

  // Form submission handlers
  const handlePreviewPost = () => {
    setIsPreview(true);
  };

  const handleCancel = () => {
    reset();
    router.back();
  };

  return (
    <div className='w-full'>
      <div className='flex flex-row items-center justify-between w-full'>
        <h1 className='text-[22px] font-semibold'>Create new policy</h1>
        <div className='flex flex-row items-center gap-2'>
          {isPreview ? (
            <>
              <button
                onClick={() => setOpenPolicyMoad(true)}
                className='px-6 py-2 rounded-lg bg-[#0F172A] text-white text-[16px] flex justify-center disabled:cursor-not-allowed'
                disabled={loading}
              >
                Send
              </button>
              <button
                type='button'
                className='border px-6 py-2 rounded-lg'
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
                className='text-[14px] p-2 bg-black text-white rounded disabled:cursor-not-allowed'
              >
                {loading ? (
                  <BiLoaderCircle className='h-4 w-4 animate-spin mx-auto' />
                ) : (
                  'Save Draft'
                )}
              </button>
              <button
                onClick={handlePreviewPost}
                className='text-[14px] p-2 border rounded'
              >
                Preview Policy
              </button>
              <button onClick={handleCancel} className='text-[14px] p-2'>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      {isPreview ? (
        <PreviewPolicy previewData={previewData} />
      ) : (
        <div className='bg-white rounded-[10px] border p-6 w-full mt-8'>
          <h1 className='flex flex-row items-center gap-2 text-[18px] font-medium'>
            <FaBox /> New Policy
          </h1>
          <form className='w-full mt-8'>
            {/* Policy Title */}
            <div className='flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-8'>
              <label className='flex flex-col gap-1 w-full'>
                <span className='text-[14px] text-gray-400 font-medium'>
                  Policy Title
                </span>
                <input
                  type='text'
                  placeholder='Add a title for policy'
                  className='p-3 w-full border rounded-lg focus:outline-none'
                  {...register('title', {
                    required: 'Policy title is required!',
                  })}
                />
                {errors.title && (
                  <span className='text-red-500 text-xs'>
                    {errors.title?.message}
                  </span>
                )}
              </label>
              {/* Policy Type */}
              <label className='flex flex-col gap-1 w-full'>
                <span className='text-[14px] text-gray-400 font-medium'>
                  Policy Type
                </span>
                <select
                  className='p-3 w-full border rounded-lg focus:outline-none focus:border-gray-300 bg-white text-black'
                  {...register('type', {
                    required: 'Policy type is required!',
                  })}
                >
                  <option value=''>Select a Policy Type</option>
                  <optgroup label='Human Resources'>
                    <option value='employee-benefits'>Employee Benefits</option>
                    <option value='leave-attendance'>
                      Leave and Attendance
                    </option>
                    <option value='code-of-conduct'>Code of Conduct</option>
                    <option value='recruitment-hiring'>
                      Recruitment and Hiring
                    </option>
                    <option value='workplace-harassment'>
                      Workplace Harassment
                    </option>
                  </optgroup>
                  <optgroup label='Information Technology'>
                    <option value='data-security'>Data Security</option>
                    <option value='acceptable-use'>
                      Acceptable Use Policy
                    </option>
                    <option value='byod'>Bring Your Own Device (BYOD)</option>
                    <option value='software-use'>
                      Software Installation and Use
                    </option>
                    <option value='password-management'>
                      Password Management
                    </option>
                  </optgroup>
                  <optgroup label='Finance'>
                    <option value='expense-reimbursement'>
                      Expense Reimbursement
                    </option>
                    <option value='budget-allocation'>Budget Allocation</option>
                    <option value='procurement'>Procurement Policy</option>
                    <option value='financial-reporting'>
                      Financial Reporting
                    </option>
                    <option value='travel-expense'>Travel and Expense</option>
                  </optgroup>
                  <optgroup label='Operations'>
                    <option value='health-safety'>Health and Safety</option>
                    <option value='business-continuity'>
                      Business Continuity
                    </option>
                    <option value='environmental'>Environmental Policy</option>
                    <option value='quality-assurance'>Quality Assurance</option>
                    <option value='vendor-management'>Vendor Management</option>
                  </optgroup>
                  <optgroup label='Compliance and Legal'>
                    <option value='anti-bribery'>
                      Anti-Bribery and Corruption
                    </option>
                    <option value='data-protection'>Data Protection</option>
                    <option value='whistleblower'>Whistleblower Policy</option>
                    <option value='intellectual-property'>
                      Intellectual Property
                    </option>
                  </optgroup>
                  <optgroup label='Other'>
                    <option value='remote-work'>Remote Work Policy</option>
                    <option value='social-media'>Social Media Policy</option>
                    <option value='conflict-of-interest'>
                      Conflict of Interest
                    </option>
                    <option value='performance-review'>
                      Performance Review and Management
                    </option>
                  </optgroup>
                </select>
                {errors.type && (
                  <span className='text-red-500 text-xs'>
                    {errors.type?.message}
                  </span>
                )}
              </label>
              {/* Effective Date */}
              <label className='flex flex-col gap-1 w-full'>
                <span className='text-[14px] text-gray-400 font-medium'>
                  Effective Date
                </span>
                <input
                  type='date'
                  placeholder='Add a title for policy'
                  className='p-3 w-full border rounded-lg focus:outline-none text-gray-400'
                  {...register('effectiveDate', {
                    required: 'Effective is required!',
                  })}
                />
                {errors.effectiveDate && (
                  <span className='text-red-500 text-xs'>
                    {errors.effectiveDate?.message}
                  </span>
                )}
              </label>
            </div>
            <div className='w-full h-[1.5px] bg-gray-300 mt-12 mb-8' />
            {/* Image Upload / Preview */}
            {!previewUrl ? (
              <div>
                <label
                  htmlFor='policyImg'
                  className='cursor-pointer flex flex-col gap-1 text-gray-400 mb-8 max-w-xs'
                >
                  Upload Image (Optional)
                  <div className='px-6 py-3 bg-black rounded-md flex gap-2 items-center justify-between text-white'>
                    Upload Image
                    <HiOutlineUpload />
                  </div>
                  <input
                    onChange={handleFileChange}
                    type='file'
                    accept='image/*'
                    name='fileId'
                    id='policyImg'
                    className='hidden'
                  />
                </label>
              </div>
            ) : (
              <div className='my-4 relative'>
                <button
                  onClick={() => setPreviewUrl(null)}
                  type='button'
                  className='absolute top-2 right-2 px-6 py-1 bg-white rounded-lg text-2xl'
                >
                  x
                </button>
                <Image
                  loader={imageLoader}
                  width={300}
                  height={150}
                  src={previewUrl}
                  alt='Profile Preview'
                  className='w-full mx-auto max-h-[500px] rounded-lg border'
                />
              </div>
            )}

            {!selectedAttachment ? (
              <div>
                <label
                  htmlFor='policyAttachment'
                  className='cursor-pointer flex flex-col gap-1 text-gray-400 mb-8 max-w-xs'
                >
                  Upload Attachment (Optional)
                  <div className='px-6 py-3 bg-black rounded-md flex gap-2 items-center justify-between text-white'>
                    Upload Attachment
                    <HiOutlineUpload />
                  </div>
                  <input
                    onChange={handleAttachmentChange}
                    type='file'
                    accept='.pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt'
                    name='attachmentId'
                    id='policyAttachment'
                    className='hidden'
                  />
                </label>
              </div>
            ) : (
              <div className='my-4 relative'>
                <button
                  onClick={() => setSelectedAttachment(null)}
                  type='button'
                  className='absolute top-2 right-2 px-6 py-1 bg-white rounded-lg text-2xl'
                >
                  x
                </button>
                <p className='text-center text-gray-600'>
                  {selectedAttachment.name}
                </p>
              </div>
            )}

            {/* Policy Description */}
            <h1 className='text-[18px] font-medium'>Policy Description</h1>
            <label className='flex flex-col gap-2 mt-8'>
              <span className='text-[13px] text-gray-400'>Description</span>
              <div onClick={(e) => e.preventDefault()} className=''>
                <Controller
                  name='description'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <CustomTextEditor
                      setContent={field.onChange}
                      body={field.value || ''}
                    />
                  )}
                />
                {errors.description && (
                  <span className='text-red-500 text-xs'>
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

export default CreatePolicy;
