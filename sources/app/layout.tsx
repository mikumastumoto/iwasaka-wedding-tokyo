import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "岩阪陸駆・松本未来 結婚式",
  description: "岩阪陸駆・松本未来の結婚式のための特設サイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body style={{ fontFamily: '"Noto Sans JP", sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
