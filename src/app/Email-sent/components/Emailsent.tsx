import Navbar from '@/views/AuthenticationViews/nav';
import Image from 'next/image';
import Footer from '@/views/AuthenticationViews/footer';

const Emailsent = () => {
  return (
    <>
      <Navbar />
      <div
        className="h-[400px] "
        style={{
          background: 'linear-gradient(90deg, #0F172A, #11275A)',
        }}
      >
        <div
          className={` flex flex-col items-center justify-start my-auto  mt-32 `}
        >
          <div className="w-[100%] sm:w-[29rem] h-[550px]  z-10 p-4 border rounded-[27px] backdrop-blur-sm bg-white/30 shadow-lg">
            <div className="flex flex-col items-center bg-white rounded-[27px] p-8 h-full shadow-custom-deep pt-[2rem] px-[1rem]">
              <Image
                src="/Flattened (1).svg"
                alt="img"
                width={50}
                height={50}
                className="mt-6"
              />
              <h1 className="text-[30px] mt-2">
                work<span className="font-bold">Bridge</span>
              </h1>

              <h1 className="text-[22px] font-semibold mt-20 mb-2">
                Email Sent!
              </h1>
              <p className="text-center text-[14px]">
                An email has been sent to your inbox. Please check your email
                for the link to reset your password
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white mt-[400px]">
        <Footer />
      </div>
    </>
  );
};

export default Emailsent;
