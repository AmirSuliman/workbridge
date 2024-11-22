import React from 'react';
import { AiFillContacts } from 'react-icons/ai';
import { Heading, Label } from '../Helpers';
import { MdOutlineFileUpload } from 'react-icons/md';
import Button from '@/components/Button';
const BasicInfo = () => {
  return (
    <div>
      <section className="bg-white  rounded-lg border">
        {/* basic information block */}
        <div className="border-b p-4 pb-12">
          <Heading icon={<AiFillContacts />} text="Basic Information" />
          <Label text="Profile Picture" />
          <article className="w-[30%] p-10 rounded-md border border-dashed hover:bg-slate-200 cursor-pointer">
            <p className="flex items-center justify-center gap-x-2">
              <span>Upload a profile picture</span>
              <MdOutlineFileUpload />
            </p>
          </article>
          <p className="text-sm py-8 text-[#abaeb4]">
            Make sure profile image is a valid image format(.jpg,.png)
          </p>
          <div className="grid grid-cols-3 gap-4">
            <article>
              <Label text="First Name" /> <br />
              <input
                type="text"
                placeholder="Add first name"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
            <article>
              <Label text="Middle Name" /> <br />
              <input
                type="text"
                placeholder="Add middle name"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
            <article>
              <Label text="Last Name" /> <br />
              <input
                type="text"
                placeholder="Add lastname"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
            <article>
              <Label text="Birthday" /> <br />
              <input
                type="date"
                placeholder="Add birthday"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
            <article>
              <Label text="Gender" /> <br />
              <select
                name=""
                id=""
                className="p-3 rounded-md bg-transparent border w-full text-sm text-[#abaeb4]"
              >
                <option value="" className="w-full text-sm">
                  Male
                </option>
                <option value="">Female</option>
              </select>
            </article>
            <article>
              <Label text="Gender" /> <br />
              <select
                name=""
                id=""
                className="p-3 rounded-md bg-transparent border w-full text-sm text-[#abaeb4]"
              >
                <option value="" className="w-full text-sm">
                  Male
                </option>
                <option value="">Female</option>
              </select>
            </article>
          </div>
        </div>
        {/* address block */}
        <div className="p-4 pb-12 border-b">
          <Heading icon={<AiFillContacts />} text="Address" />
          <div className="grid grid-cols-3 gap-4">
            <article>
              <Label text="Street 1" /> <br />
              <input
                type="text"
                placeholder="Add street"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
            <article>
              <Label text="Street 2" /> <br />
              <input
                type="text"
                placeholder="Add street"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
            <article>
              <Label text="Zip" /> <br />
              <input
                type="text"
                placeholder="Add zip"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
            <article>
              <Label text="City" /> <br />
              <input
                type="text"
                placeholder="Add city"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
            <article>
              <Label text="Country" /> <br />
              <input
                type="text"
                placeholder="Add country"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
            <article>
              <Label text="State" /> <br />
              <input
                type="text"
                placeholder="Add state"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
          </div>
        </div>
        {/* social links block */}
        <div className="p-4 pb-12">
          <Heading icon={<AiFillContacts />} text="Social Links" />
          <div className="grid grid-cols-3 gap-4">
            <article>
              <Label text="Linkedin" /> <br />
              <input
                type="text"
                placeholder="Add linkedin"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
            <article>
              <Label text="Facebook" /> <br />
              <input
                type="text"
                placeholder="Add facebook"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
            <article>
              <Label text="Instagram" /> <br />
              <input
                type="text"
                placeholder="Add instagram"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
            <article>
              <Label text="Personal Website" /> <br />
              <input
                type="text"
                placeholder="Add website"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
          </div>
        </div>
      </section>
      <article className="flex justify-end mt-6 gap-x-4">
        <Button name="cancel" bg="white" textColor="black" className="px-10" />
        <Button name="Next" className="px-10" />
      </article>
    </div>
  );
};

export default BasicInfo;
