"use client";
import { ArchiveIcon, ChevronDownIcon, FlameIcon } from "@primer/octicons-react";
import Link from "next/link";
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
        className={`absolute ${openNav ? "" : "hidden"} left-0 top-[58px] flex h-fit w-fit flex-col items-start gap-4 rounded-lg border-2 border-separator bg-surface p-4 transition-all sm:w-[300px]`}
      >
        <Link className="flex items-center gap-2" href="/">
          <FlameIcon size="medium" />
          直近1週間のグラフ
        </Link>
        <Link className="flex items-center gap-2" href="/all">
          <ArchiveIcon size="medium" />
          アンケート全期間のグラフ
        </Link>
      </nav>
    </>
  );
}
