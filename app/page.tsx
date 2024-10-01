import AgeRangeGraph from "@/components/graphs/age-range-graph.component";
import GenderGraph from "@/components/graphs/gender-graph.component";
import InfoSourceGraph from "@/components/graphs/info-source-graph.component";
import NationalitiesGraph from "@/components/graphs/nationalities-graph.component";

export default async function Home() {
  return (
    <>
      <h2 className="mb-4 text-xl font-bold">直近1週間のアンケート結果</h2>
      <div className="grid h-full w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <NationalitiesGraph />
        <AgeRangeGraph />
        <GenderGraph />
        <InfoSourceGraph />
      </div>
    </>
  );
}
