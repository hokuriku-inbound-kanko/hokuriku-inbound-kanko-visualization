import { Graph } from "@/components/graph.component";
import Papa from "papaparse";

export default async function Home() {
  const data = await (async () => {
    let res = "";

    for (
      let date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
      date.getTime() < Date.now() - 1000 * 60 * 60 * 24;
      date.setDate(date.getDate() + 1)
    ) {
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate() + 1).padStart(2, "0")}`;
      const dailyData = await (
        await fetch(
          `https://raw.githubusercontent.com/hokuriku-inbound-kanko/hokuriku-gift-campaign/refs/heads/main/daily/${dateStr}.csv`,
        )
      ).text();
      res += dailyData.replace(/.*?\n.*?\n/, "");
    }

    return Papa.parse<string[]>(res);
  })();

  const answeredAt = data.data
    .map((row) => row[10])
    .reduce(
      (p: Record<string, number>[], c) => {
        if (!(c in p[0])) p[0][c] = 0;
        p[0][c] += 1;
        return p;
      },
      [{}],
    )[0];

  const options = {
    series: Object.values(answeredAt),
    labels: Object.keys(answeredAt),
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
            },
          },
        },
      },
    },
  };

  return (
    <>
      <h2 className="mb-4 text-xl font-bold">直近1週間のアンケート結果</h2>
      <article className="mb-4 flex flex-col items-center gap-y-4 rounded-lg bg-separator p-4">
        <h3 className="text-lg font-bold">国籍</h3>
        <Graph
          type="donut"
          series={Object.values(answeredAt)}
          options={options}
          width={300}
          height={300}
        />
      </article>
    </>
  );
}
