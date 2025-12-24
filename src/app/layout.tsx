import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer, SiteRights } from '@/features/layout';
import I18nProvider from '@/providers/I18nProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthChecker } from '@/features/layout/components/Auth/AuthChecker';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'دنتالیت',
    template: '%s | دنتالیت',
  },
  description: 'Admin panel with modular structure and global sidebar.',
  applicationName: 'دنتالیت',
  generator: 'Next.js',
  keywords: ['دنتالیت', 'دندانپزشکی', 'dashboard', 'nextjs', 'tailwind'],
  authors: [{ name: 'test' }],
  openGraph: {
    type: 'website',
    url: '/',
    title: 'دنتالیت',
    description: 'Admin panel with modular structure and global sidebar.',
    siteName: 'دنتالیت',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'دنتالیت',
    description: 'Admin panel with modular structure and global sidebar.',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fa' dir='rtl' className='font-fa'>
      <body>
        <I18nProvider>
          <AuthChecker />
          <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='flex-1'>{children}</main>
            <SiteRights />
          </div>
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </I18nProvider>
      </body>
    </html>
  );
}
