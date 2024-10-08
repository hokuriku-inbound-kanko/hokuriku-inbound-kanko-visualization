import { DataService } from "@/service/data.service";
import { DateService } from "@/service/date.service";
import Card from "../card.component";
import { Graph } from "../graph.component";

export default async function VisitedFacilityGraph(props: { span: { from: Date; to?: Date } }) {
  const dataService = new DataService();

  const data = await dataService.getSpan(
    "hokuriku-gift-campaign",
    DateService.nDaysAgo(DateService.sub(props.span.from, props.span.to ?? new Date()).days),
  );

  const answers = data
    .map((row) => row[7])
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
    .sort((a, b) => {
      if (a.answer === "その他") return 1;
      else if (b.answer === "その他") return -1;
      return b.count - a.count;
    });

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
    <Card title="訪問した施設の種類">
      <Graph type="donut" series={options.series} options={options} />
    </Card>
  );
}
