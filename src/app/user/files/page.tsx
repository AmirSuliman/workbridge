'use client';

import FormHeading from '@/components/UserInformation/FormHeading';
import InfoGrid from '@/components/UserInformation/InfoGrid';
import axiosInstance from '@/lib/axios';
import mammoth from 'mammoth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface DocumentType {
  id: number;
  fileName: string;
  fileTitle: string;
  fileType: string;
  size?: number;
  url: string;
  EmployeeDocument?: {
    createdAt?: string;
  };
}

const SelectableCell = (text, document, onClick) => {
  return (
    <div
      className="text-dark-navy text-md items-center justify-start flex gap-2 cursor-pointer"
      onClick={() => onClick(document)}
    >
      {/* <input
        type="checkbox"
        className="h-3 w-3 cursor-pointer text-[#878b94]"
      />{' '} */}
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

const Page = () => {
  const [documents, setDocuments] = useState<DocumentType[]>([]);

  const [documentContent, setDocumentContent] = useState<string>('');

  const { data: session } = useSession();
  useEffect(() => {
    const getEmployeeDocument = async () => {
      try {
        // actual API endpoint is (/employee/4/documents) but
        // this does not have correct information such as name, type, size
        // therefore I am pulling docs from employee/id API

        const response = await axiosInstance.get(
          `/employee/${session?.user.employeeId}`,
          {
            params: { associations: true },
          }
        );
        // console.log('doc res: ', response.data.data.documents);
        setDocuments(response.data.data.documents);
      } catch (error) {
        console.log('error: ', error);
      }
    };
    getEmployeeDocument();
  }, []);

  const handleDocumentOpen = async (doc) => {
    const isEdge = window.navigator.userAgent.indexOf('Edg') > -1;
    const isOfficeDoc =
      doc.fileType.includes('openxmlformats-officedocument') ||
      doc.fileType === 'msword';

    if (isEdge && isOfficeDoc) {
      const link = document.createElement('a');
      link.href = doc.url;
      link.setAttribute('download', doc.fileName);
      link.setAttribute('target', '_self');
      link.click();
    } else {
      window.open(doc.url, '_blank');
    }

    if (doc.fileType === 'application/pdf' || doc.fileType === 'pdf') {
      try {
        const response = await fetch(doc.url);
        if (!response.ok)
          throw new Error(`PDF not found, status code: ${response.status}`);
        console.log('PDF fetched successfully');
        setDocumentContent('');
      } catch (error) {
        console.log('Error loading PDF:', error);
      }
    } else if (
      doc.fileType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      try {
        const arrayBuffer = await fetch(doc.url).then((res) =>
          res.arrayBuffer()
        );
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setDocumentContent(result.value);
      } catch (error) {
        console.log('Error loading Word document:', error);
      }
    } else {
      setDocumentContent(
        'This file type is not supported for content preview.'
      );
      console.log('Unsupported file type:', doc.fileType);
    }
  };

  const values = documents?.map((document) => {
    const sizeInBytes = document.size ?? 0;
    const sizeInKB = sizeInBytes / 1024;
    const formattedSize =
      sizeInKB >= 1024
        ? `${(sizeInKB / 1024).toFixed(2)} MB`
        : `${sizeInKB.toFixed(2)} KB`;

    return [
      SelectableCell(
        document.fileTitle ? document.fileTitle : document.fileName,
        document,
        handleDocumentOpen
      ),
      document?.EmployeeDocument?.createdAt
        ? document.EmployeeDocument.createdAt.split('T')[0]
        : 'N/A',
      formattedSize,
      document.fileType ? getFileExtension(document.fileType) : '',
    ];
  });

  return (
    <div className="p-2 md:p-5 rounded-md h-full bg-white border-gray-border m-4">
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:items-center md:justify-between mb-5">
        <FormHeading
          icon={<Image src="/document.svg" alt="img" width={15} height={15} />}
          text="Documents"
        />
        {/* <div className="flex items-center gap-4">
          <label className="flex gap-3 items-center text-dark-navy ms-2 ">
            <span className="text-[14px] text-gray-400">Sort</span>{' '}
            <select
              value={sortOption}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSortOption(e.target.value as 'size' | 'date')
              }
              className="outline-none text-xs p-2 border w-[150px] rounded-md"
            >
              <option value="size">Size</option>
              <option value="date">Date</option>
            </select>
          </label>
        </div> */}
      </div>
      <InfoGrid
        headers={['Document Name', 'Date Uploaded', 'Size', 'File Type']}
        values={values}
      />
    </div>
  );
};

export default Page;
