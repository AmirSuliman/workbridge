import Image from 'next/image';

const PolicyIcon = () => {
  return (
    <div
      className={`p-2 cursor-pointer bg-[#F53649] shrink-0 flex-grow-0 rounded-full`}
    >
      <Image
        src="/important_details.png"
        alt="Policy Changes"
        width={20}
        height={20}
      />
    </div>
  );
};
export default PolicyIcon;
