"use client";
import { ArchiveIcon, ChevronDownIcon, FlameIcon } from "@primer/octicons-react";
import { useState } from "react";

export default function Navigation() {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <button
        className={`h-8 w-8 transition-all hover:scale-110 hover:text-secondary ${openNav ? "rotate-180" : ""}`}
        onClick={() => setOpenNav(!openNav)}
      >
        <ChevronDownIcon size="medium" />
      </button>
      <nav
        className={`absolute transition-all left-[${openNav ? "0px" : "-100dvw"}] top-[58px] flex h-fit w-fit flex-col items-start gap-4 rounded-lg border-2 border-separator bg-surface p-4 sm:w-[300px]`}
      >
        <a className="flex items-center gap-2" href="/">
          <FlameIcon size="medium" />
          直近1週間のグラフ
        </a>
        <a className="flex items-center gap-2" href="/all">
          <ArchiveIcon size="medium" />
          アンケート全期間のグラフ
        </a>
      </nav>
    </>
  );
}
