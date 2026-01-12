import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Creative Developer | Immersive 3D Portfolio",
  description: "Award-winning creative developer portfolio featuring immersive 3D WebGL experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
