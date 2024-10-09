"use client";

import { FilterIcon, SortDescIcon } from "@primer/octicons-react";
import { ChangeEvent, useEffect, useState } from "react";

type TableHeadProps = {
  text: string;
  columnValues: (string | number)[];
  sortedWith?: boolean;
  filteredWith?: boolean;
  filteredValues?: (string | number)[];
  onSortClick?: () => void;
  onFilterChanged?: (newState: boolean, value?: string | number) => void;
};
function TableHead(props: TableHeadProps) {
  const [checked, setChecked] = useState(props.filteredValues ?? []);

  const onChangeCheckbox = (ev: ChangeEvent<HTMLInputElement>, value: string | number) => {
    if (props.onFilterChanged) props.onFilterChanged(ev.target.checked, value);
    let tmp;
    if (ev.target.checked) tmp = [...checked, value];
    else {
      if (checked.length > 0) tmp = [...checked.filter((w) => w !== value)];
      else tmp = props.columnValues.filter((v) => v !== value);
    }
    setChecked(tmp);
  };

  return (
    <th className="border-b-2 border-r-2 border-primary px-4 py-2 last:border-r-0">
      <span>{props.text}</span>
      {props.onSortClick ? (
        <button
          className={`ml-2 h-4 w-4 ${props.sortedWith ? "scale-105 text-secondary" : "text-gray-500"}`}
          onClick={() => {
            if (props.onSortClick) props.onSortClick();
          }}
        >
          <SortDescIcon size="small" />
        </button>
      ) : null}
      {props.onFilterChanged ? (
        <button
          className={`group relative ml-2 h-4 w-4 ${props.filteredWith ? "scale-105 text-secondary" : "text-gray-500"}`}
        >
          <FilterIcon size="small" />
          <div className="absolute left-0 top-4 hidden flex-col items-start rounded-lg border-2 border-separator bg-surface p-4 font-normal text-text group-hover:flex group-focus:flex">
            <label className="mb-2 w-full border-b-2 border-separator pb-2">
              <input
                type="checkbox"
                onChange={(ev) => {
                  if (props.onFilterChanged) props.onFilterChanged(ev.target.checked);
                  setChecked([]);
                }}
                checked={
                  props.filteredWith &&
                  (checked.length === 0 || checked.length === props.columnValues.length)
                }
              ></input>
              <span className="ml-2">すべて</span>
            </label>
            {props.columnValues.map((v, i) => (
              <label key={`${i}-${v}`}>
                <input
                  type="checkbox"
                  onChange={(ev) => {
                    onChangeCheckbox(ev, v);
                  }}
                  checked={
                    props.filteredWith ? (checked.length > 0 ? checked.includes(v) : true) : false
                  }
                ></input>
                <span className="ml-2">{v}</span>
              </label>
            ))}
          </div>
        </button>
      ) : null}
    </th>
  );
}

type TableProps = {
  header: (string | number)[];
  body: (string | number)[][];
};
/**
 * クライアントで操作可能な表を表示するコンポーネント
 */
export function Table(props: TableProps) {
  const [tableBody, setTableBody] = useState(props.body);
  const [sortColumnIndex, setSortColumnIndex] = useState(0);
  const [filterColumn, setFilterColumn] = useState({ index: 0, values: [] as (string | number)[] });
  const columnCounts = props.body[0]
    .map((_, colIdx) =>
      props.body
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

  const onFilterChanged = (index: number, newState: boolean, value?: string | number) => {
    if (!value) {
      setFilterColumn({ index, values: [] });
      return;
    }
    if (newState) {
      setFilterColumn({ index, values: [...filterColumn.values, value] });
    } else {
      setFilterColumn({ index, values: [...filterColumn.values.filter((v) => v !== value)] });
    }
  };

  useEffect(() => {
    const dirty = props.body
      .filter((row) => {
        if (filterColumn.values.length === 0) return true;
        else return filterColumn.values.includes(row[filterColumn.index]);
      })
      .sort((a, b) => {
        if (!Number.isNaN(Number(a[sortColumnIndex])))
          return Number(a[sortColumnIndex]) - Number(b[sortColumnIndex]);
        else {
          const ref = columnCounts[sortColumnIndex].map((v) => v.data);
          return ref.indexOf(a[sortColumnIndex]) - ref.indexOf(b[sortColumnIndex]);
        }
      });
    setTableBody(dirty);
  }, [sortColumnIndex, filterColumn]);

  return (
    <div className="relative h-full w-full overflow-scroll rounded-lg border-2 border-primary bg-surface">
      <table className="border-separate border-spacing-0 whitespace-nowrap break-keep border-separator">
        <thead className="sticky top-0 bg-surface">
          <tr>
            {props.header.map((v, i) => (
              <TableHead
                key={`${i}-${v}`}
                text={v.toString()}
                columnValues={columnCounts[i].map((v) => v.data)}
                sortedWith={sortColumnIndex === i}
                onSortClick={() => setSortColumnIndex(i)}
                filteredWith={filterColumn.index === i}
                filteredValues={filterColumn.index === i ? filterColumn.values : undefined}
                onFilterChanged={(s, v) => onFilterChanged(i, s, v)}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBody.map((row, i) => (
            <tr className="even:bg-separator" key={`${i}-${row[0]}`}>
              {row.map((v, j) => (
                <td
                  className={`border-r-2 border-separator px-4 py-2 last:border-r-0 ${!Number.isNaN(Number(v)) ? "text-end" : "text-start"} ${v.toString().match(/[\n|\r]/) ? "whitespace-break-spaces" : ""}`}
                  key={`${j}-${v}`}
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
