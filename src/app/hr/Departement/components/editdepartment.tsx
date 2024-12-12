import { IoMdClose } from "react-icons/io";
interface EditEmployeeProps {
    setIsModalOpen1: (isOpen: boolean) => void;
  }
const EditDepartment: React.FC<EditEmployeeProps> = ({ setIsModalOpen1 })=>{

    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-1000">
        <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[600px] shadow-lg ">
          <div className="flex justify-between items-center">
            <h2 className="text-[22px] font-semibold">Edit Department</h2>
            <button onClick={() => setIsModalOpen1(false)}>
            <IoMdClose size={24} />
          </button>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4 mt-10">
            <label className="block text-gray-400 mb-2 text-[14px]">Department Name*</label>
            <input
              type="text"
              className="border w-full px-3 py-3 rounded-[5px] text-sm text-gray-800 focus:outline-none"
              placeholder="Type department name"
            />

          </div>
            <div className="mb-4">
            <label className="block text-gray-400 mb-2 text-[14px]">Department Head*</label>
            <select
              className="border w-full px-3 py-3 rounded-[5px] text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select department head
              </option>
              <option value="john_doe">John Doe</option>
              <option value="jane_smith">Jane Smith</option>
              <option value="alex_johnson">Alex Johnson</option>
              <option value="linda_williams">Linda Williams</option>
            </select>
          </div>
  
            <div className="flex justify-center items-center gap-6 p-6 mt-32">
              <button
                type="button"
                className="px-4 py-3 rounded bg-[#0F172A] text-white text-sm w-full"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen1(false)}
                className="px-4 py-3 rounded border text-sm w-full"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default EditDepartment;