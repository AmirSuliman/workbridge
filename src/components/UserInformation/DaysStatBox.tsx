type DaysStatBoxProps = {
  value: number;
  label: string;
};

const DaysStatBox = ({ value, label }: DaysStatBoxProps) => {
  return (
    <div className='flex flex-col border border-gray-border items-center justify-center rounded-[7px] h-full p-2 lg:p-4'>
      <span className='text-lg text-dark-navy font-[400]'>{value ?? 0}</span>
      <span className='text-xs text-center text-dark-navy'>{label}</span>
    </div>
  );
};

export default DaysStatBox;
