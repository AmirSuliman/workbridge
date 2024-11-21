import IconWithBg from './IconWithBg';
interface SingleAnnouncementProps {
  bgColor: string;
  icon: React.ReactNode;
  description: string;
  onClick: () => void;
}

const SingleAnnouncement: React.FC<SingleAnnouncementProps> = ({
  bgColor,
  icon,
  description,
  onClick,
}) => {
  return (
    <article
      onClick={onClick}
      className={`flex items-center flex-wrap md:flex-nowrap gap-3 py-3 px-4 cursor-pointer`}
    >
      <IconWithBg bgColor={bgColor} icon={icon} />
      <p className="text-sm">{description}</p>
      <p className="opacity-50 font-medium text-sm ml-8 md:ml-auto">
        2 days ago
      </p>
    </article>
  );
};
export default SingleAnnouncement;
