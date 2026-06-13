import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar/ScrollProgressBar";

export const metadata: Metadata = {
  title: "Hemanth Polavaram — Data Analyst",
  description:
    "Data Analyst passionate about transforming data into actionable insights, while building expertise in AI and Machine Learning.",
  openGraph: {
    title: "Hemanth Polavaram — Data Analyst",
    description: "Portfolio of a Data Analyst and AI/ML enthusiast.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ScrollProgressBar />
        <Navbar />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
