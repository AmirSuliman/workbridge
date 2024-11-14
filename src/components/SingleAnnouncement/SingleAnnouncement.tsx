import IconWithBg from './IconWithBg';

const SingleAnnouncement = ({
  bgColor,
  description,
  icon,
}: {
  bgColor: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <article
      className={`flex items-center flex-wrap md:flex-nowrap gap-3 py-3 px-4`}
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
