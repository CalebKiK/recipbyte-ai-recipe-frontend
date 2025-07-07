import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ByteBistro",
  description: "Unlock culinary magic with AI! Just input your ingredients and let our smart generator create delicious recipes tailored to your pantry and preferences.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider><main>{children}</main></AuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            success: {
              duration: 4000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </body>
    </html>
  );
}
