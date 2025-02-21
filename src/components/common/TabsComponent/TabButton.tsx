import { useRouter, useSearchParams } from 'next/navigation';

const TabButton = ({
  name,
  href,
  isRootTab = false,
}: {
  name: string;
  href: string;
  isRootTab?: boolean;
}) => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  const index = href.split('tab=')[1];

  return (
    <button
      type="button"
      className={`px-[4%] text-xs  py-3 text-dark-navy  whitespace-nowrap  ${
        isRootTab
          ? !tab || tab === index
            ? 'font-semibold border-b-2 !border-dark-navy'
            : ''
          : tab === index
          ? 'font-semibold border-b-2 !border-dark-navy'
          : ''
      }`}
      onClick={(e) => {
        e.preventDefault();
        route.push(href);
      }}
    >
      {name}
    </button>
  );
};
export default TabButton;
