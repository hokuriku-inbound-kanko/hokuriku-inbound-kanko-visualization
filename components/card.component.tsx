import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function Card(props: Props) {
  return (
    <article className="flex flex-col items-center gap-y-4 rounded-lg bg-separator p-4">
      <h3 className="text-lg font-bold">{props.title}</h3>
      {props.children}
    </article>
  );
}
