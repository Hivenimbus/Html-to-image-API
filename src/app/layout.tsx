import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML to Image API',
  description: 'Convert HTML to PNG images via API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}