import type { Metadata } from "next";
import { Space_Grotesk, Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import ErrorBoundary from "@/components/ErrorBoundary";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lokesh | Full Stack Developer",
  description: "Award-winning portfolio of Lokesh, a Full Stack MERN Developer specializing in modern web applications with cutting-edge technologies.",
  keywords: ["Full Stack Developer", "MERN Stack", "React", "Node.js", "Portfolio", "Web Development"],
  authors: [{ name: "Lokesh" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#00F0FF",
  openGraph: {
    title: "Lokesh | Full Stack Developer",
    description: "Award-winning portfolio showcasing modern web development projects",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${firaCode.variable} antialiased bg-void text-mist`}
      >
        <ErrorBoundary>
          <NoiseOverlay />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
