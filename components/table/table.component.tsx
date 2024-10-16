import TableHead from "./table-head.component";

type Props = {
  head: { title: string; values: (string | number)[] }[];
  body: (number | string)[][];
  filteredColumns?: number[];
  onFilterChanged?: (index: number, newState: boolean, value?: string | number) => void;
  sortedColumns: number[];
  onSortClicked: (index: number, method: "asc" | "desc") => void;
};
export default function Table(props: Props) {
  return (
    <div className="relative h-full w-full overflow-scroll rounded-lg border-2 border-primary bg-surface">
      <table className="border-separate border-spacing-0 whitespace-nowrap break-keep border-separator">
        <thead className="sticky top-0 bg-surface">
          <tr>
            {props.head.map((v, i) => (
              <TableHead
                key={`${i}-${v.title}`}
                text={v.title}
                columnValues={v.values}
                sortedWith={props.sortedColumns.includes(i)}
                onSortClick={(method) => {
                  props.onSortClicked(i, method);
                }}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {props.body.map((row, i) => (
            <tr key={`${i}-${row[0]}`} className="even:bg-separator hover:font-bold">
              {row.map((v, j) => (
                <td
                  key={`${i}-${j}`}
                  className={`border-r-2 border-separator px-4 py-2 last:border-r-0 ${!Number.isNaN(Number(v)) ? "text-end" : "text-start"} ${v.toString().match(/[\n|\r]/) ? "whitespace-break-spaces" : ""}`}
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="font-bold">
          <tr>
            <th className="border-r-2 border-t-2 border-primary px-4 py-2" scope="row">
              行数
            </th>
            <td className="border-r-2 border-t-2 border-primary px-4 py-2 text-right">
              {props.body.length}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
