'use client';
import Button from '@/components/Button';
import Modal from '@/components/modal/Modal';
import { API_ROUTES } from '@/constants/apiRoutes';
import axiosInstance from '@/lib/axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { JobFormFields, JobListing, JobPreviewData } from '@/types/job';
import { Department, EmployeeData, question } from '@/types/employee';
import { getAllEmployees } from '@/services/getAllEmployees';
import JobPreview from '../../../create-job/JobPreview';
import imageLoader from '../../../../../../../imageLoader';

const Createjobopening = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [jobPreviewData, setJobPreviewData] = useState<
    JobPreviewData | undefined
  >(undefined);
  const [jobStatus, setJobStatus] = useState<'Draft' | 'Published' | ''>('');
  const [question, setQuestion] = useState({
    title: '',
    required: false,
    id: 0,
  });
  const [questions, setQuestions] = useState<question[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const handleToggleQuestion = () => {
    setIsRequired(!isRequired);
    setQuestion({ ...question, required: !question.required });
  };
  const addQuestionHandler = () => {
    setQuestions([...questions, { ...question, id: Date.now() }]);
    setIsRequired(false);
    setQuestion({ title: '', required: false, id: 0 });
  };
  // this will remove question from array
  const removeQuestion = (index: number) => {
    const remainingQuestions = questions.filter(
      (question) => question.id !== index
    );
    setQuestions(remainingQuestions);
  };
  const toggleRequired = (id: number) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id == id) {
        return { ...question, required: !question.required };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };
  // Fetch departments
  // useEffect(() => {
  //   const getAllDepartments = async () => {
  //     try {
  //       const {
  //         data: {
  //           data: { items },
  //         },
  //       } = await axiosInstance.get(API_ROUTES.GET_DEPARTMENTS);
  //       setDepartments(items);
  //     } catch (error) {
  //       toast.error('Failed to load all departments');
  //       console.log(error);
  //     }
  //   };
  //   getAllDepartments();
  // }, []);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await getAllEmployees(1, 1000);
        setEmployees(data.items);
      } catch (error) {
        console.error('Error fetching employees: ', error);
      }
    };
    const fetchDepartments = async () => {
      try {
        const { data } = await axiosInstance.get('/departments');
        setDepartments(data.data.items);
      } catch (error) {
        console.error('Error fetching Departments: ', error);
      }
    };
    fetchDepartments();
    fetchEmployees();
  }, []);

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<JobFormFields>();
  const formValues = watch();

  const [toggleStates, setToggleStates] = useState({
    Resume: false,
    Address: false,
    CoverLetter: false,
    Portfolio: false,
    DesiredSalary: false,
    Education: false,
    LinkedinProfile: false,
    Referral: false,
    Website: false,
  });

  const handleToggle = (name: string) => {
    setToggleStates((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const requirements = Object.keys(toggleStates)
      .filter((key) => data[key])
      .map((key) => ({
        name: key,
        required: toggleStates[key],
      }));
    const location = {
      street1: data.location.street1,
      street2: data.location.street2,
      zipCode: data.location.zipCode,
      city: data.location.city,
      country: data.location.country,
      state: data.location.state,
    };

    const shareWebsites = [
      'linkedin',
      'glassdoor',
      'indeed',
      'companyWebsite',
    ].filter((key) => data[key]);

    let jobData = {};
    [
      'tittle',
      'description',
      'departmentId',
      'salary',
      'employmentType',
      'hiringLeadId',
      'reportingToEmployeeId',
      'minYearsExperience',
    ].forEach((item) => {
      jobData[item] = [
        'departmentId',
        'salary',
        'hiringLeadId',
        'reportingToEmployeeId',
        'minYearsExperience',
      ].includes(item)
        ? Number(data[item] || 0)
        : data[item] || '';
    });

    jobData = {
      ...jobData,
      requirements,
      location,
      shareWebsites,
      questions: questions.map((question) => ({
        question: question.title,
        required: question.required,
      })),
      status: jobStatus, // Dynamically set status
    };

    try {
      await axiosInstance.post(API_ROUTES.PUT_JOB, jobData);
      toast.success(
        jobStatus === 'Published'
          ? 'Job updated successfully'
          : 'Job saved as draft successfully'
      );
      router.push('/hr/hiring');
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(
        jobStatus === 'Published'
          ? 'Failed to publish job'
          : 'Failed to save draft'
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  });

  const handlePreview = () => {
    const data = formValues;

    const requirements = Object.keys(toggleStates)
      .filter((key) => data[key])
      .map((key) => ({
        name: key,
        required: toggleStates[key],
      }));

    const location = {
      street1: data.location.street1,
      street2: data.location.street2,
      zipCode: data.location.zipCode,
      city: data.location.city,
      country: data.location.country,
      state: data.location.state,
    };

    const shareWebsites = [
      'linkedin',
      'glassdoor',
      'indeed',
      'companyWebsite',
    ].filter((key) => data[key]);

    const previewData = {
      tittle: data.tittle || '',
      description: data.description || '',
      department:
        departments.find((d) => d.id === Number(data.departmentId))?.name || '',
      salary: Number(data.salary || 0),
      employmentType: data.employmentType || '',
      hiringLead:
        employees.find((h) => h.id === Number(data.hiringLeadId))?.firstName ||
        '',
      reportingTo:
        employees.find((r) => r.id === Number(data.reportingToEmployeeId))
          ?.firstName || '',
      minYearsExperience: Number(data.minYearsExperience || 0),
      requirements,
      location,
      shareWebsites,
      questions: questions.map((question) => ({
        question: question.title,
        required: question.required,
      })),
    };

    setJobPreviewData(previewData);
    openModal();
  };

  // Button Handlers
  const handlePublish = () => setJobStatus('Published');
  const { jobId } = useParams();
  const [singleJobData, setSingleJobData] = useState<JobListing | undefined>();

  useEffect(() => {
    const fetchSingleJob = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`openPosition/${jobId}`, {
          params: {
            associations: true,
          },
        });
        setSingleJobData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchSingleJob();
  }, [jobId]);

  return (
    <main className=''>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {jobPreviewData && <JobPreview jobData={jobPreviewData} />}
        </Modal>
      )}
      <form
        onSubmit={onSubmit}
        className='flex flex-row items-start sm:items-center justify-between mb-4'
      >
        <div className='flex flex-row gap-2 text-[#0F172A] items-center text-[22px]'>
          <FaEdit />
          <p className='font-semibold'>Add Job Opening</p>
        </div>

        <div className='flex flex-col sm:flex-row items-center gap-1 sm:gap-3'>
          <div onClick={handlePublish} className='w-fit h-fit mx-auto'>
            <Button
              type='submit'
              name={loading ? '' : 'Update job'}
              className=''
              icon={
                jobStatus === 'Published' && loading ? (
                  <BiLoaderCircle className='h-5 w-5 duration-100 animate-spin' />
                ) : (
                  ''
                )
              }
            ></Button>
          </div>
          <button
            type='button'
            className='bg-white p-2 px-3 rounded-lg border'
            onClick={handlePreview}
          >
            Preview Job
          </button>
          <button
            type='reset'
            onClick={() => {
              router.back();
            }}
            className=' p-2  '
          >
            Cancel
          </button>
        </div>
      </form>

      <div>
        <div className='bg-white rounded-lg border'>
          <div className=' w-ful p-8'>
            <div className='flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium '>
              <Image
                loader={imageLoader}
                src='/jobicon.png'
                alt='img'
                className='w-5'
                width={300}
                height={150}
              />
              Job Information
            </div>
            <div className='flex mt-8 flex-col sm:flex-row sm:gap-4 gap-2 items-center justify-between w-full'>
              <label className='flex flex-col mb-4 sm:w-1/3 w-full'>
                <span className='text-[14px] text-gray-400'>Job Title*</span>
                <input
                  type='text'
                  placeholder='Add job title'
                  className='p-3 border rounded-lg w-full'
                  {...register('tittle', { required: 'Job title is required' })}
                  defaultValue={singleJobData?.data.tittle}
                />
                {errors.tittle && (
                  <span className='text-red-500'>{errors.tittle.message}</span>
                )}
              </label>

              <label className='flex flex-col mb-4 sm:w-1/3 w-full'>
                <span className='text-[14px] text-gray-400'>Department*</span>
                <select
                  className='p-3 border rounded-lg w-full text-gray-400'
                  {...register('departmentId', {
                    required: 'Department is required',
                  })}
                >
                  <option value='' className='text-gray-400'>
                    Select a Department
                  </option>

                  {departments?.map((department) => (
                    <option
                      defaultValue={singleJobData?.data.departmentId}
                      value={department?.id}
                      key={department.id}
                      className='text-gray-400'
                    >
                      {department?.name}
                    </option>
                  ))}
                </select>
                {errors.departmentId && (
                  <span className='text-red-500'>
                    {errors.departmentId.message}
                  </span>
                )}
              </label>
              <label className='flex flex-col mb-4 sm:w-1/3 w-full'>
                <span className='text-[14px] text-gray-400'>
                  Employment Type*
                </span>
                <select
                  className='p-3 border rounded-lg w-full text-gray-400'
                  {...register('employmentType', {
                    required: 'Employment type is required',
                  })}
                >
                  <option value='' className='text-gray-400'>
                    Select employment type
                  </option>
                  <option value='Fulltime' className='text-gray-400'>
                    Full time
                  </option>
                  <option value='Part Time'>Part-Time</option>
                  <option value='Freelance'>Freelance</option>
                </select>
                {errors.employmentType && (
                  <span className='text-red-500'>
                    {errors.employmentType.message}
                  </span>
                )}
              </label>
            </div>

            <div className='flex flex-col mt-4 sm:flex-row sm:gap-4 gap-2 items-center justify-between w-full'>
              <label className='flex flex-col mb-4 sm:w-1/3 w-full'>
                <span className='text-[14px] text-gray-400'>Hiring Lead*</span>
                <select
                  className='p-3 border rounded-lg w-full text-gray-400'
                  {...register('hiringLeadId', {
                    required: 'Hiring lead required',
                  })}
                >
                  <option value='' className='text-gray-400'>
                    Select hiring leads
                  </option>
                  {employees.map((lead) => (
                    <option
                      key={lead.id}
                      value={lead.id}
                      className='text-gray-400'
                    >
                      {lead.firstName} {lead.lastName}
                    </option>
                  ))}
                </select>
                {errors.hiringLeadId && (
                  <span className='text-red-500'>
                    {errors.hiringLeadId.message}
                  </span>
                )}
              </label>

              <label className='flex flex-col mb-4 sm:w-1/3 w-full'>
                <span className='text-[14px] text-gray-400'>
                  Reporting Manager*
                </span>
                <select
                  className='p-3 border rounded-lg w-full text-gray-400'
                  {...register('reportingToEmployeeId', {
                    required: 'Reporting manager is required',
                  })}
                >
                  <option value='' className='text-gray-400'>
                    Select a reporting manager
                  </option>
                  {employees.map((manager) => (
                    <option key={manager.id} value={manager.id}>
                      {manager.firstName} {manager.lastName}
                    </option>
                  ))}
                </select>
                {errors.reportingToEmployeeId && (
                  <span className='text-red-500'>
                    {errors.reportingToEmployeeId.message}
                  </span>
                )}
              </label>
              <label className='flex flex-col mb-4 sm:w-1/3 w-full'>
                <span className='text-[14px] text-gray-400'>
                  Minimum Experience
                </span>
                <input
                  type='text'
                  placeholder='Add minimum years of experience'
                  className='p-3 border rounded-lg w-full'
                  {...register('minYearsExperience', {
                    required: 'Experience is required',
                  })}
                  defaultValue={singleJobData?.data.minYearsExperience}
                />
                {errors.minYearsExperience && (
                  <span className='text-red-500'>
                    {errors.minYearsExperience.message}
                  </span>
                )}
              </label>
            </div>
          </div>
          <div className='w-full h-[0.7px] bg-gray-200 ' />
          <div className='p-8'>
            <div className='flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium '>
              <Image
                loader={imageLoader}
                src='/jobdescription.png'
                alt='img'
                className='w-5'
                width={300}
                height={150}
              />
              Job Description
            </div>
            <label className='flex flex-col mb-4  w-full mt-8'>
              <span className='text-[14px] text-gray-400 mb-2'>
                Description*
              </span>
              <textarea
                placeholder='Write job description'
                className='p-3 border rounded-lg w-full'
                {...register('description', {
                  required: 'Description is required',
                })}
                defaultValue={singleJobData?.data.description}
              />
              {errors.description && (
                <span className='text-red-500'>
                  {errors.description.message}
                </span>
              )}
            </label>
          </div>
          <div className='w-full h-[0.7px] bg-gray-200 ' />

          <div className=' w-ful p-8'>
            <div className='flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium '>
              <Image
                loader={imageLoader}
                src='/loctaion.png'
                alt='img'
                className='w-5'
                width={300}
                height={150}
              />
              Location
            </div>
            <div className='flex mt-8 flex-col sm:flex-row sm:gap-4 gap-2 items-center justify-between w-full'>
              {/* First Input */}
              <label className='flex flex-col mb-4 sm:w-1/3 w-full'>
                <span className='text-[14px] text-gray-400'>Street 1</span>
                <input
                  type='text'
                  placeholder='Add street'
                  className='p-3 border rounded-lg w-full'
                  {...register('location.street1')}
                  defaultValue={singleJobData?.data.location.street1}
                />
                {errors?.location && errors?.location?.street1 && (
                  <p className='form-error'>
                    {errors?.location?.street1.message}
                  </p>
                )}
              </label>
              <label className='flex flex-col mb-4 sm:w-1/3 w-full'>
                <span className='text-[14px] text-gray-400'>Street 2</span>
                <input
                  type='text'
                  placeholder='Add street'
                  className='p-3 border rounded-lg w-full'
                  {...register('location.street2')}
                  defaultValue={singleJobData?.data.location.street2}
                />
                {errors?.location && errors?.location?.street2 && (
                  <p className='form-error'>
                    {errors?.location?.street2.message}
                  </p>
                )}
              </label>
              <label className='flex flex-col mb-4 sm:w-1/3 w-full'>
                <span className='text-[14px] text-gray-400'>Zip</span>
                <input
                  type='text'
                  placeholder='Add Zip'
                  className='p-3 border rounded-lg w-full'
                  {...register('location.zipCode', { valueAsNumber: true })}
                  defaultValue={singleJobData?.data.location.zipCode}
                />
                {errors?.location?.zipCode && (
                  <p className='form-error'>
                    {errors?.location?.zipCode.message}
                  </p>
                )}
              </label>
            </div>

            <div className='flex flex-col mt-4 sm:flex-row sm:gap-4 gap-2 items-center justify-between w-full'>
              <label className='flex flex-col mb-4 sm:w-1/3 w-full'>
                <span className='text-[14px] text-gray-400'>Country</span>
                <input
                  type='text'
                  placeholder='Add country'
                  className='p-3 border rounded-lg w-full'
                  {...register('location.country')}
                  defaultValue={singleJobData?.data.location.country}
                />
                {errors?.location?.country && (
                  <p className='form-error'>
                    {errors?.location?.country.message}
                  </p>
                )}
              </label>
              <label className='flex flex-col mb-4 sm:w-1/3 w-full'>
                <span className='text-[14px] text-gray-400'>State</span>
                <input
                  type='text'
                  placeholder='Add state'
                  className='p-3 border rounded-lg w-full'
                  {...register('location.state')}
                  defaultValue={singleJobData?.data.location.state}
                />
                {errors?.location?.state && (
                  <p className='form-error'>
                    {errors?.location?.state.message}
                  </p>
                )}
              </label>
              <label className='flex flex-col mb-4 sm:w-1/3 w-full'>
                <span className='text-[14px] text-gray-400'>City</span>
                <input
                  type='text'
                  placeholder='Add city'
                  className='p-3 border rounded-lg w-full'
                  {...register('location.city')}
                  defaultValue={singleJobData?.data.location.city}
                />
                {errors?.location?.city && (
                  <p className='form-error'>{errors?.location?.city.message}</p>
                )}
              </label>
            </div>
          </div>
          <div className='w-full h-[0.7px] bg-gray-200 ' />

          <div className='p-8'>
            <div className='flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium '>
              <Image
                loader={imageLoader}
                src='/compensation.png'
                alt='img'
                className='w-5'
                width={300}
                height={150}
              />
              Compensation
            </div>
            <label className='flex flex-col mb-4 sm:w-1/3 w-full mt-8'>
              <span className='text-[14px] text-gray-400 mb-2'>
                Compensation
              </span>
              <input
                placeholder='Add annual compensation amount'
                className='p-3 border rounded-lg w-full'
                {...register('salary', {
                  required: 'Compensation is required',
                })}
                defaultValue={singleJobData?.data.salary}
              />
              {errors.salary && (
                <span className='text-red-500'>{errors.salary.message}</span>
              )}
            </label>
          </div>
          <div className='w-full h-[0.7px] bg-gray-200 ' />

          <div className='p-8'>
            <div className='flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium mb-8'>
              <Image
                loader={imageLoader}
                src='/jobicon.png'
                alt='img'
                className='w-5'
                width={300}
                height={150}
              />
              Application Requirements
            </div>
            <div className='flex flex-wrap gap-5'>
              {/* First Item */}
              <div className='border rounded-lg w-[200px] flex flex-col'>
                <div className='p-4 items-center flex font-medium'>
                  <input
                    type='checkbox'
                    value='Resume'
                    className='form-checkbox h-5 w-5 text-blue-600 cursor-pointer mr-3'
                    {...register('Resume')}
                  />
                  Resume
                </div>
                <div className='w-full h-[1px] bg-gray-300' />
                <div className='flex flex-row gap-5 p-3 items-center'>
                  <button
                    type='button'
                    onClick={() => handleToggle('Resume')}
                    className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      toggleStates.Resume ? 'bg-gray-800' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                        toggleStates.Resume ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className='text-gray-700 text-sm'>Required</span>
                </div>
              </div>

              {/* Second Item */}
              <div className='border rounded-lg w-[200px] flex flex-col'>
                <div className='p-4 items-center flex font-medium'>
                  <input
                    type='checkbox'
                    value='Address'
                    className='form-checkbox h-5 w-5 text-blue-600 cursor-pointer mr-3'
                    {...register('Address')}
                  />
                  Address
                </div>
                <div className='w-full h-[1px] bg-gray-300' />
                <div className='flex flex-row gap-5 p-3 items-center'>
                  <button
                    type='button'
                    onClick={() => handleToggle('Address')}
                    className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      toggleStates.Address ? 'bg-gray-800' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                        toggleStates.Address ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className='text-gray-700 text-sm'>Required</span>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full h-[0.7px] bg-gray-200 ' />
          <div className='p-8'>
            <div className='flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium mb-8'>
              <Image
                loader={imageLoader}
                src='/question.png'
                alt='img'
                className='w-5'
                width={300}
                height={150}
              />
              Custom Questions
            </div>
            {/* Existing Questions */}
            {questions.map((q, index) => (
              <div key={index} className='mb-6'>
                <div className='flex flex-col items-start sm:items-center gap-1 sm:gap-8 sm:flex-row'>
                  <label className='flex flex-col mb-4 sm:w-1/3 w-full'>
                    <span className='text-[14px] text-gray-400 mb-2'>
                      Question Title
                    </span>
                    <input
                      value={q.title}
                      className='p-3 border rounded-lg w-full'
                      readOnly
                    />
                  </label>

                  <button
                    type='button'
                    onClick={() => toggleRequired(q.id)}
                    className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      q.required ? 'bg-gray-800' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                        q.required ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className='text-gray-700 text-sm'>Required</span>

                  <button
                    type='button'
                    onClick={() => removeQuestion(q.id)}
                    className='text-red-500 hover:text-red-700 p-2'
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))}
            <div className='flex flex-col items-start sm:items-center gap-1 sm:gap-8 sm:flex-row'>
              <label className='flex flex-col mb-4 sm:w-1/3 w-full mt-8'>
                <span className='text-[14px] text-gray-400 mb-2'>
                  Question Title
                </span>
                <input
                  placeholder='Add question'
                  className='p-3 border rounded-lg w-full'
                  value={question.title}
                  onChange={(e) =>
                    setQuestion({ ...question, title: e.target.value })
                  }
                />
              </label>
              <button
                type='button'
                onClick={handleToggleQuestion}
                className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors mt-0 sm:mt-8 ${
                  isRequired ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                    isRequired ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className='text-gray-700 text-sm mt-0 sm:mt-8'>
                Required
              </span>

              <div className='flex flex-row gap-3 mt-0 sm:mt-8'>
                <button
                  type='button'
                  className='text- bg-[#0F172A] text-white rounded-lg p-3 px-2'
                  onClick={() => addQuestionHandler()}
                >
                  Add Question
                </button>
              </div>
            </div>
          </div>

          <div className='h-[1px] w-full bg-gray-300' />
          <div className='p-8'>
            <div className='flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium mb-8'>
              <Image
                loader={imageLoader}
                src='/jobpost.png'
                alt='img'
                className='w-5'
                width={300}
                height={150}
              />
              Share Job Posting
            </div>
            <div className='flex flex-wrap gap-2 sm:gap-12'>
              <div className='flex flex-col gap-1'>
                <label className='text-gray-400 text-[14px]'>Share to</label>
                <div className='p-4 items-center flex font-medium border rounded-lg'>
                  <input
                    type='checkbox'
                    value={'linkedin'}
                    className='form-checkbox h-5 w-5 text-blue-600 cursor-pointer mr-3'
                    {...register('linkedin')}
                  />
                  LinkedIn
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-gray-400 text-[14px]'>Share to</label>
                <div className='p-4 items-center flex font-medium border rounded-lg'>
                  <input
                    type='checkbox'
                    value={'companyWebsite'}
                    className='form-checkbox h-5 w-5 text-blue-600 cursor-pointer mr-3'
                    {...register('companyWebsite')}
                  />
                  Company Website
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-gray-400 text-[14px]'>Share to</label>
                <div className='p-4 items-center flex font-medium border rounded-lg'>
                  <input
                    type='checkbox'
                    value={'glassdoor'}
                    className='form-checkbox h-5 w-5 text-blue-600 cursor-pointer mr-3'
                    {...register('glassdoor')}
                  />
                  Glassdoor
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-gray-400 text-[14px]'>Share to</label>
                <div className='p-4 items-center flex font-medium border rounded-lg'>
                  <input
                    type='checkbox'
                    value={'indeed'}
                    className='form-checkbox h-5 w-5 text-blue-600 cursor-pointer mr-3'
                    {...register('indeed')}
                  />
                  Indeed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div onClick={handlePublish} className="w-fit h-fit mx-auto mt-4">
          <Button
            type="submit"
            name={loading ? '' : 'Save & Publish Job Opening'}
            className=""
            icon={
              jobStatus === 'Published' && loading ? (
                <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
              ) : (
                ''
              )
            }
          ></Button>
        </div> */}
      </div>
    </main>
  );
};

export default Createjobopening;
