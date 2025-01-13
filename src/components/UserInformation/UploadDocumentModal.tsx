import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useState } from 'react';

import toast from 'react-hot-toast';
import Button from '../Button';
import Modal from '../modal/Modal';
import UploadDocument from './UploadDocument';
import { BiLoaderCircle } from 'react-icons/bi';

const UploadDocumentModal = ({ onClose, employeeData }) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [fileName, setFileName] = useState('Upload document');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error('Only PDF and DOC files are allowed.');
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error('Please select a file before submitting.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', file.type);
      formData.append('size', file.size.toString());
      setLoading(true);
      const response = await axiosInstance.post(
        `/employee/${employeeData.id}/document/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              progressEvent.total
                ? (progressEvent.loaded * 100) / progressEvent.total
                : 0
            );
            setUploadPercentage(percentCompleted);
          },
        }
      );

      toast.success('File uploaded successfully!');
      setLoading(false);
      onClose();
      console.log(response);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setUploadPercentage(0);

      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Failed to upload file.');
      } else {
        toast.error('Failed to upload file.');
      }
    }
  };

  return (
    <Modal onClose={onClose}>
      <section className="w-full p-8">
        <UploadDocument
          fileName={fileName}
          onFileChange={handleFileChange}
          uploadPercentage={uploadPercentage}
        />
        <div className="flex items-center gap-4 justify-center mt-4">
          <Button
            disabled={loading}
            onClick={handleSubmit}
            name={loading ? '' : 'Save'}
            icon={
              loading && (
                <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
              )
            }
            className="disabled:cursor-not-allowed"
          />
          <Button
            onClick={onClose}
            bg="transparent"
            textColor="black"
            name="Cancel"
          />
        </div>
      </section>
    </Modal>
  );
};

export default UploadDocumentModal;
