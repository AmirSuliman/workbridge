'use client'
import { FaTrash } from 'react-icons/fa';
import { GoPlusCircle } from 'react-icons/go';
import { useEffect, useState } from 'react';
import Modal from '../modal';
import FileIcon from '../icons/file-icon';
import FormHeading from './FormHeading';
import InfoGrid from './InfoGrid';
import UploadDocumentModal from './UploadDocumentModal';
import DeleteDocumentModal from './DeleteDocumentModal';
import { Document, Page, pdfjs } from 'react-pdf';
import mammoth from 'mammoth';
import Image from 'next/image';
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
    <div className="text-dark-navy text-md items-center justify-start flex gap-2 cursor-pointer" onClick={() => onClick(document)}>
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

const DocumentSection = ({ employeeData }: { employeeData?: EmployeeDataType }) => {
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [sortOption, setSortOption] = useState<'size' | 'date'>('size');
  const [documents, setDocuments] = useState<DocumentType[]>(employeeData?.documents ?? []);
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null);
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const [documentContent, setDocumentContent] = useState<string>(''); 
  const [pdfPageNumber, setPdfPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
 // const [numPages, setNumPages] = useState(null);
//const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

{/*useEffect(() => {
  if (selectedDocument?.url) {
    fetch(selectedDocument.url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setPdfBlobUrl(url);
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
        setError("Failed to load PDF.");
      });
  }
}, [selectedDocument]);

<Document
  file={pdfBlobUrl} // ✅ Use the blob URL
  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
>
  <Page pageNumber={pdfPageNumber} />
</Document>*/}



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
        createdAt: newDoc.EmployeeDocument?.createdAt || new Date().toISOString(),
      },
      size: newDoc.size || 0, 
    };
  
    setDocuments((prevDocuments) => [updatedDoc, ...prevDocuments]); 
  };

  useEffect(() => {
    setDocuments(employeeData?.documents ?? []);
  }, [employeeData]);

  const handleDocumentOpen = async (document) => {

    window.open(document.url, '_blank');
  
    setSelectedDocument(document);
    setOpenDocumentModal(true);
    setIsLoading(true);
  
    console.log("Document fileType:", document.fileType);
    console.log("Document fileUrl:", document.url);
  
    if (document.fileType === 'application/pdf' || document.fileType === 'pdf') {
      try {
        const response = await fetch(document.url);
        if (!response.ok) throw new Error(`PDF not found, status code: ${response.status}`);
        console.log('PDF fetched successfully');
        setDocumentContent('');
        setIsLoading(false);
      } catch (error) {
        setError(`Error loading PDF file. Please check the URL or try again. Details: ${(error as Error).message}`);
        console.log("Error loading PDF:", error);
        setIsLoading(false);
      }
    } else if (document.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      try {
        const arrayBuffer = await fetch(document.url).then((res) => res.arrayBuffer());
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setDocumentContent(result.value);
        setIsLoading(false);
      } catch (error) {
        setError("Error loading Word document content.");
        console.log("Error loading Word document:", error);
        setIsLoading(false);
      }
    } else {
      setDocumentContent('This file type is not supported for content preview.');
      console.log("Unsupported file type:", document.fileType);
      setIsLoading(false);
    }
  };
  
  const sortedDocuments = [...documents].sort((a, b) => {
    const dateA = a.EmployeeDocument?.createdAt ? new Date(a.EmployeeDocument.createdAt).getTime() : 0;
    const dateB = b.EmployeeDocument?.createdAt ? new Date(b.EmployeeDocument.createdAt).getTime() : 0;
    return dateA - dateB;
  });
  
  
  

  const values = documents?.map((document) => {
    const sizeInBytes = document.size ?? 0;
    const sizeInKB = sizeInBytes / 1024;
    const formattedSize =
      sizeInKB >= 1024
        ? `${(sizeInKB / 1024).toFixed(2)} MB`
        : `${sizeInKB.toFixed(2)} KB`;
  
    return [
      SelectableCell(document.fileName, document, handleDocumentOpen),
      document?.EmployeeDocument?.createdAt ? document.EmployeeDocument.createdAt.split('T')[0] : 'N/A',
      formattedSize,
      document.fileType ? getFileExtension(document.fileType) : '',
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
  />,
    ];
  });

  return (
    <div className="p-2 md:p-5 rounded-md h-full bg-white border-gray-border">
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:items-center md:justify-between mb-5">
        <FormHeading icon={<Image src="/document.svg" alt='img' width={15} height={15} />} text="Documents" />
        <div className="flex items-center gap-4">
          <label className="flex gap-3 items-center text-dark-navy ms-2 ">
            <span className="text-[14px] text-gray-400">Sort</span>{' '}
            <select
              value={sortOption}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                setSortOption(e.target.value as 'size' | 'date')}
                            className="outline-none text-xs p-2 border w-[150px] rounded-md"
            >
              <option value="size">Size</option>
              <option value="date">Date</option>
            </select>
          </label>
          <button
            onClick={() => setOpenModal(true)}
            type="button"
            className="flex items-center p-2 rounded-[4px] w-[6rem] gap-2 text-white bg-dark-navy text-xs"
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

    {/*{openDocumentModal && selectedDocument && (
  <Modal onClose={() => setOpenDocumentModal(false)}>
    <div className="p-5">
      <h2 className="text-xl font-semibold">{selectedDocument.fileName}</h2>
      
      {isLoading ? (
        <div>Loading document...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : selectedDocument.fileType === 'application/pdf' ? (
        <div className="flex flex-col items-center">
          <Document
            file={{ url: selectedDocument.url }}
            onLoadSuccess={({ numPages }) => {
              console.log("PDF Loaded. Pages:", numPages);
              setNumPages(numPages);
              setPdfPageNumber(1);
            }}
            onLoadError={(error) => {
              console.error("Error loading PDF:", error);
              setError(`Error loading PDF: ${error.message}`);
            }}
          >
            <Page pageNumber={pdfPageNumber} />
          </Document>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setPdfPageNumber((prev) => Math.max(prev - 1, 1))}
              disabled={pdfPageNumber <= 1}
              className="p-2 bg-gray-300 rounded"
            >
              Previous
            </button>
            <span>Page {pdfPageNumber} / {numPages}</span>
            <button
              onClick={() => setPdfPageNumber((prev) => Math.min(prev + 1, numPages))}
              disabled={pdfPageNumber >= numPages}
              className="p-2 bg-gray-300 rounded"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4" dangerouslySetInnerHTML={{ __html: documentContent }} />
      )}
    </div>
  </Modal>
)}  */}

    </div>
  );
};

export default DocumentSection;
