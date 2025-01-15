import { FaTrash } from 'react-icons/fa';
import { GoPlusCircle } from 'react-icons/go';
import { useEffect, useState } from 'react';

import FileIcon from '../icons/file-icon';
import FormHeading from './FormHeading';
import InfoGrid from './InfoGrid';
import UploadDocumentModal from './UploadDocumentModal';
import DeleteDocumentModal from './DeleteDocumentModal';

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

const getFileExtension = (mimeType) => {
  const mimeToExtensionMap = {
    pdf: '.pdf',
    msword: '.doc',
    'vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  };
  return mimeToExtensionMap[mimeType] || '';
};

const DocumentSection = ({ employeeData }) => {
  console.log(employeeData);
  const [documentId, setDocumentId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [sortOption, setSortOption] = useState('size'); // Default sorting by size
  const [sortedDocuments, setSortedDocuments] = useState<any[]>([]);

  useEffect(() => {
    if (!employeeData || !employeeData.documents) {
      setSortedDocuments([]); // Fallback to an empty array if data is unavailable
      return;
    }

    const sorted = [...employeeData.documents];

    if (sortOption === 'size') {
      sorted.sort((a, b) => a.size - b.size);
    } else if (sortOption === 'date') {
      sorted.sort(
        (a, b) =>
          new Date(a.EmployeeDocument.createdAt).getTime() -
          new Date(b.EmployeeDocument.createdAt).getTime()
      );
    }

    setSortedDocuments(sorted);
  }, [sortOption, employeeData.documents, employeeData]);

  const values = sortedDocuments?.map((document) => {
    const sizeInBytes = document.size ?? 0;
    const sizeInKB = sizeInBytes / 1024;
    const formattedSize =
      sizeInKB >= 1024
        ? `${(sizeInKB / 1024).toFixed(2)} MB`
        : `${sizeInKB.toFixed(2)} KB`;

    return [
      SelectableCell(document.fileName),
      document?.EmployeeDocument.createdAt.split('T')[0],
      formattedSize,
      document.fileType ? getFileExtension(document.fileType) : '',
      ,
      '',
      '',
      '',
      <FaTrash
        onClick={() => {
          setDocumentId(document.id);
          setOpenDeleteModal(true);
        }}
        key={1}
        className="text-dark-navy w-5"
      />,
    ];
  });
  return (
    <div className="p-2 md:p-5 rounded-md  h-full bg-white border-gray-border ">
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:items-center md:justify-between mb-5">
        <FormHeading
          icon={<FileIcon classNames="w-5 h-5" />}
          text="Documents"
        />
        <div className="flex items-center gap-4">
          <label className="flex gap-2 items-center text-dark-navy ms-2 ">
            <span className="text-xs ">Sort</span>{' '}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="outline-none text-xs"
            >
              <option value="size">Size</option>
              <option value="date">Date</option>
            </select>
          </label>
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
          employeeData={employeeData}
          onClose={() => {
            setOpenModal(false);
          }}
        />
      )}
      {openDeleteModal && (
        <DeleteDocumentModal
          onClose={() => {
            setOpenDeleteModal(false);
          }}
          employeeId={employeeData.id}
          documentId={documentId}
        />
      )}
    </div>
  );
};

export default DocumentSection;
