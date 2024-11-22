import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { AiFillContacts } from 'react-icons/ai';
import { Heading, Label } from '../Helpers';
import Button from '@/components/Button';
import { CiCirclePlus } from 'react-icons/ci';
import { TbEdit } from 'react-icons/tb';
import { IoTrash } from 'react-icons/io5';
import { MdOutlineFileUpload } from 'react-icons/md';
const files = [
  {
    name: 'ioasdh22mvasd23a.pdf',
    dateUploaded: '24.02.2024',
    size: '14mb',
    fileType: 'PDF',
  },
  // Add more files as needed
];
const Documents = () => {
  return (
    <>
      <section className="bg-white  rounded-lg border p-4">
        {/* top kind of header and button section */}
        <div className="flex justify-between items-start">
          <h1 className="flex items-center gap-x-2 font-medium text-lg mb-16">
            <FaFileAlt /> Documents
          </h1>
          <article className="flex w-1/4 gap-x-2 items-center">
            <Label text="Sort" />
            <select className="flex-1 bg-transparent border rounded-md p-1">
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
            </select>
            <Button name="Upload" icon={<CiCirclePlus />} />
          </article>
        </div>
        {/* table section */}
        <div className="w-full  overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-gray-500 text-sm">
                <th className="text-left px-4 py-2 font-medium w-[40%]">
                  Document Name
                </th>
                <th className="text-left px-4 py-2 font-medium">
                  Date Uploaded
                </th>
                <th className="text-left px-4 py-2 font-medium">Size</th>
                <th className="text-left px-4 py-2 font-medium">Filetype</th>
                <th className="px-4 py-2 w-[120px]">
                  <Button
                    name="Download"
                    bg="#e0e0e0"
                    textColor="#929292"
                    icon={<MdOutlineFileUpload className="w-4 h-4" />}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                      <span className="text-gray-900">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {file.dateUploaded}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{file.size}</td>
                  <td className="px-4 py-3 text-gray-600">{file.fileType}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Edit"
                      >
                        <TbEdit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Delete"
                      >
                        <IoTrash className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Documents;
