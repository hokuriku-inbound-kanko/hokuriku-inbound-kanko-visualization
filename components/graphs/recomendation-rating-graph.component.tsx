import { DataService } from "@/service/data.service";
import { DateService } from "@/service/date.service";
import Card from "../card.component";
import { Graph } from "../graph.component";

export default async function RecomendationRatingGraph(props: { span: { from: Date; to?: Date } }) {
  const dataService = new DataService();

  const data = await dataService.getSpan(
    "hokuriku-gift-campaign",
    DateService.nDaysAgo(DateService.sub(props.span.from, props.span.to ?? new Date()).days),
  );

  const answers = data
    .map((row) => row[148])
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
    .sort((a, b) => Number(b.answer) - Number(a.answer));

  const options = {
    series: answers.map((v) => v.count),
    labels: answers.map((v) => v.answer),
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
    <Card title="訪問した施設の推奨度">
      <Graph type="donut" series={options.series} options={options} />
    </Card>
  );
}