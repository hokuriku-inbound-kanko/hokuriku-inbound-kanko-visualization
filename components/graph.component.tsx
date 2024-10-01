"use client";

import dynamic from "next/dynamic";
import type { Props } from "react-apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

/**
 * クライアントでApexChartのグラフを表示するコンポーネント
 * @param props Apex ChartのChartコンポーネントにわたすプロパティ
 */
export function Graph(props: Required<Pick<Props, "type" | "series" | "options">>) {
  return (
    <Chart
      className="grid h-fit w-[280px] place-content-center sm:h-[270px] sm:w-[360px]"
      type={props?.type}
      series={props?.series}
      height={window.innerWidth <= 640 ? 210 : 270}
      width={window.innerWidth <= 640 ? 280 : 360}
      options={props?.options}
    />
  );
}
