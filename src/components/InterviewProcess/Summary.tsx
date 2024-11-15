'use client';

import { FaAngleDown, FaUserFriends } from 'react-icons/fa';
import { MdOutlineFileDownload } from 'react-icons/md';
import { PiListChecksLight } from 'react-icons/pi';
import Button from '../Button';
import { useState } from 'react';

const Summary = () => {
  const [openDropdown, setOpenDropdown] = useState<number>(0);
  const handleDownloadPDF = () => {
    window.print();
  };

  const handleDropdownToggle = (dropdownId: number) => {
    setOpenDropdown((prev) => (prev === dropdownId ? 0 : dropdownId));
  };
  return (
    <main className="space-y-8 divide-y p-6 bg-white rounded-lg border">
      <header className="flex items-center justify-between gap-4">
        <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
          <FaUserFriends size={24} />
          Interview Summary
        </h2>

        <div onClick={handleDownloadPDF} className="w-fit h-fit">
          <Button
            name="Download"
            icon={<MdOutlineFileDownload size={20} />}
            className="flex-row-reverse"
          />
        </div>
      </header>
      <section>
        <header className="flex items-center justify-between gap-4 my-6">
          <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
            <PiListChecksLight size={24} />
            First Round
          </h2>
          <button
            onClick={() => handleDropdownToggle(1)}
            type="button"
            className="rounded border p-1 w-fit h-fit"
          >
            <FaAngleDown
              className={`${openDropdown === 1 ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </header>

        {openDropdown === 1 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Interview held on</span>
              <input
                type="text"
                name="invite"
                readOnly
                value="google meet"
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
              />
            </label>
            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Interview Date</span>
              <input
                type="text"
                name="date"
                readOnly
                value="24.01.2023"
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
              />
            </label>
            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Interview Time</span>
              <input
                type="text"
                name="time"
                readOnly
                value="13:45"
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
              />
            </label>

            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Interview Rating</span>
              <input
                type="text"
                name="rating"
                value="8"
                readOnly
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
              />
            </label>
            {/* this div is for UI purposes */}
            <div className="hidden lg:block"></div>
            <div className="hidden lg:block"></div>

            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Notes</span>
              <textarea
                name="Notes"
                rows={5}
                readOnly
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full resize-none"
                // value=""
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercita
              </textarea>
            </label>
            {/* this div is for UI purposes */}
            <div className="hidden lg:block"></div>
            <div className="hidden lg:block"></div>
          </div>
        )}
      </section>
      <section>
        <header className="flex items-center justify-between gap-4 my-6">
          <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
            <PiListChecksLight size={24} />
            Technical Interview
          </h2>
          <button
            onClick={() => handleDropdownToggle(2)}
            type="button"
            className="rounded border p-1 w-fit h-fit"
          >
            <FaAngleDown
              className={`${openDropdown === 2 ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </header>

        {openDropdown === 2 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Interview held on</span>
              <input
                type="text"
                name="invite"
                readOnly
                value="google meet"
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
              />
            </label>
            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Interview Date</span>
              <input
                type="text"
                name="date"
                readOnly
                value="24.01.2023"
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
              />
            </label>
            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Interview Time</span>
              <input
                type="text"
                name="time"
                readOnly
                value="13:45"
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
              />
            </label>

            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Interview Rating</span>
              <input
                type="text"
                name="rating"
                value="8"
                readOnly
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
              />
            </label>
            {/* this div is for UI purposes */}
            <div className="hidden lg:block"></div>
            <div className="hidden lg:block"></div>

            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Notes</span>
              <textarea
                name="Notes"
                rows={5}
                readOnly
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full resize-none"
                // value=""
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercita
              </textarea>
            </label>
            {/* this div is for UI purposes */}
            <div className="hidden lg:block"></div>
            <div className="hidden lg:block"></div>
          </div>
        )}
      </section>
      <section>
        <header className="flex items-center justify-between gap-4 my-6">
          <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
            <PiListChecksLight size={24} />
            Second Round
          </h2>
          <button
            onClick={() => handleDropdownToggle(3)}
            type="button"
            className="rounded border p-1 w-fit h-fit"
          >
            <FaAngleDown
              className={`${openDropdown === 3 ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </header>

        {openDropdown === 3 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Interview held on</span>
              <input
                type="text"
                name="invite"
                readOnly
                value="google meet"
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
              />
            </label>
            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Interview Date</span>
              <input
                type="text"
                name="date"
                readOnly
                value="24.01.2023"
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
              />
            </label>
            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Interview Time</span>
              <input
                type="text"
                name="time"
                readOnly
                value="13:45"
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
              />
            </label>

            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Interview Rating</span>
              <input
                type="text"
                name="rating"
                value="8"
                readOnly
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
              />
            </label>
            {/* this div is for UI purposes */}
            <div className="hidden lg:block"></div>
            <div className="hidden lg:block"></div>

            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Notes</span>
              <textarea
                name="Notes"
                rows={5}
                readOnly
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full resize-none"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercita
              </textarea>
            </label>
            {/* this div is for UI purposes */}
            <div className="hidden lg:block"></div>
            <div className="hidden lg:block"></div>
          </div>
        )}
      </section>
      <section>
        <header className="flex items-center justify-between gap-4 my-6">
          <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
            <PiListChecksLight size={24} />
            Offer and Negotiation
          </h2>
          <button
            onClick={() => handleDropdownToggle(4)}
            type="button"
            className="rounded border p-1 w-fit h-fit"
          >
            <FaAngleDown
              className={`${openDropdown === 4 ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </header>

        {openDropdown === 4 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Start Date</span>
              <input
                type="text"
                name="startDate"
                readOnly
                value="24.02.2025"
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
              />
            </label>
            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Compensation</span>
              <input
                type="text"
                name="Compensation"
                readOnly
                value="$98,000"
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
              />
            </label>
            <div className="w-fit h-fit mt-auto mb-0">
              <Button name="View Offer" />
            </div>
            <label className="font-medium text-sm flex flex-col">
              <span className="opacity-35">Offer Sent on</span>
              <input
                type="text"
                name="offerSentOn"
                readOnly
                value="24.01.2023"
                className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
              />
            </label>
          </div>
        )}
      </section>
    </main>
  );
};
export default Summary;
