import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevPilot AI — Developer Platform",
  description: "AI-powered software engineering, repository intelligence, DevOps automation, and deployment management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
