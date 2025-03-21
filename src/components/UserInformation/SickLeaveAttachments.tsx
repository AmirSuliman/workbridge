import { useCallback, useState } from 'react';
import Button from '../Button';
import Modal from '../modal';
import axiosInstance from '@/lib/axios';
import toast from 'react-hot-toast';
import { FaFilePdf, FaImage, FaRegFileWord } from 'react-icons/fa';
import { BiLoaderCircle } from 'react-icons/bi';

const SickLeaveAttachments = ({ fileIds, setFileIds }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Handle file selection
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        // Convert FileList to array
        const filesArray = Array.from(event.target.files);

        // You can add file type validation here if needed
        // For example, to allow multiple file types:
        const validFiles = filesArray.filter((file) => {
          // Allow images, PDFs, and docs
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

        setSelectedFiles(validFiles);

        if (validFiles.length > 0) {
          setShowModal(true);
        }
      }
    },
    []
  );

  // Upload all selected files
  const handleUploadAll = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload.');
      return;
    }

    setIsUploading(true);

    try {
      const uploadPromises = selectedFiles.map((file) => uploadFile(file));
      const results = await Promise.all(uploadPromises);

      // Filter out any failed uploads and get just the IDs
      const newFileIds = results
        .filter((result) => !result.error)
        .map((result) => result.id);

      // Update the fileIds array with the new IDs
      setFileIds((prevFileIds) => [...prevFileIds, ...newFileIds]);

      toast.success(`Successfully uploaded ${newFileIds.length} file(s).`);
      setShowModal(false);
      setSelectedFiles([]);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Upload a single file
  const uploadFile = async (file) => {
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

  // Cancel uploads and clear selected files
  const handleCancel = () => {
    setSelectedFiles([]);
    setShowModal(false);
  };

  return (
    <>
      <label className="px-4 py-3 bg-dark-navy text-white rounded w-full cursor-pointer flex items-center justify-center">
        Add Attachments
        <input
          type="file"
          name="files"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
      </label>

      {showModal && (
        <Modal onClose={() => !isUploading && handleCancel()}>
          <div className="p-6 w-full min-h-[80svh] sm:w-[610px]">
            <h3 className="text-lg font-semibold mb-4">Upload Files</h3>

            <div className="mb-4 max-h-60 overflow-y-auto px-4">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="py-2 border-b flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span className="mr-2">
                      {file.type.startsWith('image/') ? (
                        <FaImage />
                      ) : file.type === 'application/pdf' ? (
                        <FaFilePdf />
                      ) : (
                        <FaRegFileWord />
                      )}
                    </span>
                    <span className="truncate max-w-xs">{file.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <Button
                bg="white"
                textColor="black"
                onClick={handleCancel}
                name="Cancel"
                icon=""
                disabled={isUploading}
              />
              <Button
                onClick={handleUploadAll}
                name={isUploading ? '' : 'Save'}
                icon={
                  isUploading ? (
                    <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
                  ) : (
                    ''
                  )
                }
                disabled={isUploading}
              />
            </div>
          </div>
        </Modal>
      )}

      {fileIds.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">
            Uploaded Files ({fileIds.length})
          </h4>
          {/* <div className="flex flex-wrap gap-2">
            {fileIds.map((id, index) => (
              <div
                key={id}
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center text-sm"
              >
                <span>File #{index + 1}</span>
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() =>
                    setFileIds(fileIds.filter((fileId) => fileId !== id))
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div> */}
        </div>
      )}
    </>
  );
};

export default SickLeaveAttachments;
