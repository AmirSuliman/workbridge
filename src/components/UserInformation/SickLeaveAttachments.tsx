import { useState } from 'react';
import axiosInstance from '@/lib/axios';
import toast from 'react-hot-toast';
import { FaFilePdf, FaImage, FaRegFileWord } from 'react-icons/fa';
import { BiLoaderCircle } from 'react-icons/bi';

interface UploadResult {
  id?: string;
  error?: any;
}

interface SickLeaveAttachmentsProps {
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  selectedFiles: File[];
}

const SickLeaveAttachments: React.FC<SickLeaveAttachmentsProps> = ({
  selectedFiles,
  setSelectedFiles,
}) => {
  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      // Convert FileList to array
      const filesArray = Array.from(event.target.files);

      // Filter valid files
      const validFiles = filesArray.filter((file) => {
        const isValid =
          file.type.startsWith('image/') ||
          file.type === 'application/pdf' ||
          file.type === 'application/msword' ||
          file.type ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

        if (!isValid) {
          toast.error(
            `File "${file.name}" is not allowed. Only images, PDFs, and documents are accepted.`
          );
        }
        return isValid;
      });

      if (validFiles.length === 0) return;

      // Add to selected files
      setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);

      // Clear the input so the same file can be selected again
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  // Remove a file
  const handleRemoveFile = (index: number) => {
    setSelectedFiles((files) => files.filter((_, i) => i !== index));
  };

  // Get file icon based on its name
  const getFileIcon = (fileName: string) => {
    const lowerName = fileName.toLowerCase();
    if (lowerName.endsWith('.pdf')) {
      return <FaFilePdf className="text-red-500" />;
    } else if (
      lowerName.endsWith('.jpg') ||
      lowerName.endsWith('.jpeg') ||
      lowerName.endsWith('.png') ||
      lowerName.endsWith('.gif') ||
      lowerName.endsWith('.webp')
    ) {
      return <FaImage className="text-blue-500" />;
    } else if (lowerName.endsWith('.doc') || lowerName.endsWith('.docx')) {
      return <FaRegFileWord className="text-blue-700" />;
    } else {
      return <FaRegFileWord className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <label className="px-4 py-3 bg-dark-navy text-white rounded w-full cursor-pointer flex items-center justify-center">
        Select Attachments
        <input
          type="file"
          name="files"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
      </label>

      {selectedFiles.length > 0 && (
        <div className="mt-2 p-3 border border-gray-200 rounded-md overflow-y-auto">
          <h4 className="font-medium mb-2">
            Selected Attachments ({selectedFiles.length})
          </h4>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  {getFileIcon(file.name)}
                  <span className="truncate max-w-xs">{file.name}</span>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 p-1"
                  onClick={() => handleRemoveFile(index)}
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to upload files that can be used in the form submission handler
export const uploadFiles = async (files: File[]): Promise<string[]> => {
  if (files.length === 0) return [];

  const uploadPromises = files.map((file) => uploadFile(file));
  const results = await Promise.all(uploadPromises);

  // Filter successful uploads and get the IDs
  const fileIds = results
    .filter((result) => !result.error && result.id)
    .map((result) => result.id as string);

  return fileIds;
};

// Upload a single file
const uploadFile = async (file: File): Promise<UploadResult> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axiosInstance.post('/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { id: response.data.data.id };
  } catch (err) {
    console.error(`Error uploading ${file.name}:`, err);
    return { error: err };
  }
};

export default SickLeaveAttachments;
