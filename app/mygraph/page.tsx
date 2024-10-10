"use client";
import Card from "@/components/card.component";
import { Graph, graphTypes } from "@/components/graph.component";
import { Table } from "@/components/table.component";
import { dataFormats, DataService } from "@/service/data.service";
import { DateService } from "@/service/date.service";
import { SyncIcon } from "@primer/octicons-react";
import { ApexOptions } from "apexcharts";
import { ChangeEvent, useEffect, useState } from "react";

export default function MyGraph() {
  const dataService = new DataService();

  const [fromDate, setFromDate] = useState(DateService.nDaysAgo(8));
  const [toDate, setToDate] = useState(DateService.yesterday());
  const [tableBody, setTableBody] = useState<(string | number)[][]>();
  const [modifiedTableBody, setModifiedTableBody] = useState<(string | number)[][]>();
  const [graphTitle, setGraphTitle] = useState("グラフタイトル");
  const [graphType, setGraphType] = useState<(typeof graphTypes)[number]>("donut");
  const [graphOptions, setGraphOptions] = useState<
    ApexOptions & { series: ApexAxisChartSeries | ApexNonAxisChartSeries }
  >({ series: [{ data: [] }] });

  const onChangeGraphType = (ev: ChangeEvent<HTMLSelectElement>) => {
    const graphtype = ev.target.value as (typeof graphTypes)[number];
    setGraphType(graphtype);
  };
  const onChangeGraphOptions = (ev: ChangeEvent<HTMLSelectElement>) => {
    const data = (modifiedTableBody ?? tableBody)
      ?.map((row) => row[Number(ev.target.value)].toString().split("\n"))
      .flat()
      .reduce(
        (p: { answer: string | number; count: number }[][], c) => {
          if (!p[0].map((v) => v.answer).includes(c)) p[0].push({ answer: c, count: 0 });
          p[0][p[0].map((v) => v.answer).indexOf(c)].count += 1;
          return p;
        },
        [[]],
      )[0];
    if (data)
      switch (graphType) {
        case "donut":
        case "pie":
          setGraphOptions({
            series: data?.map((v) => v.count),
            labels: data?.map((v) => String(v.answer)),
          });
          break;
        case "bar":
          setGraphOptions({
            series: [
              {
                data: data?.map((v) => ({ x: v.answer, y: v.count })).flat(),
              },
            ],
          });
          break;
      }
  };

  useEffect(() => {
    dataService
      .getSpan("hokuriku-gift-campaign", fromDate, toDate)
      .then((data) => setTableBody(data));
    return () => {};
  }, [dataService, fromDate, toDate]);

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        <label>
          開始:
          <input
            className="rounded-full border-2 border-separator p-2 hover:cursor-pointer hover:border-secondary"
            type="date"
            value={DateService.dateStrOf(fromDate)}
            onChange={(ev) => {
              setFromDate(new Date(ev.target.value));
            }}
            min="2024-09-01"
          />
        </label>
        <span>〜</span>
        <label>
          終了:
          <input
            className="rounded-full border-2 border-separator p-2 hover:cursor-pointer hover:border-secondary"
            type="date"
            value={DateService.dateStrOf(toDate)}
            onChange={(ev) => {
              setToDate(new Date(ev.target.value));
            }}
          />
        </label>
      </div>
      <Card className="mt-4 w-full" title="ソースデータ">
        {tableBody ? (
          <Table
            header={dataFormats["hokuriku-gift-campaign"]
              .filter((v) => v.essential)
              .map((v) => v.headerTitle)}
            body={tableBody.map((row) =>
              row.filter((_, i) => dataFormats["hokuriku-gift-campaign"][i].essential),
            )}
            modifiedBodyRaiser={(data) => {
              setModifiedTableBody(data);
            }}
          />
        ) : (
          <SyncIcon className="animate-primary m-auto text-surface" size="large" />
        )}
      </Card>
      <Card
        className="mt-4 h-fit w-full border-2 border-separator bg-surface sm:h-fit"
        title="オリジナルグラフ"
      >
        <div className="flex flex-col gap-4 px-4 sm:flex-row">
          <Card className="flex w-full flex-col" title="コントローラー">
            <label className="flex w-full items-center gap-2 rounded-full border-2 border-separator bg-surface p-4">
              <span className="w-32 shrink-0">グラフタイトル</span>
              <input
                type="text"
                className="w-full overflow-hidden rounded-full border-2 border-separator p-2 hover:cursor-pointer hover:border-secondary"
                placeholder="グラフタイトル"
                onChange={(ev) => setGraphTitle(ev.target.value)}
              ></input>
            </label>
            <label className="flex w-full items-center gap-2 rounded-full border-2 border-separator bg-surface p-4">
              <span className="w-32 shrink-0">グラフ形状</span>
              <select
                className="w-full rounded-full border-2 border-separator p-2 hover:cursor-pointer hover:border-secondary"
                name="graphType"
                onChange={(ev) => onChangeGraphType(ev)}
              >
                <option value="donut">円グラフ</option>
                <option value="bar">棒グラフ</option>
              </select>
            </label>
            <label className="flex w-full items-center gap-2 rounded-full border-2 border-separator bg-surface p-4">
              <span className="w-32 shrink-0">グラフにする列</span>
              <select
                className="w-full overflow-hidden rounded-full border-2 border-separator p-2 hover:cursor-pointer hover:border-secondary"
                name="graphSeries"
                onChange={(ev) => onChangeGraphOptions(ev)}
              >
                {dataFormats["hokuriku-gift-campaign"]
                  .filter((v) => v.essential)
                  .map((v, i) => (
                    <option key={`${i}-${v}`} value={i}>
                      {v.headerTitle}
                    </option>
                  ))}
              </select>
            </label>
          </Card>
          <Card className="w-full" title={graphTitle}>
            <Graph type={graphType} series={graphOptions.series} options={graphOptions} />
          </Card>
        </div>
      </Card>
    </>
  );
}
