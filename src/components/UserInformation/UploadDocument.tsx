import { HiOutlineUpload } from 'react-icons/hi';

const UploadDocument = ({ fileName, onFileChange, uploadPercentage }) => {
  // const [fileName, setFileName] = useState('Upload document');

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     setFileName(selectedFile.name);
  //     onFileChange(e);
  //   }
  // };

  return (
    <>
      <label
        className={`border-2 border-[rgba(232,232,232,1)] border-dashed rounded py-4 px-8 flex flex-col items-center justify-center ${
          fileName === 'Upload document'
            ? 'cursor-pointer'
            : 'cursor-not-allowed'
        } w-full`}
      >
        <div className="flex gap-2 items-center">
          <span>{fileName}</span>
          {fileName === 'Upload document' && <HiOutlineUpload />}
        </div>
        {fileName === 'Upload document' && (
          <input
            onChange={onFileChange}
            type="file"
            accept=".pdf,.doc,.docx" // Limit file selection to these types
            className="w-full h-0"
          />
        )}
      </label>
      <div className="flex items-center gap-4 w-full mt-2">
        <div className="bg-[rgba(232,232,232,1)] rounded-full w-full h-2 relative">
          <div
            style={{
              width: `${uploadPercentage}%`,
            }}
            className="absolute left-0 top-0 bottom-0 bg-black rounded-full h-2"
          ></div>
        </div>
        <p>{uploadPercentage}%</p>
      </div>
    </>
  );
};

export default UploadDocument;
