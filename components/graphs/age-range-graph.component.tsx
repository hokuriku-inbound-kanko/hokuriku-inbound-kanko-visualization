import { DataService } from "@/service/data.service";
import { DateService } from "@/service/date.service";
import Papa from "papaparse";
import Card from "../card.component";
import { Graph } from "../graph.component";

export default async function AgeRangeGraph(props: { span: { from: Date; to?: Date } }) {
  const dataService = new DataService();

  const data = Papa.parse<string[]>(
    await dataService.getSpan(
      "hokuriku-gift-campaign",
      DateService.nDaysAgo(DateService.sub(props.span.from, props.span.to ?? new Date()).days),
    ),
  );

  const answers: { answer: string; from: number; to: number; count: number }[] = [];
  for (let i = 0; i < 80; i += 10) {
    answers.push({ answer: `${i}歳~${i + 9}歳`, from: i, to: i + 9, count: 0 });
  }
  answers.push({ answer: "80歳~", from: 80, to: Infinity, count: 0 });
  data.data
    .map((row) => new Date().getFullYear() - Number(row[8]))
    .forEach((answer) => {
      answers.forEach((v, i) => {
        if (answer >= v.from && answer <= v.to) {
          answers[i].count++;
        }
      });
    });

  const options = {
    series: [
      {
        data: answers.map((v) => ({ x: v.answer, y: v.count })),
      },
    ],
  };

  return (
    <Card title="年代">
      <Graph type="bar" series={options.series} options={options} />
    </Card>
  );
}
