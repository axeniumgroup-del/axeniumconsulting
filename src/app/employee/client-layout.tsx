export const dynamic = 'force-dynamic';

import EmployeeClientLayout from './client-layout';

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return <EmployeeClientLayout>{children}</EmployeeClientLayout>;
}