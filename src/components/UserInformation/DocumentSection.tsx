import { FaTrash } from 'react-icons/fa';
import { GoPlusCircle } from 'react-icons/go';

import { useState } from 'react';
import FileIcon from '../icons/file-icon';
import FormHeading from './FormHeading';
import InfoGrid from './InfoGrid';
import UploadDocumentModal from './UploadDocumentModal';

const DocumentSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const SelectableCell = (text: string) => {
    return (
      <div className="text-dark-navy text-md items-center justify-start flex gap-2">
        <input
          type="checkbox"
          className="h-3 w-3 cursor-pointer text-[#878b94]"
        />{' '}
        {text}
      </div>
    );
  };
  const values = [
    [
      SelectableCell('ABasdh22mvasd23a.pdf'),
      '31.05.2024',
      '14Mb',
      'PDF',
      '',
      '',
      '',
      <FaTrash key={1} className="text-dark-navy w-5" />,
    ],
  ];
  return (
    <div className="p-2 md:p-5 rounded-md  h-full bg-white border-gray-border ">
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:items-center md:justify-between mb-5">
        <FormHeading
          icon={<FileIcon classNames="w-5 h-5" />}
          text="Documents"
        />
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center text-dark-navy ms-2 ">
            <span className="text-xs ">Sort</span>{' '}
            <p className="p-1 w-[8rem] text-xs border border-gray-border rounded-[5px]">
              Size
            </p>
          </div>
          <button
            onClick={() => {
              setOpenModal(true);
            }}
            type="button"
            className="flex items-center p-1 rounded-[4px] w-[6rem] gap-2 text-white bg-dark-navy text-xs"
          >
            <GoPlusCircle className="w-4" />
            Upload
          </button>
        </div>
      </div>
      <InfoGrid
        headers={['Document Name', 'Date Uploaded', 'Size', 'File Type']}
        values={values}
      />
      {openModal && (
        <UploadDocumentModal
          onClose={() => {
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
};

export default DocumentSection;
