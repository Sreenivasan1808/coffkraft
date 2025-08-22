import type { Metadata } from "next";
// import { Edu_NSW_ACT_Cursive } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/query_provider";


// const cursive = Edu_NSW_ACT_Cursive({
//   subsets: ["latin"],
//   variable: "--font-cursive"
// });

export const metadata: Metadata = {
  title: "Coffkraft",
  description: "Your only stopo for high quality coffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}

//${cursive.variable} 