import React from 'react';
import { AiFillContacts } from 'react-icons/ai';
import { Heading, Label } from '../Helpers';
import Button from '@/components/Button';

const Employement = () => {
  return (
    <>
      <section className="bg-white  rounded-lg border">
        {/* employment block */}
        <div className="border-b p-4 pb-12">
          <Heading icon={<AiFillContacts />} text="Employment" />
          <div className="grid grid-cols-3 gap-4">
            <article>
              <Label text="Job title*" /> <br />
              <input
                type="text"
                placeholder="Add job title"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
            <article>
              <Label text="Department*" /> <br />
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
              <Label text="Reporting Manager*" /> <br />
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
              <Label text="Employment Type*" /> <br />
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
        {/* social links block */}
        <div className="p-4 pb-12">
          <Heading icon={<AiFillContacts />} text="Payment" />
          <div className="grid grid-cols-3 gap-4">
            <article>
              <Label text="Compensation" /> <br />
              <input
                type="text"
                placeholder="Add annual compensation amount"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
            <article>
              <Label text="Schedule" /> <br />
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
              <Label text="Effective Date" /> <br />
              <input
                type="date"
                placeholder="Add annual compensation amount"
                className="p-2 rounded-md bg-transparent border w-full"
              />
            </article>
          </div>
        </div>
      </section>
      <article className="flex justify-end mt-6 gap-x-4">
        <Button name="Back" bg="white" textColor="black" className="px-14" />
        <Button name="Next" className="px-14" />
      </article>
    </>
  );
};

export default Employement;
