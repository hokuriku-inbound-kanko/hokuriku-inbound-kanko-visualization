"use client";

import dynamic from "next/dynamic";
import type { Props } from "react-apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function Graph(props: Required<Props>) {
  return (
    <Chart
      type={props?.type}
      series={props?.series}
      height={props?.height}
      width={props?.width}
      options={props?.options}
    />
  );
}
