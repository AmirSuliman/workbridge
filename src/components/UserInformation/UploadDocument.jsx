const UploadDocument = () => {
  const uploadPercentage = 50;
  return (
    <>
      <label className="border-2 border-[rgba(232,232,232,1)] border-dashed rounded py-4 px-8 flex flex-col items-center justify-center cursor-pointer w-full">
        <div type="button" className="flex gap-2 items-center">
          <span>Upload document</span>
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.96875 9.09668C5.96875 9.51089 6.30454 9.84668 6.71875 9.84668C7.13296 9.84668 7.46875 9.51089 7.46875 9.09668L7.46875 3.40734L9.68842 5.62701C9.98131 5.9199 10.4562 5.9199 10.7491 5.62701C11.042 5.33412 11.042 4.85924 10.7491 4.56635L7.24908 1.06635C6.95619 0.773456 6.48131 0.773456 6.18842 1.06635L2.68842 4.56635C2.39553 4.85924 2.39553 5.33412 2.68842 5.62701C2.98131 5.9199 3.45619 5.9199 3.74908 5.62701L5.96875 3.40734L5.96875 9.09668Z"
              fill="#0F172A"
            />
            <path
              d="M2.21875 8.59668C2.21875 8.18247 1.88296 7.84668 1.46875 7.84668C1.05454 7.84668 0.71875 8.18247 0.71875 8.59668V10.0967C0.71875 11.6155 1.94997 12.8467 3.46875 12.8467H9.96875C11.4875 12.8467 12.7188 11.6155 12.7188 10.0967V8.59668C12.7188 8.18247 12.383 7.84668 11.9688 7.84668C11.5545 7.84668 11.2188 8.18247 11.2188 8.59668V10.0967C11.2188 10.787 10.6591 11.3467 9.96875 11.3467H3.46875C2.77839 11.3467 2.21875 10.787 2.21875 10.0967V8.59668Z"
              fill="#0F172A"
            />
          </svg>
        </div>
        <input type="file" className="w-full h-0" />
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
