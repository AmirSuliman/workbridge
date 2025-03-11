import UserCelebrationInfo from './UserCelebrationInfo';

const Celebrations = () => {
  return (
    <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4">
      <h1 className="flex items-center gap-4 font-medium text-[18px] mb-4">
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6784 4.0306H8.34505V0.697266H11.6784V4.0306ZM16.6784 15.6973V12.3639H11.6784V7.36393H8.34505V12.3639H3.34505V15.6973H0.0117188V20.6973H20.0117V15.6973H16.6784Z"
            fill="#0F172A"
          />
        </svg>
        Celebrations
      </h1>
      <div className="divide-y-[1px] divide-[#E8E8E8] space-y-4">
        <UserCelebrationInfo />
        <UserCelebrationInfo />
      </div>
    </section>
  );
};
export default Celebrations;
