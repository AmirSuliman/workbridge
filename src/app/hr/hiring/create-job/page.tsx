'use client';
import Button from '@/components/Button';
import Modal from '@/components/modal/Modal';
import { API_ROUTES } from '@/constants/apiRoutes';
import axiosInstance from '@/lib/axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { JobFormFields, JobPreviewData } from '@/types/job';
import { Department, EmployeeData, question } from '@/types/employee';
import { getAllEmployees } from '@/services/getAllEmployees';
import JobPreview from './JobPreview';
import { ApplicationRequirements } from '@/components/JobsOpening/ApplicationRequirements';
import JobOpeningReportingManagers from '@/components/DropDowns/JobOpeningReportingManagers';

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
  useEffect(() => {
    const getAllDepartments = async () => {
      try {
        const {
          data: {
            data: { items },
          },
        } = await axiosInstance.get(API_ROUTES.GET_DEPARTMENTS);
        setDepartments(items);
      } catch (error) {
        toast.error('Failed to load all departments');
        console.log(error);
      }
    };
    getAllDepartments();
  }, []);
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
    trigger,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<JobFormFields>();
  const formValues = watch();

  const [checkboxStates, setCheckboxStates] = useState({
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

  const handleToggle = (name: string, isChecked: boolean) => {
    if (isChecked) {
      setToggleStates((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    }
  };

  const handleCheckboxChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckboxStates((prev) => ({
        ...prev,
        [name]: event.target.checked,
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
      street1: data.street1 || '',
      street2: data.street2 || '',
      zipCode: Number(data.zipCode || 0),
      city: data.city || '',
      country: data.country || '',
      state: data.state || '',
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
      await axiosInstance.post(API_ROUTES.POST_JOB, jobData);
      toast.success(
        jobStatus === 'Published'
          ? 'Job published successfully'
          : 'Job saved as draft successfully'
      );
      router.back();
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
      street1: data.street1 || '',
      street2: data.street2 || '',
      zipCode: Number(data.zipCode || 0),
      city: data.city || '',
      country: data.country || '',
      state: data.state || '',
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
  const handleSaveDraft = () => setJobStatus('Draft');

  return (
    <main className="">
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {jobPreviewData && <JobPreview jobData={jobPreviewData} />}
        </Modal>
      )}
      <form onSubmit={onSubmit}>
        <div className="flex flex-row items-start sm:items-center justify-between mb-4">
          <div className="flex flex-row gap-2 text-[#0F172A] items-center text-[22px]">
            <FaEdit />
            <p className="font-semibold">Add Job Opening</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <div className="w-fit h-fit">
              <button
                onClick={() => {
                  handleSaveDraft();
                  console.log(jobStatus);
                }}
                type="submit"
                disabled={loading}
                className="bg-[#0F172A] p-2 px-3 text-[14px] rounded-lg text-white"
              >
                {jobStatus === 'Draft' && loading ? (
                  <BiLoaderCircle className="h-5 w-5  text-[14px] duration-100 animate-spin" />
                ) : (
                  'Save Draft'
                )}
              </button>
            </div>
            <button
              type="button"
              className="bg-white p-2 px-3 rounded-lg text-[14px] border"
              onClick={handlePreview}
            >
              Preview Job
            </button>
            <button
              type="reset"
              onClick={() => {
                router.back();
              }}
              className=" p-2 text-[14px] "
            >
              Cancel
            </button>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg border">
            <div className=" w-ful p-8">
              <div className="flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium ">
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.3954 4.34999V3.21794C10.3954 1.96752 9.38176 0.953857 8.13134 0.953857H5.86725C4.61683 0.953857 3.60316 1.96752 3.60316 3.21794V4.34999H2.47112C1.2207 4.34999 0.207031 5.36365 0.207031 6.61407V10.0102C0.207031 11.2606 1.2207 12.2743 2.47112 12.2743H11.5275C12.7779 12.2743 13.7916 11.2606 13.7916 10.0102V6.61407C13.7916 5.36365 12.7779 4.34999 11.5275 4.34999H10.3954ZM8.13134 2.65192H5.86725C5.55464 2.65192 5.30123 2.90534 5.30123 3.21794V4.34999H8.69736V3.21794C8.69736 2.90534 8.44394 2.65192 8.13134 2.65192ZM8.13134 10.0102C8.13134 10.6354 7.6245 11.1422 6.99929 11.1422C6.37408 11.1422 5.86725 10.6354 5.86725 10.0102C5.86725 9.38499 6.37408 8.87816 6.99929 8.87816C7.6245 8.87816 8.13134 9.38499 8.13134 10.0102Z"
                    fill="#0F172A"
                  />
                  <path
                    d="M1.33907 13.2129V13.4061C1.33907 14.6565 2.35274 15.6702 3.60316 15.6702H10.3954C11.6458 15.6702 12.6595 14.6565 12.6595 13.4061V13.2129C12.3054 13.338 11.9244 13.4061 11.5275 13.4061H2.47112C2.07418 13.4061 1.69315 13.338 1.33907 13.2129Z"
                    fill="#0F172A"
                  />
                </svg>
                Job Information
              </div>
              <div className="flex mt-8 flex-col sm:flex-row sm:gap-4 gap-2 items-center justify-between w-full">
                <label className="flex flex-col mb-4 sm:w-1/3 w-full">
                  <span className="form-label">Job Title*</span>
                  <input
                    type="text"
                    placeholder="Add job title"
                    className="form-input"
                    {...register('tittle', {
                      required: 'Job title is required',
                    })}
                  />
                  {errors.tittle && (
                    <span className="form-error">{errors.tittle.message}</span>
                  )}
                </label>

                <label className="flex flex-col mb-4 sm:w-1/3 w-full">
                  <span className="form-label">Department*</span>
                  <select
                    className="form-input text-gray-400 bg-white"
                    {...register('departmentId', {
                      required: 'Department is required',
                    })}
                  >
                    <option value="" className="text-gray-400">
                      Select a Department
                    </option>

                    {departments?.map((department) => (
                      <option
                        value={department?.id}
                        key={department.id}
                        className="text-gray-400"
                      >
                        {department?.name}
                      </option>
                    ))}
                  </select>
                  {errors.departmentId && (
                    <span className="form-error">
                      {errors.departmentId.message}
                    </span>
                  )}
                </label>
                <label className="flex flex-col mb-4 sm:w-1/3 w-full">
                  <span className="form-label">Employment Type*</span>
                  <select
                    className="form-input text-gray-400 bg-white"
                    {...register('employmentType', {
                      required: 'Employment type is required',
                    })}
                  >
                    <option value="" className="text-gray-400">
                      Select employment type
                    </option>
                    <option value="Fulltime" className="text-gray-400">
                      Full time
                    </option>
                    <option value="Part Time">Part-Time</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                  {errors.employmentType && (
                    <span className="form-error">
                      {errors.employmentType.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="flex flex-col mt-4 sm:flex-row sm:gap-4 gap-2 items-center justify-between w-full">
                <label className="flex flex-col mb-4 sm:w-1/3 w-full">
                  <span className="form-label">Hiring Lead*</span>
                  <select
                    className="form-input text-gray-400 bg-white"
                    {...register('hiringLeadId', {
                      required: 'Hiring lead required',
                    })}
                  >
                    <option value="" className="text-gray-400">
                      Select hiring leads
                    </option>
                    {employees.map((lead) => (
                      <option
                        key={lead.id}
                        value={lead.id}
                        className="text-gray-400"
                      >
                        {lead.firstName} {lead.lastName}
                      </option>
                    ))}
                  </select>
                  {errors.hiringLeadId && (
                    <span className="form-error">
                      {errors.hiringLeadId.message}
                    </span>
                  )}
                </label>

                <label className="flex flex-col mb-4 sm:w-1/3 w-full">
                  <span className="form-label">Reporting Manager*</span>
                  <JobOpeningReportingManagers
                    errors={errors}
                    register={register}
                  />
                </label>
                <label className="flex flex-col mb-4 sm:w-1/3 w-full">
                  <span className="form-label">Minimum Experience</span>
                  <input
                    type="text"
                    placeholder="Add minimum years of experience"
                    className="form-input"
                    {...register('minYearsExperience', {
                      required: 'Experience is required',
                    })}
                  />
                  {errors.minYearsExperience && (
                    <span className="form-error">
                      {errors.minYearsExperience.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="w-full h-[0.7px] bg-gray-200 " />
            <div className="p-8">
              <div className="flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium ">
                <svg
                  width="14"
                  height="17"
                  viewBox="0 0 14 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.3409 0.737793C1.58416 0.737793 0.970703 1.35125 0.970703 2.10799V14.7138C0.970703 15.4705 1.58416 16.084 2.3409 16.084H11.6582C12.415 16.084 13.0284 15.4705 13.0284 14.7138V8.95897C13.0284 7.44549 11.8015 6.21858 10.288 6.21858H8.91784C8.1611 6.21858 7.54764 5.60512 7.54764 4.84838V3.47818C7.54764 1.96471 6.32073 0.737793 4.80725 0.737793H2.3409ZM3.71109 10.6032C3.71109 10.3005 3.95648 10.0551 4.25917 10.0551H9.73996C10.0427 10.0551 10.288 10.3005 10.288 10.6032C10.288 10.9059 10.0427 11.1513 9.73996 11.1513H4.25917C3.95648 11.1513 3.71109 10.9059 3.71109 10.6032ZM4.25917 12.2474C3.95648 12.2474 3.71109 12.4928 3.71109 12.7955C3.71109 13.0982 3.95648 13.3436 4.25917 13.3436H6.99956C7.30226 13.3436 7.54764 13.0982 7.54764 12.7955C7.54764 12.4928 7.30226 12.2474 6.99956 12.2474H4.25917Z"
                    fill="#0F172A"
                  />
                  <path
                    d="M7.70928 0.968647C8.29154 1.64138 8.6438 2.51864 8.6438 3.47818V4.84838C8.6438 4.99973 8.76649 5.12242 8.91784 5.12242H10.288C11.2476 5.12242 12.1248 5.47468 12.7976 6.05693C12.1487 3.57309 10.1931 1.61748 7.70928 0.968647Z"
                    fill="#0F172A"
                  />
                </svg>
                Job Description
              </div>
              <label className="flex flex-col mb-4  w-full mt-8">
                <span className="form-label mb-2">Description*</span>
                <textarea
                  placeholder="Write job description"
                  className="form-input resize"
                  {...register('description', {
                    required: 'Description is required',
                  })}
                />
                {errors.description && (
                  <span className="form-error">
                    {errors.description.message}
                  </span>
                )}
              </label>
            </div>
            <div className="w-full h-[0.7px] bg-gray-200 " />

            <div className=" w-ful p-8">
              <div className="flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium ">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 8.10645C16 12.5247 12.4183 16.1064 8 16.1064C3.58172 16.1064 0 12.5247 0 8.10645C0 3.68817 3.58172 0.106445 8 0.106445C12.4183 0.106445 16 3.68817 16 8.10645ZM14.5 8.10645C14.5 11.6963 11.5899 14.6064 8 14.6064C4.41015 14.6064 1.5 11.6963 1.5 8.10645C1.5 6.26309 2.26733 4.59895 3.5 3.41602V3.8638C3.5 4.79206 3.86875 5.6823 4.52513 6.33868L6.29289 8.10645L6 8.39934C5.60947 8.78986 5.60948 9.42303 6 9.81355L7.06066 10.8742C7.34197 11.1555 7.5 11.537 7.5 11.9349V12.2974C7.5 12.6762 7.714 13.0225 8.05278 13.1919L8.32918 13.3301C8.82316 13.577 9.42383 13.3768 9.67082 12.8828L11.1249 9.97472C11.4136 9.39724 11.3004 8.69978 10.8439 8.24324L10.0721 7.4714C9.80423 7.20357 9.40806 7.11005 9.04873 7.22982L8.66467 7.35784C8.42862 7.43653 8.17063 7.32966 8.05935 7.10711L7.76344 6.51529C7.67084 6.33009 7.70714 6.10641 7.85355 5.96C7.99997 5.81358 8.22365 5.77729 8.40885 5.86989L8.67082 6.00087C8.80968 6.0703 8.96279 6.10645 9.11803 6.10645H9.30629C9.98884 6.10645 10.4708 5.43775 10.255 4.79022L10.187 4.58622C10.1227 4.39337 10.1816 4.18078 10.3359 4.04848L11.7754 2.81465C13.4248 3.99355 14.5 5.92444 14.5 8.10645Z"
                    fill="#0F172A"
                  />
                </svg>
                Location
              </div>
              <div className="flex mt-8 flex-col sm:flex-row sm:gap-4 gap-2 items-center justify-between w-full">
                {/* First Input */}
                <label className="flex flex-col mb-4 sm:w-1/3 w-full">
                  <span className="form-label">Street 1</span>
                  <input
                    type="text"
                    placeholder="Add street"
                    className="form-input"
                    {...register('street1', {
                      required: 'Street1 is required',
                    })}
                  />
                  {errors.street1 && (
                    <span className="form-error">{errors.street1.message}</span>
                  )}
                </label>
                <label className="flex flex-col mb-4 sm:w-1/3 w-full">
                  <span className="form-label">Street 2</span>
                  <input
                    type="text"
                    placeholder="Add street"
                    className="form-input"
                    {...register('street2', { required: false })}
                  />
                </label>
                <label className="flex flex-col mb-4 sm:w-1/3 w-full">
                  <span className="form-label">Zip</span>
                  <input
                    type="text"
                    placeholder="Add Zip"
                    className="form-input"
                    {...register('zipCode', {
                      required: 'Zip code is required',
                    })}
                  />
                  {errors.zipCode && (
                    <span className="form-error">{errors.zipCode.message}</span>
                  )}
                </label>
              </div>

              <div className="flex flex-col mt-4 sm:flex-row sm:gap-4 gap-2 items-center justify-between w-full">
                <label className="flex flex-col mb-4 sm:w-1/3 w-full">
                  <span className="form-label">Country</span>
                  <input
                    type="text"
                    placeholder="Add country"
                    className="form-input"
                    {...register('country', {
                      required: 'Country is required',
                    })}
                  />
                  {errors.country && (
                    <span className="form-error">{errors.country.message}</span>
                  )}
                </label>
                <label className="flex flex-col mb-4 sm:w-1/3 w-full">
                  <span className="form-label">State</span>
                  <input
                    type="text"
                    placeholder="Add state"
                    className="form-input"
                    {...register('state', { required: 'State is required' })}
                  />
                  {errors.state && (
                    <span className="form-error">{errors.state.message}</span>
                  )}
                </label>
                <label className="flex flex-col mb-4 sm:w-1/3 w-full">
                  <span className="form-label">City</span>
                  <input
                    type="text"
                    placeholder="Add city"
                    className="form-input"
                    {...register('city', { required: 'City is required' })}
                  />
                  {errors.city && (
                    <span className="form-error">{errors.city.message}</span>
                  )}
                </label>
              </div>
            </div>
            <div className="w-full h-[0.7px] bg-gray-200 " />

            <div className="p-8">
              <div className="flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium ">
                <svg
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 1.50715C0 0.998379 0.412441 0.585938 0.921214 0.585938H15.6606C16.1694 0.585938 16.5818 0.998379 16.5818 1.50715V8.87686C16.5818 9.38563 16.1694 9.79807 15.6606 9.79807H0.921214C0.412442 9.79807 0 9.38563 0 8.87686V1.50715ZM11.0546 5.19201C11.0546 6.71832 9.81724 7.95565 8.29092 7.95565C6.76461 7.95565 5.52728 6.71832 5.52728 5.19201C5.52728 3.66569 6.76461 2.42836 8.29092 2.42836C9.81724 2.42836 11.0546 3.66569 11.0546 5.19201ZM2.76364 6.11322C3.27241 6.11322 3.68485 5.70078 3.68485 5.19201C3.68485 4.68323 3.27241 4.27079 2.76364 4.27079C2.25487 4.27079 1.84243 4.68323 1.84243 5.19201C1.84243 5.70078 2.25487 6.11322 2.76364 6.11322ZM14.7394 5.19201C14.7394 5.70078 14.327 6.11322 13.8182 6.11322C13.3094 6.11322 12.897 5.70078 12.897 5.19201C12.897 4.68323 13.3094 4.27079 13.8182 4.27079C14.327 4.27079 14.7394 4.68323 14.7394 5.19201ZM0.69091 11.1799C0.309331 11.1799 0 11.4892 0 11.8708C0 12.2524 0.309331 12.5617 0.69091 12.5617C4.76019 12.5617 8.69867 13.117 12.4352 14.1555C13.4591 14.4401 14.5091 13.684 14.5091 12.5927V11.8708C14.5091 11.4892 14.1998 11.1799 13.8182 11.1799C13.4366 11.1799 13.1273 11.4892 13.1273 11.8708V12.5927C13.1273 12.7416 12.9763 12.8717 12.8053 12.8242C8.94936 11.7525 4.88644 11.1799 0.69091 11.1799Z"
                    fill="#0F172A"
                  />
                </svg>
                Compensation
              </div>
              <label className="flex flex-col mb-4 sm:w-1/3 w-full mt-8">
                <span className="form-label mb-2">Compensation</span>
                <input
                  placeholder="Add annual compensation amount"
                  className="form-input"
                  {...register('salary', {
                    required: 'Compensation is required',
                  })}
                />
                {errors.salary && (
                  <span className="form-error">{errors.salary.message}</span>
                )}
              </label>
            </div>
            <div className="w-full h-[0.7px] bg-gray-200 " />

            <div className="p-8">
              <div className="flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium mb-8">
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.3954 4.31508V3.18303C10.3954 1.93261 9.38176 0.918945 8.13134 0.918945H5.86725C4.61683 0.918945 3.60316 1.93261 3.60316 3.18303V4.31508H2.47112C1.2207 4.31508 0.207031 5.32874 0.207031 6.57916V9.97529C0.207031 11.2257 1.2207 12.2394 2.47112 12.2394H11.5275C12.7779 12.2394 13.7916 11.2257 13.7916 9.97529V6.57916C13.7916 5.32874 12.7779 4.31508 11.5275 4.31508H10.3954ZM8.13134 2.61701H5.86725C5.55464 2.61701 5.30123 2.87043 5.30123 3.18303V4.31508H8.69736V3.18303C8.69736 2.87043 8.44394 2.61701 8.13134 2.61701ZM8.13134 9.97529C8.13134 10.6005 7.6245 11.1073 6.99929 11.1073C6.37408 11.1073 5.86725 10.6005 5.86725 9.97529C5.86725 9.35008 6.37408 8.84325 6.99929 8.84325C7.6245 8.84325 8.13134 9.35008 8.13134 9.97529Z"
                    fill="#0F172A"
                  />
                  <path
                    d="M1.33907 13.178V13.3712C1.33907 14.6216 2.35274 15.6353 3.60316 15.6353H10.3954C11.6458 15.6353 12.6595 14.6216 12.6595 13.3712V13.178C12.3054 13.3031 11.9244 13.3712 11.5275 13.3712H2.47112C2.07418 13.3712 1.69315 13.3031 1.33907 13.178Z"
                    fill="#0F172A"
                  />
                </svg>
                Application Requirements
              </div>

              <ApplicationRequirements
                register={register}
                toggleStates={toggleStates}
                handleToggle={handleToggle}
                checkboxStates={checkboxStates}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>

            <div className="w-full h-[0.7px] bg-gray-200 " />
            <div className="p-8">
              <div className="flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium mb-8">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 8.10889C16 12.5272 12.4183 16.1089 8 16.1089C3.58172 16.1089 0 12.5272 0 8.10889C0 3.69061 3.58172 0.108887 8 0.108887C12.4183 0.108887 16 3.69061 16 8.10889ZM6.93934 5.0482C6.64645 5.34109 6.17157 5.34109 5.87868 5.0482C5.58579 4.75531 5.58579 4.28043 5.87868 3.98754C7.05025 2.81597 8.94975 2.81597 10.1213 3.98754C11.2929 5.15911 11.2929 7.05861 10.1213 8.23018C9.72884 8.62266 9.25285 8.88452 8.75 9.01396V9.35886C8.75 9.77307 8.41421 10.1089 8 10.1089C7.58579 10.1089 7.25 9.77307 7.25 9.35886V8.85886C7.25 8.13856 7.81995 7.68714 8.33134 7.57211C8.59823 7.51207 8.8516 7.37858 9.06066 7.16952C9.64645 6.58373 9.64645 5.63399 9.06066 5.0482C8.47487 4.46241 7.52513 4.46241 6.93934 5.0482ZM8 13.1089C8.55228 13.1089 9 12.6612 9 12.1089C9 11.5566 8.55228 11.1089 8 11.1089C7.44771 11.1089 7 11.5566 7 12.1089C7 12.6612 7.44771 13.1089 8 13.1089Z"
                    fill="#0F172A"
                  />
                </svg>
                Custom Questions
              </div>
              {/* Existing Questions */}
              {questions.map((q, index) => (
                <div key={index} className="mb-6">
                  <div className="flex flex-col items-start sm:items-center gap-1 sm:gap-8 sm:flex-row">
                    <label className="flex flex-col mb-4 sm:w-1/3 w-full">
                      <span className="form-label mb-2">Question Title</span>
                      <input value={q.title} className="form-input" readOnly />
                    </label>

                    <button
                      type="button"
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
                    <span className="text-gray-700 text-sm">Required</span>

                    <button
                      type="button"
                      onClick={() => removeQuestion(q.id)}
                      className="form-error hover:text-red-700 p-2"
                    >
                      <Image
                        src="/delete.svg"
                        alt="img"
                        width={15}
                        height={15}
                      />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex flex-col items-start sm:items-center gap-1 sm:gap-8 sm:flex-row">
                <label className="flex flex-col mb-4 sm:w-1/3 w-full mt-8">
                  <span className="form-label mb-2">Question Title</span>
                  <input
                    placeholder="Add question"
                    className="form-input"
                    value={question.title}
                    onChange={(e) =>
                      setQuestion({ ...question, title: e.target.value })
                    }
                  />
                </label>
                <button
                  type="button"
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
                <span className="text-gray-700 text-sm mt-0 sm:mt-8">
                  Required
                </span>

                <div className="flex flex-row gap-3 mt-0 sm:mt-8">
                  <button
                    type="button"
                    className="text-[14px] bg-[#0F172A] text-white rounded-lg p-2 px-4"
                    onClick={() => addQuestionHandler()}
                  >
                    Add Question
                  </button>
                  <button
                    type="button"
                    className="border p-2 px-4 text-[14px] rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-gray-300" />
            <div className="p-8">
              <div className="flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium mb-8">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 8.10645C16 12.5247 12.4183 16.1064 8 16.1064C3.58172 16.1064 0 12.5247 0 8.10645C0 3.68817 3.58172 0.106445 8 0.106445C12.4183 0.106445 16 3.68817 16 8.10645ZM14.5 8.10645C14.5 11.6963 11.5899 14.6064 8 14.6064C4.41015 14.6064 1.5 11.6963 1.5 8.10645C1.5 6.26309 2.26733 4.59895 3.5 3.41602V3.8638C3.5 4.79206 3.86875 5.6823 4.52513 6.33868L6.29289 8.10645L6 8.39934C5.60947 8.78986 5.60948 9.42303 6 9.81355L7.06066 10.8742C7.34197 11.1555 7.5 11.537 7.5 11.9349V12.2974C7.5 12.6762 7.714 13.0225 8.05278 13.1919L8.32918 13.3301C8.82316 13.577 9.42383 13.3768 9.67082 12.8828L11.1249 9.97472C11.4136 9.39724 11.3004 8.69978 10.8439 8.24324L10.0721 7.4714C9.80423 7.20357 9.40806 7.11005 9.04873 7.22982L8.66467 7.35784C8.42862 7.43653 8.17063 7.32966 8.05935 7.10711L7.76344 6.51529C7.67084 6.33009 7.70714 6.10641 7.85355 5.96C7.99997 5.81358 8.22365 5.77729 8.40885 5.86989L8.67082 6.00087C8.80968 6.0703 8.96279 6.10645 9.11803 6.10645H9.30629C9.98884 6.10645 10.4708 5.43775 10.255 4.79022L10.187 4.58622C10.1227 4.39337 10.1816 4.18078 10.3359 4.04848L11.7754 2.81465C13.4248 3.99355 14.5 5.92444 14.5 8.10645Z"
                    fill="#0F172A"
                  />
                </svg>
                Share Job Posting
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-12">
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[14px]">Share to</label>
                  <div className="p-4 items-center flex font-medium border rounded-lg">
                    <input
                      type="checkbox"
                      value={'linkedin'}
                      className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
                      {...register('linkedin')}
                    />
                    LinkedIn
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[14px]">Share to</label>
                  <div className="p-4 items-center flex font-medium border rounded-lg">
                    <input
                      type="checkbox"
                      value={'companyWebsite'}
                      className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
                      {...register('companyWebsite')}
                    />
                    Company Website
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[14px]">Share to</label>
                  <div className="p-4 items-center flex font-medium border rounded-lg">
                    <input
                      type="checkbox"
                      value={'glassdoor'}
                      className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
                      {...register('glassdoor')}
                    />
                    Glassdoor
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[14px]">Share to</label>
                  <div className="p-4 items-center flex font-medium border rounded-lg">
                    <input
                      type="checkbox"
                      value={'indeed'}
                      className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
                      {...register('indeed')}
                    />
                    Indeed
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <button onClick={handleSubmit(onSubmit)} disabled={loading}>
          {jobStatus === 'Published' && loading
            ? 'Publishing...'
            : 'Publish Job'}
        </button> */}
          <div
            onClick={handlePublish}
            className="w-fit p-3 px-8 h-fit mx-auto mt-4"
          >
            <Button
              type="submit"
              name={loading ? '' : 'Save & Publish Job Opening'}
              className="!text-[14px] w-[400px]"
              icon={
                jobStatus === 'Published' && loading ? (
                  <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
                ) : (
                  ''
                )
              }
            ></Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Createjobopening;
