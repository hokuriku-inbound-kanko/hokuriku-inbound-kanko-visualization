import Card from "@/components/card.component";
import AgeRangeGraph from "@/components/graphs/age-range-graph.component";
import FacilityEvaluationGraph from "@/components/graphs/facility-evaluation-graph.component";
import FacilityInfoSourceGraph from "@/components/graphs/facility-info-source-graph.component";
import GenderGraph from "@/components/graphs/gender-graph.component";
import HowManyVisitsJapanGraph from "@/components/graphs/how-many-visits-japan-graph.component";
import NationalitiesGraph from "@/components/graphs/nationalities-graph.component";
import PurposeOfVisitFacilityGraph from "@/components/graphs/purpose-of-visit-facility-graph.component";
import PurposeOfVisitPrefectureGraph from "@/components/graphs/purpose-of-visit-prefecture-graph.component";
import PurposeOfVisitRegionGraph from "@/components/graphs/purpose-of-visit-region-graph.component";
import RecomendationRatingGraph from "@/components/graphs/recomendation-rating-graph.component";
import TripInfoSourceGraph from "@/components/graphs/trip-info-source-graph.component";
import VisitedAreaGraph from "@/components/graphs/visited-area-graph.component";
import VisitedFacilityGraph from "@/components/graphs/visited-facility-graph.component";
import VisitedPrefectureGraph from "@/components/graphs/visited-prefecture-graph.component";
import { Table } from "@/components/table.component";
import { dataFormats, DataService } from "@/service/data.service";
import { DateService } from "@/service/date.service";

export default async function Home() {
  const dataService = new DataService();
  const weekAgo = DateService.nDaysAgo(8);
  const yesterday = DateService.yesterday();
  const tableBody = await dataService.getSpan("hokuriku-gift-campaign", weekAgo, yesterday);
  return (
    <>
      <h2 className="mb-4 text-xl font-bold">直近1週間のアンケート結果</h2>
      <p className="mb-4">
        {DateService.dateStrOf(weekAgo)} 〜 {DateService.dateStrOf(yesterday)} 回答分
      </p>
      <div className="grid h-full w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <VisitedPrefectureGraph span={{ from: weekAgo, to: yesterday }} />
        <VisitedAreaGraph span={{ from: weekAgo, to: yesterday }} />
        <VisitedFacilityGraph span={{ from: weekAgo, to: yesterday }} />
        <NationalitiesGraph span={{ from: weekAgo, to: yesterday }} />
        <AgeRangeGraph span={{ from: weekAgo, to: yesterday }} />
        <GenderGraph span={{ from: weekAgo, to: yesterday }} />
        <TripInfoSourceGraph span={{ from: weekAgo, to: yesterday }} />
        <FacilityInfoSourceGraph span={{ from: weekAgo, to: yesterday }} />
        <HowManyVisitsJapanGraph span={{ from: weekAgo, to: yesterday }} />
        <PurposeOfVisitRegionGraph span={{ from: weekAgo, to: yesterday }} />
        <PurposeOfVisitPrefectureGraph span={{ from: weekAgo, to: yesterday }} />
        <PurposeOfVisitFacilityGraph span={{ from: weekAgo, to: yesterday }} />
        <FacilityEvaluationGraph span={{ from: weekAgo, to: yesterday }} />
        <RecomendationRatingGraph span={{ from: weekAgo, to: yesterday }} />
      </div>
      <Card className="mt-4 h-screen w-full sm:h-[calc(630px+1em+2em+54px)]" title="ソースデータ">
        <p className="text-sm">変更はグラフに反映されません</p>
        <p className="text-sm text-primary sm:hidden">画面サイズの大きな端末だと見やすくなります</p>
        <Table
          body={tableBody.map((row) =>
            row.filter((_, i) => dataFormats["hokuriku-gift-campaign"][i].essential),
          )}
          header={dataFormats["hokuriku-gift-campaign"]
            .map((v) => v.headerTitle)
            .filter((_, i) => dataFormats["hokuriku-gift-campaign"][i].essential)}
        />
      </Card>
    </>
  );
}
