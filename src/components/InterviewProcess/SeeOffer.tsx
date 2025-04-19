import { RxCross2 } from 'react-icons/rx';

const SeeOffer = ({ setShowOffer, jobApplication }) => {
  const offerData = jobApplication?.data?.items[0]?.offer;
  const jobData = jobApplication?.data?.items[0]?.job;
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-[#000000]/50 flex items-center justify-center overflow-y-auto z-50'>
      <div className='max-w-4xl my-4 lg:my-8 p-4 bg-white rounded-lg'>
        <header className='flex items-center gap-4 justify-between pb-4 border-b-[1px] border-[#E0E0E0]'>
          <h2 className='font-semibold text-lg'>Offer</h2>
          <button
            type='button'
            className='w-fit h-fit'
            onClick={() => setShowOffer(false)}
          >
            <RxCross2 />
          </button>
        </header>
        <main className='overflow-y-auto my-8'>
          <h6 className='font-medium text-xs opacity-50'>Job Title</h6>
          <h1 className='font-medium text-xl'>{jobData?.tittle || 'N/A'}</h1>
          <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6'>
            <div>
              <h6 className='font-medium text-xs opacity-50'>Department</h6>
              <h4 className='font-medium text-base'>
                {offerData?.department?.name || 'N/A'}
              </h4>
            </div>
            <div>
              <h6 className='font-medium text-xs opacity-50'>
                Employment Type
              </h6>
              <h4 className='font-medium text-base'>
                {offerData?.employmentType}
              </h4>
            </div>
            <div>
              <h6 className='font-medium text-xs opacity-50'>Min. Exp.</h6>
              <h4 className='font-medium text-base'>
                {offerData?.minYearsExperience}+ Years
              </h4>
            </div>
          </div>
          <h6 className='font-medium text-xs opacity-50'>Description</h6>
          <p className='font-medium text-base'>
            {offerData?.description || 'No description provided'}
          </p>
          <h6 className='font-medium text-xs opacity-50 mt-4'>Compensation</h6>
          <h4 className='font-medium text-base'>${offerData?.compensation}</h4>
        </main>
        <footer className=''>
          <hr />
          {/* this button will send offer as this modal component is called inside the form */}
          {/* <Button
            type="submit"
            name="Send Offer"
            className="w-full max-w-xl mx-auto"
          /> */}
        </footer>
      </div>
    </div>
  );
};
export default SeeOffer;
