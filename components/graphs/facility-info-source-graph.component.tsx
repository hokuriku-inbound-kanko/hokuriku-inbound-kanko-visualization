import { DataService } from "@/service/data.service";
import { DateService } from "@/service/date.service";
import Card from "../card.component";
import { Graph } from "../graph.component";
import Papa from "papaparse";

export default async function FacilityInfoSourceGraph(props: { span: { from: Date; to?: Date } }) {
  const dataService = new DataService();

  const data = Papa.parse<string[]>(
    await dataService.getSpan(
      "hokuriku-gift-campaign",
      DateService.nDaysAgo(DateService.sub(props.span.from, props.span.to ?? new Date()).days),
    ),
  );

  const answers = data.data
    .map((row) => row[120])
    .filter((v) => !!v)
    .map((v) =>
      v
        .toString()
        .trim()
        .split("\n")
        .map((v) => v.trim()),
    )
    .flat()
    .reduce(
      (p: { answer: string; count: number }[][], c) => {
        if (!p[0].map((v) => v.answer).includes(c)) p[0].push({ answer: c, count: 0 });
        p[0][p[0].map((v) => v.answer).indexOf(c)].count += 1;
        return p;
      },
      [[]],
    )[0]
    .sort((a, b) => a.count - b.count);

  const options = {
    series: [
      {
        data: answers.map((v) => ({ x: v.answer, y: v.count })),
      },
    ],
  };

  return (
    <Card title="施設情報をどこで知ったか（複数回答あり）">
      <Graph type="bar" series={options.series} options={options} />
    </Card>
  );
}
