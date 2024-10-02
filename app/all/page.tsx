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
import { DAY_OF_BEGINNING } from "../constants";
import VisitedPrefectureGraph from "@/components/graphs/visited-prefecture-graph.component";
import VisitedAreaGraph from "@/components/graphs/visited-area-graph.component";
import VisitedFacilityGraph from "@/components/graphs/visited-facility-graph.component";

export default async function All() {
  const beginned = DAY_OF_BEGINNING;
  const yesterday = DateService.yesterday();
  return (
    <>
      <h2 className="mb-4 text-xl font-bold">アンケート解答期間全期間結果</h2>
      <p className="mb-4">
        {DateService.dateStrOf(beginned)} 〜 {DateService.dateStrOf(yesterday)} 回答分
      </p>
      <div className="grid h-full w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <VisitedPrefectureGraph span={{ from: beginned, to: yesterday }} />
        <VisitedAreaGraph span={{ from: beginned, to: yesterday }} />
        <VisitedFacilityGraph span={{ from: beginned, to: yesterday }} />
        <NationalitiesGraph span={{ from: beginned, to: yesterday }} />
        <AgeRangeGraph span={{ from: beginned, to: yesterday }} />
        <GenderGraph span={{ from: beginned, to: yesterday }} />
        <TripInfoSourceGraph span={{ from: beginned, to: yesterday }} />
        <FacilityInfoSourceGraph span={{ from: beginned, to: yesterday }} />
        <HowManyVisitsJapanGraph span={{ from: beginned, to: yesterday }} />
        <PurposeOfVisitRegionGraph span={{ from: beginned, to: yesterday }} />
        <PurposeOfVisitPrefectureGraph span={{ from: beginned, to: yesterday }} />
        <PurposeOfVisitFacilityGraph span={{ from: beginned, to: yesterday }} />
      </div>
    </>
  );
}
