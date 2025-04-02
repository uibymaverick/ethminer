import { Chivo } from "next/font/google";
import "./globals.css";
import 'animate.css';

const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Ethminer",
  description: "Ethminer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-dvh w-dvw bg-base-300">
      <body className={`${chivo.className} antialiased`}>{children}</body>
    </html>
  );
}
