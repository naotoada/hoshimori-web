import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ['400', '700', '900'],
  subsets: ["latin"],
  variable: "--font-m-plus-rounded",
});

export const metadata: Metadata = {
  title: "⭐️星守り公式サイト",
  description: "全90体の星守りデータから、あなたの構造と強みを導き出します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${mPlusRounded.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
