import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function Card(props: Props) {
  return (
    <article
      className={`flex h-[calc(210px+1em+2em+54px)] flex-col items-center gap-y-4 rounded-lg bg-separator p-4 sm:h-[calc(270px+1em+2em+54px)] ${props.className}`}
    >
      <h3 className="text-lg font-bold">{props.title}</h3>
      {props.children}
    </article>
  );
}
