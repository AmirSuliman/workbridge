import Image from 'next/image';

export const AnnouncementImage = (type) => {
  switch (type.type) {
    case 'Miscellaneous':
      return (
        <label className={`p-2 cursor-pointer bg-[#00B87D] rounded-full`}>
          <Image
            src="/important_details.png"
            alt="Miscellaneous"
            width={20}
            height={20}
          />
        </label>
      );
    case 'Policy Changes':
      return (
        <label className={`p-2 cursor-pointer bg-[#F53649] rounded-full`}>
          <Image
            src="/important_details.png"
            alt="Policy Changes"
            width={20}
            height={20}
          />
        </label>
      );
    // if announcement type is "Company Activity" or null
    default:
      return (
        <label className={`p-2 cursor-pointer bg-[#0F172A] rounded-full`}>
          <Image
            src="/Union.png"
            alt="Company Activity"
            width={20}
            height={20}
          />
        </label>
      );
  }
};
