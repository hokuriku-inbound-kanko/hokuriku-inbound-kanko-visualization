import { DataService } from "@/service/data.service";
import { DateService } from "@/service/date.service";
import Papa from "papaparse";
import Card from "../card.component";
import { Graph } from "../graph.component";

export default async function HowManyVisitsJapanGraph() {
  const dataService = new DataService();

  const data = Papa.parse<string[]>(
    await dataService.getSpan("hokuriku-gift-campaign", DateService.nDaysAgo(8)),
  );

  const answers = data.data
    .map((row) => row[65])
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
    .sort((a, b) => Number(a.answer) - Number(b.answer));

  const options = {
    series: [
      {
        data: answers.map((v) => ({ x: `${v.answer}回`, y: v.count })),
      },
    ],
  };

  return (
    <Card title="訪日回数">
      <Graph type="bar" series={options.series} options={options} />
    </Card>
  );
}
