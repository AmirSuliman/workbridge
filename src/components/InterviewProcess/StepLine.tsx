import cn from 'classnames';

const StepLine = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'bg-background border-[1px] border-[#E8E8E8] w-full h-[5.81px]',
        className
      )}
    ></div>
  );
};
export default StepLine;
