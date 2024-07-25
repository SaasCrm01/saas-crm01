"use client";

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        {/* Outros meta dados e links */}
      </head>
      <body className={inter.className}>
        <div className="d-flex">
          {pathname !== '/login' && pathname !== '/register' && pathname !== '/' && <Navbar />}
          <main className="main-content flex-grow-1 p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
