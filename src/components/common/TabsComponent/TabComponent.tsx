import { useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

const TabComponent = ({
  index,
  isRootTab = false,
  children,
}: {
  index: string;
  isRootTab?: boolean;
  children: ReactNode;
}) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  return <>{(isRootTab ? !tab || tab === index : tab === index) && children}</>;
};
export default TabComponent;
