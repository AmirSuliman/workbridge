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
  createdAt?: string;
  file: {
    fileName: string;
    fileTitle: string;
    fileType: string;
    size?: number;
    url: string;
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
        const response = await axiosInstance.get(
          `/employee/${session?.user.employeeId}/documents`
        );
        console.log('doc res: ', response.data.data.items);
        setDocuments(response.data.data.items);
      } catch (error) {
        console.log('error: ', error);
      }
    };
    getEmployeeDocument();
  }, [session?.user.employeeId]);

  const handleDocumentOpen = async (doc) => {
    const isEdge = window.navigator.userAgent.indexOf('Edg') > -1;
    const isOfficeDoc =
      doc?.file.fileType.includes('openxmlformats-officedocument') ||
      doc?.file.fileType === 'msword';

    if (isEdge && isOfficeDoc) {
      const link = document.createElement('a');
      link.href = doc?.file.url;
      link.setAttribute('download', doc?.file.fileName);
      link.setAttribute('target', '_self');
      link.click();
    } else {
      window.open(doc?.file.url, '_blank');
    }

    if (
      doc?.file.fileType === 'application/pdf' ||
      doc?.file.fileType === 'pdf'
    ) {
      try {
        const response = await fetch(doc?.file.url);
        if (!response.ok)
          throw new Error(`PDF not found, status code: ${response.status}`);
        console.log('PDF fetched successfully');
        setDocumentContent('');
      } catch (error) {
        console.log('Error loading PDF:', error);
      }
    } else if (
      doc?.file.fileType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      try {
        const arrayBuffer = await fetch(doc?.file.url).then((res) =>
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
      console.log('Unsupported file type:', doc?.file.fileType);
    }
  };

  const values = documents?.map((document) => {
    const sizeInBytes = document?.file.size ?? 0;
    const sizeInKB = sizeInBytes / 1024;
    const formattedSize =
      sizeInKB >= 1024
        ? `${(sizeInKB / 1024).toFixed(2)} MB`
        : `${sizeInKB.toFixed(2)} KB`;

    return [
      SelectableCell(
        document?.file.fileTitle
          ? document?.file.fileTitle
          : document?.file.fileName,
        document,
        handleDocumentOpen
      ),
      document?.createdAt ? document.createdAt.split('T')[0] : 'N/A',
      formattedSize,
      document?.file.fileType ? getFileExtension(document?.file.fileType) : '',
    ];
  });

  return (
    <div className="p-2 md:p-5 rounded-md h-full bg-white border-gray-border m-4">
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:items-center md:justify-between mb-5">
        <FormHeading
          icon={<Image src="/document.svg" alt="img" width={15} height={15} />}
          text="Documents"
        />
      </div>
      <InfoGrid
        headers={['Document Name', 'Date Uploaded', 'Size', 'File Type']}
        values={values}
      />
    </div>
  );
};

export default Page;
