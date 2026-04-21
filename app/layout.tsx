import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'InstaMarketer AI - AI-Powered Marketing Automation for D2C Brands',
  description:
    'Transform your D2C brand with AI-powered marketing automation. Analyze products, generate strategies, discover influencers, simulate negotiations, and track performance - all in one platform.',
  keywords: 'AI marketing, D2C brands, influencer marketing, email automation, India',
  openGraph: {
    title: 'InstaMarketer AI',
    description: 'AI-Powered Marketing Automation for D2C Brands',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
