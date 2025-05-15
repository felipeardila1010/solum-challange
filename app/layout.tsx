import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Solum Challange',
  description:
    'A user admin dashboard configured with Next.js, Tailwind CSS, TypeScript, and Fastapi.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen w-full flex-col" suppressHydrationWarning>{children}</body>
      <Analytics />
    </html>
  );
}
