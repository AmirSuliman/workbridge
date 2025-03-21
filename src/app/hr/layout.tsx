import HRLayout from '@//Layouts/HRLayout';

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <HRLayout>{children}</HRLayout>;
}
