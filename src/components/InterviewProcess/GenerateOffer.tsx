import { RxCross2 } from 'react-icons/rx';
import Button from '../Button';

const GenerateOffer = ({
  setShowOffer,
}: {
  setShowOffer: (value: boolean) => void;
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000]/50 flex items-center justify-center z-50">
      <div className="max-w-4xl my-4 lg:my-8 p-4 bg-white rounded-lg">
        <header className="flex items-center gap-4 justify-between pb-4 border-b-[1px] border-[#E0E0E0]">
          <h2 className="font-semibold text-lg">Offer</h2>
          <button className="w-fit h-fit" onClick={() => setShowOffer(false)}>
            <RxCross2 />
          </button>
        </header>
        <main className="overflow-y-auto my-8">
          <h6 className="font-medium text-xs opacity-50">Job Title</h6>
          <h1 className="font-medium text-xl">Software Engineer </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6">
            <div>
              <h6 className="font-medium text-xs opacity-50">Department</h6>
              <h4 className="font-medium text-base">IT Department</h4>
            </div>
            <div>
              <h6 className="font-medium text-xs opacity-50">
                Employment Type
              </h6>
              <h4 className="font-medium text-base">IT Department</h4>
            </div>
            <div>
              <h6 className="font-medium text-xs opacity-50">Min. Exp.</h6>
              <h4 className="font-medium text-base">IT Department</h4>
            </div>
          </div>
          <h6 className="font-medium text-xs opacity-50">Description</h6>
          <p className="font-medium text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip 
          </p>
          <h6 className="font-medium text-xs opacity-50 mt-4">Compensation</h6>
          <h4 className="font-medium text-base">$150,000 - $200,000</h4>
        </main>
        <footer className="">
          <hr />
          <br />
          <Button name="Send Offer" className="w-full max-w-xl mx-auto" />
        </footer>
      </div>
    </div>
  );
};
export default GenerateOffer;