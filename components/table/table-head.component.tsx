import { FilterIcon, SortAscIcon, SortDescIcon } from "@primer/octicons-react";
import { ChangeEvent, useState } from "react";

type TableHeadProps = {
  text: string;
  columnValues: (string | number)[];
  sortedWith?: boolean;
  filteredWith?: boolean;
  filteredValues?: (string | number)[];
  onSortClick?: (method: "asc" | "desc") => void;
  onFilterChanged?: (newState: boolean, value?: string | number) => void;
};
export default function TableHead(props: TableHeadProps) {
  const [checked, setChecked] = useState(props.filteredValues ?? []);
  const [sortMethod, setSortMethod] = useState<"asc" | "desc">("desc");

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
        <div
          tabIndex={0}
          className={`balloon-anchor group ml-2 h-4 w-4 ${props.sortedWith ? "active" : ""}`}
        >
          {sortMethod === "desc" ? <SortDescIcon size="small" /> : <SortAscIcon size="small" />}
          <div className="balloon-body h-fit group-hover:block group-focus:block">
            <div className="balloon-content">
              <button
                onClick={() => {
                  if (props.onSortClick) props.onSortClick("desc");
                }}
              >
                <SortDescIcon size="small" />
                <span>降順にソート</span>
              </button>
              <button
                onClick={() => {
                  if (props.onSortClick) props.onSortClick("asc");
                }}
              >
                <SortAscIcon size="small" />
                <span>昇順にソート</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {props.onFilterChanged ? (
        <button
          className={`group relative ml-2 h-4 w-4 ${props.filteredWith ? "scale-105 text-secondary" : "text-gray-500"}`}
        >
          <FilterIcon size="small" />
          <div className="absolute left-0 top-4 hidden max-h-52 flex-col items-start overflow-scroll rounded-lg border-2 border-separator bg-surface p-4 font-normal text-text group-hover:flex group-focus:flex">
            <label className="mb-2 w-full border-b-2 border-separator pb-2 hover:cursor-pointer hover:font-bold">
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
              <label className="hover:cursor-pointer hover:font-bold" key={`${i}-${v}`}>
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
