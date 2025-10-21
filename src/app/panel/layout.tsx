import { SideMenu } from '@/features/layout/components/SideMenu/SideMenu';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex'>
      <SideMenu />
      <main className='flex-1 p-8'>{children}</main>
    </div>
  );
}
