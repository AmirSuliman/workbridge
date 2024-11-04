import { PiUmbrellaLight } from 'react-icons/pi';
import LeaveAndVacationCard from '../LeaveAndVacationCard/LeaveAndVacationCard';
import { MdOutlineSick } from 'react-icons/md';

const WhosOut = () => {
  return (
    <section className=" h-fit bg-white rounded-xl border-[1px] border-[#E0E0E0]">
      <div className="flex gap-4 flex-wrap lg:flex-nowrap p-4">
        <LeaveAndVacationCard
          title="Vacation"
          bgColor="#25A244"
          icon={<PiUmbrellaLight />}
          description="Requests need to be made at least 48 hours prior."
          daysNum="32"
          name="Request Vacation"
        />
        <LeaveAndVacationCard
          title="Sick leave"
          bgColor="#F53649"
          icon={<MdOutlineSick />}
          description=""
          daysNum="11"
          name="Request Sick Leave"
        />
      </div>
      <hr className="my-4" />
      <h2 className="font-medium text-lg px-4">Who’s Out</h2>
      <h6 className="text-sm opacity-50 my-1 px-4">Today (2)</h6>
      <div className="border-[0.5px] border-[#E8E8E8] bg-[#F5F6FA] rounded m-4 ">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-xs opacity-50 font-normal text-start px-4 pt-4">
                Employee
              </th>
              <th className="text-xs opacity-50 font-normal text-start px-4 pt-4">
                Leaving
              </th>
              <th className="text-xs opacity-50 font-normal text-start px-4 pt-4">
                Returning
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-[1px] border-[#E8E8E8] text-sm">
              <td className="p-4">James</td>
              <td className="p-4">12 November</td>
              <td className="p-4">26 November</td>
            </tr>
            <tr className="border-b-[1px] border-[#E8E8E8] text-sm">
              <td className="p-4">Benjamin Hammock</td>
              <td className="p-4">12 November</td>
              <td className="p-4">22 November</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h6 className="text-sm opacity-50 pt-4 mb-1 px-4">Upcoming Week (3)</h6>
      <div className="border-[0.5px] border-[#E8E8E8] bg-[#F5F6FA] rounded m-4 ">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-xs opacity-50 font-normal text-start px-4 pt-4">
                Employee
              </th>
              <th className="text-xs opacity-50 font-normal text-start px-4 pt-4">
                Leaving
              </th>
              <th className="text-xs opacity-50 font-normal text-start px-4 pt-4">
                Returning
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-[1px] border-[#E8E8E8] text-sm">
              <td className="p-4">James</td>
              <td className="p-4">12 November</td>
              <td className="p-4">26 November</td>
            </tr>
            <tr className="border-b-[1px] border-[#E8E8E8] text-sm">
              <td className="p-4">Benjamin Hammock</td>
              <td className="p-4">12 November</td>
              <td className="p-4">22 November</td>
            </tr>
            <tr className="border-b-[1px] border-[#E8E8E8] text-sm">
              <td className="p-4">Han Solo</td>
              <td className="p-4">12 November</td>
              <td className="p-4">22 November</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default WhosOut;
