import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Outros meta dados e links */}
      </head>
      <body className={inter.className}>
        <div className="d-flex">
          <Navbar />
          <main className="flex-grow-1 p-4 main-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
