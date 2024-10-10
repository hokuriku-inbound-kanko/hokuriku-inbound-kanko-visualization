"use client";

import { GraphIcon } from "@primer/octicons-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Props } from "react-apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const graphTypes = [
  "line",
  "area",
  "bar",
  "pie",
  "donut",
  "radialBar",
  "scatter",
  "bubble",
  "heatmap",
  "candlestick",
  "boxPlot",
  "radar",
  "polarArea",
  "rangeBar",
  "rangeArea",
  "treemap",
] as const;

/**
 * クライアントでApexChartのグラフを表示するコンポーネント
 * @param props Apex ChartのChartコンポーネントにわたすプロパティ
 */
export function Graph(props: Required<Pick<Props, "type" | "series" | "options">>) {
  const [innerWidth, setInnerWidth] = useState(640);
  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, [setInnerWidth]);
  return (
    <div className="relative grid h-fit w-[280px] place-content-center sm:h-[270px] sm:w-[360px]">
      <div className="absolute left-0 top-0 grid h-fit w-[280px] place-content-center sm:h-[270px] sm:w-[360px]">
        <GraphIcon className="animate-pulse fill-surface" size="large" />
      </div>
      <Chart
        className="absolute left-0 top-0 grid h-fit w-[280px] place-content-center bg-separator sm:h-[270px] sm:w-[360px]"
        type={props?.type}
        series={props?.series}
        height={innerWidth <= 640 ? 210 : 270}
        width={innerWidth <= 640 ? 280 : 360}
        options={{
          ...props?.options,
          chart: { toolbar: { show: false } },
          legend: { show: false },
          dataLabels: ["pie", "donut"].includes(props.type)
            ? {
                enabled: true,
                formatter: (_, opts) => {
                  const name = String(opts.w.globals.labels[opts.seriesIndex]);
                  return name;
                },
              }
            : {},
        }}
      />
    </div>
  );
}
