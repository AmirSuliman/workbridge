import { useState } from 'react';
import WorkBridgeLogo from '../icons/work-bridge-logo';
// Define the available form types
type FormType = 'admin' | 'employee' | 'hr';

// Main User Management Form component
export default function AddNewUser() {
  // State to control which form is currently active
  const [activeForm, setActiveForm] = useState<FormType>('hr');

  // Function to switch between different forms
  const handleFormSwitch = (form: FormType) => {
    setActiveForm(form);
  };

  return (
    <div className="bg-white justify-content-center rounded-lg w-full max-w-3xl p-6">
      <WorkBridgeLogo classNames="max-w-[14rem] ml-[20px] my-[2rem] mb-[2.8rem]" />

      <h1 className="font-semibold text-gray-800 mb-4 ml-[24px]">
        Add New User
      </h1>
      <p className=" text-gray-600 mb-8 ml-[24px]">
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
      </p>

      {/* Navigation for switching between forms */}
      <div className="flex justify-around mb-6">
        <button
          onClick={() => handleFormSwitch('admin')}
          className={`px-4 py-2 font-semibold ${
            activeForm === 'admin'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600'
          }`}
        >
          Add New Super Admin
        </button>
        <button
          onClick={() => handleFormSwitch('employee')}
          className={`px-4 py-2 font-semibold ${
            activeForm === 'employee'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600'
          }`}
        >
          Add New Employee
        </button>
        <button
          onClick={() => handleFormSwitch('hr')}
          className={`px-4 py-2 font-semibold ${
            activeForm === 'hr'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600'
          }`}
        >
          Add New Hr
        </button>
      </div>

      {/* Display the active form */}
      <div className="p-6 rounded-lg">
        {activeForm === 'admin' && <UserForm title="Add New Super Admin" />}
        {activeForm === 'employee' && <UserForm title="Add New Employee" />}
        {activeForm === 'hr' && <UserForm title="Add New HR" />}
      </div>
    </div>
  );
}

// Define the props for the UserForm component
interface UserFormProps {
  title: string;
}

// UserForm component to render a form for adding a user, admin, or employee
function UserForm({ title }: UserFormProps) {
  return (
    <form>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="roleId"
        >
          Role ID
        </label>
        <input
          type="text"
          id="roleId"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none"
      >
        {title}
      </button>
    </form>
  );
}
