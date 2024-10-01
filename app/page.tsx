import AgeRangeGraph from "@/components/graphs/age-range-graph.component";
import FacilityInfoSourceGraph from "@/components/graphs/facility-info-source-graph.component";
import GenderGraph from "@/components/graphs/gender-graph.component";
import HowManyVisitsJapanGraph from "@/components/graphs/how-many-visits-japan-graph.component";
import NationalitiesGraph from "@/components/graphs/nationalities-graph.component";
import PurposeOfVisitFacilityGraph from "@/components/graphs/purpose-of-visit-facility-graph.component";
import PurposeOfVisitPrefectureGraph from "@/components/graphs/purpose-of-visit-prefecture-graph.component";
import PurposeOfVisitRegionGraph from "@/components/graphs/purpose-of-visit-region-graph.component";
import TripInfoSourceGraph from "@/components/graphs/trip-info-source-graph.component";
import { DateService } from "@/service/date.service";

export default async function Home() {
  const weekAgo = DateService.nDaysAgo(8);
  const yesterday = DateService.yesterday();
  return (
    <>
      <h2 className="mb-4 text-xl font-bold">直近1週間のアンケート結果</h2>
      <p className="mb-4">
        {DateService.dateStrOf(weekAgo)} 〜 {DateService.dateStrOf(yesterday)} 回答分
      </p>
      <div className="grid h-full w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <NationalitiesGraph />
        <AgeRangeGraph />
        <GenderGraph />
        <TripInfoSourceGraph />
        <FacilityInfoSourceGraph />
        <HowManyVisitsJapanGraph />
        <PurposeOfVisitRegionGraph />
        <PurposeOfVisitPrefectureGraph />
        <PurposeOfVisitFacilityGraph />
      </div>
    </>
  );
}
