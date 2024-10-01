import { Graph } from "@/components/graph.component";
import { DataService } from "@/service/data.service";
import Papa from "papaparse";

export default async function Home() {
  const dataService = new DataService();

  const data = Papa.parse<string[]>(
    await dataService.getSpan(
      "hokuriku-gift-campaign",
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
    ),
  );

  const answeredAt = data.data
    .map((row) => row[10])
    .filter((v) => !!v)
    .map((v) => v.toString().trim())
    .reduce(
      (p: { answer: string; count: number }[][], c) => {
        if (!p[0].map((v) => v.answer).includes(c)) p[0].push({ answer: c, count: 0 });
        p[0][p[0].map((v) => v.answer).indexOf(c)].count += 1;
        return p;
      },
      [[]],
    )[0]
    .sort((a, b) => b.count - a.count);

  const options = {
    series: answeredAt.map((v) => v.count),
    labels: answeredAt.map((v) => v.answer),
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
        <Graph type="donut" series={options.series} options={options} width={""} height={""} />
      </article>
    </>
  );
}
