import { PiArrowUpRightThin, PiListChecksLight } from 'react-icons/pi';
import Button from '../Button';
import { IoCheckmark } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';
import Link from 'next/link';

const OfferApproval = ({ jobApplication }) => {
  console.log(jobApplication);

  return (
    <section className="overflow-x-auto">
      <h2 className="flex font-medium text-lg items-center gap-4 ">
        <PiListChecksLight size={24} />
        Offer Approval
      </h2>

      <table className="w-full">
        <tbody className="w-full">
          <tr className="w-full border-b">
            <td className="p-1 lg:p-3 opacity-35 font-medium text-sm">
              Offer sent by
            </td>
            <td className="p-1 lg:p-3 opacity-35 font-medium text-sm">
              Date sent
            </td>
            <td className="p-1 lg:p-3 opacity-35 font-medium text-sm">
              Time sent
            </td>
            <td className="p-1 lg:p-3 opacity-35 font-medium text-sm">Offer</td>
            <td className="p-1 lg:p-3 opacity-35 font-medium text-sm"></td>
            <td className="p-1 lg:p-3 opacity-35 font-medium text-sm"></td>
          </tr>
          <tr className="w-full">
            <td className="p-1 lg:p-3 font-medium text-sm">John Bourgie</td>
            <td className="p-1 lg:p-3 font-medium text-sm">24.02.2024</td>
            <td className="p-1 lg:p-3 font-medium text-sm">10:45</td>
            <td className="p-1 lg:p-3 ">
              <Link href="/HR/Home/All-Announcements">
                <Button
                  className="text-[10px]"
                  name="See offer"
                  icon={<PiArrowUpRightThin size={18} />}
                  bg="transparent"
                  textColor="black"
                />
              </Link>
            </td>
            <td className="p-1 lg:p-3">
              <Button
                className="text-[10px]"
                name="Offer Accepted"
                bg="#00B87D"
                textColor="white"
                icon={<IoCheckmark />}
              />
            </td>
            <td className="p-1 lg:p-3">
              <Button
                className="text-[10px]"
                name="Rejected"
                bg="#F53649"
                textColor="white"
                icon={<RxCross1 />}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
export default OfferApproval;
