"use client";

import Card from "@/components/card.component";
import SpanSelector from "@/components/span-selector.component";
import Table from "@/components/table/table.component";
import { dataFormats, DataService } from "@/service/data.service";
import { DateService } from "@/service/date.service";
import { SyncIcon } from "@primer/octicons-react";
import { useEffect, useMemo, useState } from "react";

export default function Tmp() {
  const dataService = useMemo(() => new DataService(), []);

  // 内部的に保持する（直接閲覧されない）アンケートデータの全体
  const [raw, setRaw] = useState<(string | number)[][]>();
  const [fromDate, setFromDate] = useState(DateService.nDaysAgo(7));
  const [toDate, setToDate] = useState(DateService.yesterday());
  useEffect(() => {
    dataService.getSpan("hokuriku-gift-campaign", fromDate, toDate).then((v) => setRaw([...v]));
  }, [fromDate, toDate, dataService]);

  // 直接閲覧されるフィルター候補のリスト
  const columnValues = useMemo(() => {
    if (!raw) return raw;
    return raw[0]
      .map((_, colIdx) =>
        raw
          .map((row) => row[colIdx])
          .reduce((accumlator: { data: string | number; count: number }[][], current) => {
            if (!accumlator[colIdx]) accumlator[colIdx] = [];
            if (!accumlator[colIdx].map((v) => v.data).includes(current))
              accumlator[colIdx].push({ data: current, count: 0 });
            accumlator[colIdx][accumlator[colIdx].map((v) => v.data).indexOf(current)].count += 1;
            return accumlator;
          }, []),
      )
      .map((col, i) => col[i].sort((a, b) => b.count - a.count));
  }, [raw]);

  // 直接閲覧されるフィルター・ソートされたアンケートデータ
  const [sorts, setSorts] = useState<{ order: number; column: number; method: "desc" | "asc" }[]>(
    [],
  );
  const [filters, setFilters] = useState<{ column: number; selection: (string | number)[] }[]>();
  const view = useMemo(() => {
    if (!raw || !columnValues) return raw;
    let result: (string | number)[][] = structuredClone(raw);
    if (filters)
      filters.forEach((filter) => {
        result = result.filter((row) => filter.selection.includes(row[filter.column]));
      });
    if (sorts)
      sorts
        .sort((a, b) => a.order - b.order)
        .forEach((sort) => {
          const isNumberColumn = result.some((row) => Number.isNaN(Number(row[sort.column])));
          if (sort.method === "desc") {
            if (isNumberColumn)
              result = result.sort((rowA, rowB) => {
                return Number(rowA[sort.column]) - Number(rowB[sort.column]);
              });
            else
              result = result.sort((rowA, rowB) => {
                const ref = columnValues[sort.column].map((v) => v.data);
                return ref.indexOf(rowA[sort.column]) - ref.indexOf(rowB[sort.column]);
              });
          } else {
            if (isNumberColumn)
              result = result.sort((rowA, rowB) => {
                return Number(rowB[sort.column]) - Number(rowA[sort.column]);
              });
            else
              result = result.sort((rowA, rowB) => {
                const ref = columnValues[sort.column].map((v) => v.data);
                return ref.indexOf(rowB[sort.column]) - ref.indexOf(rowA[sort.column]);
              });
          }
        });
    return result;
  }, [raw, columnValues, sorts, filters]);

  return (
    <>
      <SpanSelector
        initial={{ fromDate, toDate }}
        onChangeFromDate={(fromDate) => setFromDate(fromDate)}
        onChangeToDate={(toDate) => setToDate(toDate)}
      />
      <Card className="mt-4 w-full" title="ソースデータ">
        {view ? (
          <Table
            head={dataFormats["hokuriku-gift-campaign"]
              .filter((v) => v.essential)
              .map((v) => ({ title: v.headerTitle, values: [] }))}
            body={view}
            sortedColumns={sorts.map((v) => v.column)}
            onSortClicked={(index, method) => {
              console.log(index);
              if (sorts.map((v) => v.column).includes(index))
                setSorts(
                  [
                    { order: 0, column: index, method },
                    ...sorts.filter((v) => v.column !== index),
                  ].map((v, i) => ({ order: i, column: v.column, method: v.method })),
                );
              else
                setSorts(
                  [{ order: 0, column: index, method }, ...sorts].map((v, i) => ({
                    order: i,
                    column: v.column,
                    method: v.method,
                  })),
                );
            }}
          />
        ) : (
          <SyncIcon className="m-auto animate-spin text-surface" size="large" />
        )}
      </Card>
    </>
  );
}
