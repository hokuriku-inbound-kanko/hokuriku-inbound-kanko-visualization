import type { Metadata } from "next";
import "./globals.css";
import { GraphIcon, MarkGithubIcon } from "@primer/octicons-react";
import Image from "next/image";
import Navigation from "@/components/navigation.component";
import Link from "next/link";

export const metadata: Metadata = {
  title: "北陸インバウンド観光DX オープンデータグラフ",
  description:
    "北陸インバウンド観光DX・データコンソーシアムより提供しているオープンデータの可視化を行うウェブアプリケーションです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col items-center justify-center p-4 antialiased">
        <header className="flex h-fit w-full items-center justify-start gap-x-2 border-b-2 border-separator pb-2">
          <Navigation />
          <Link
            className="flex h-fit w-fit items-center justify-start gap-x-2 no-underline"
            href="/"
            rel="noopener noreferrer"
          >
            <GraphIcon size="medium" verticalAlign="top" className="fill-primary" />
            <h1 className="text-2xl font-bold">オープンデータグラフ</h1>
          </Link>
        </header>
        <main className="flex h-full w-full flex-grow flex-col items-center p-4">{children}</main>
        <footer className="flex h-fit w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t-2 border-separator pt-2">
          <a
            className="flex items-center gap-2"
            href="https://github.com/hokuriku-inbound-kanko/hokuriku-inbound-kanko-visualization"
            target="_blank"
          >
            <MarkGithubIcon size="medium" />
            Page source
          </a>
          <a
            className="flex items-center gap-2"
            href="https://github.com/hokuriku-inbound-kanko/hokuriku-gift-campaign"
            target="_blank"
          >
            <MarkGithubIcon size="medium" />
            Data source
          </a>
          <a href="https://kanko-dx.jp/case-study/1784/" target="_blank">
            <Image
              aria-hidden
              src="https://kanko-dx.jp/wp-content/themes/kanko-dx/assets/img/common/logo-header.svg"
              alt="Globe icon"
              width={100}
              height={32}
            />
          </a>
        </footer>
      </body>
    </html>
  );
}
