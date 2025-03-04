import cn from 'classnames';

const UserImgPlaceholder = ({
  className,
  name,
}: {
  className?: string;
  name: string;
}) => {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
  return (
    <div
      className={cn(
        'rounded-full border-[0.5px] bg-[#F5F6FA] border-[#E8E8E8] flex items-center justify-center size-[32px] p-5 flex-grow-0 shrink-0 font-medium text-xs uppercase',
        className
      )}
    >
      <p className="opacity-50 ">{initials}</p>
    </div>
  );
};
export default UserImgPlaceholder;
