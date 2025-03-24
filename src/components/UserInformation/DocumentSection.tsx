'use client';
import mammoth from 'mammoth';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { GoPlusCircle } from 'react-icons/go';
import { pdfjs } from 'react-pdf';
import DeleteDocumentModal from './DeleteDocumentModal';
import FormHeading from './FormHeading';
import InfoGrid from './InfoGrid';
import UploadDocumentModal from './UploadDocumentModal';
import { InnerUser } from '@/types/next-auth';
import { useParams } from 'next/navigation';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface DocumentType {
  id: number;
  fileName: string;
  fileType: string;
  size?: number;
  url: string;
  EmployeeDocument?: {
    createdAt?: string;
  };
}

interface EmployeeDataType {
  id: number;
  documents?: DocumentType[];
}
const SelectableCell = (text, document, onClick) => {
  return (
    <div
      className="text-dark-navy text-md items-center justify-start flex gap-2 cursor-pointer"
      onClick={() => onClick(document)}
    >
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

const DocumentSection = ({
  employeeData,
}: {
  employeeData?: EmployeeDataType;
}) => {
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { empId } = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [sortOption, setSortOption] = useState<'size' | 'date'>('size');
  const [documents, setDocuments] = useState<DocumentType[]>(
    employeeData?.documents ?? []
  );
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(
    null
  );
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const [documentContent, setDocumentContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [role, setRole] = useState<string>();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setRole(session?.user?.role);
    };
    fetchSession();
  }, []);

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';

  const handleDocumentDelete = (deletedDocumentId: number) => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((document) => document.id !== deletedDocumentId)
    );
  };

  const handleNewDocument = (newDoc: DocumentType) => {
    if (!newDoc) return;

    const updatedDoc = {
      ...newDoc,
      EmployeeDocument: {
        ...newDoc.EmployeeDocument,
        createdAt:
          newDoc.EmployeeDocument?.createdAt || new Date().toISOString(),
      },
      size: newDoc.size || 0,
    };

    setDocuments((prevDocuments) => [updatedDoc, ...prevDocuments]);
  };

  useEffect(() => {
    setDocuments(employeeData?.documents ?? []);
  }, [employeeData]);

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

    setSelectedDocument(doc);
    setOpenDocumentModal(true);
    setIsLoading(true);

    if (doc.fileType === 'application/pdf' || doc.fileType === 'pdf') {
      try {
        const response = await fetch(doc.url);
        if (!response.ok)
          throw new Error(`PDF not found, status code: ${response.status}`);
        console.log('PDF fetched successfully');
        setDocumentContent('');
        setIsLoading(false);
      } catch (error) {
        setError(
          `Error loading PDF file. Please check the URL or try again. Details: ${
            (error as Error).message
          }`
        );
        console.log('Error loading PDF:', error);
        setIsLoading(false);
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
        setIsLoading(false);
      } catch (error) {
        setError('Error loading Word document content.');
        console.log('Error loading Word document:', error);
        setIsLoading(false);
      }
    } else {
      setDocumentContent(
        'This file type is not supported for content preview.'
      );
      console.log('Unsupported file type:', doc.fileType);
      setIsLoading(false);
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
      SelectableCell(document.fileName, document, handleDocumentOpen),
      document?.EmployeeDocument?.createdAt
        ? document.EmployeeDocument.createdAt.split('T')[0]
        : 'N/A',
      formattedSize,
      document.fileType ? getFileExtension(document.fileType) : '',
      // if it is user panel and you are viewing other employee info
      // then hide edit button
      isUserPanel && empId ? (
        ''
      ) : (
        <Image
          src="/delete.svg"
          alt="Delete"
          width={12}
          height={12}
          onClick={() => {
            setDocumentId(document.id);
            setOpenDeleteModal(true);
          }}
          key={1}
          className=" cursor-pointer"
        />
      ),
    ];
  });

  return (
    <div className="p-2 md:p-5 rounded-md h-full bg-white border-gray-border">
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:items-center md:justify-between mb-5">
        <FormHeading
          icon={<Image src="/document.svg" alt="img" width={15} height={15} />}
          text="Documents"
        />
        <div className="flex items-center gap-4">
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
          {isUserPanel && empId ? (
            ''
          ) : (
            <button
              onClick={() => setOpenModal(true)}
              type="button"
              className="flex items-center p-2 rounded-[4px] w-[6rem] gap-2 text-white bg-dark-navy text-xs"
            >
              <GoPlusCircle className="w-4" />
              Upload
            </button>
          )}
        </div>
      </div>
      <InfoGrid
        headers={['Document Name', 'Date Uploaded', 'Size', 'File Type']}
        values={values}
      />

      {openModal && (
        <UploadDocumentModal
          onClose={() => setOpenModal(false)}
          employeeData={employeeData}
          onDocumentUpload={handleNewDocument}
        />
      )}
      {openDeleteModal && (
        <DeleteDocumentModal
          onClose={() => setOpenDeleteModal(false)}
          employeeId={employeeData?.id ?? 0}
          documentId={documentId}
          onDocumentDelete={handleDocumentDelete}
        />
      )}
    </div>
  );
};

export default DocumentSection;
