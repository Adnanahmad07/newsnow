import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import AuthenticatedLayout from './components/AuthenticatedLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NewsNow',
  description: 'Stay updated with the latest news!',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <AuthenticatedLayout>
            <main>{children}</main>
          </AuthenticatedLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}