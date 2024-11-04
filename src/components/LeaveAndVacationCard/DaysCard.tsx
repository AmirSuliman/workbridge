const DaysCard = ({ daysNum }: { daysNum: String }) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4 row-span-2 w-fit">
      <h6 className="text-xl">{daysNum}</h6>
      <p className="text-xs">days</p>
    </div>
  );
};
export default DaysCard;
