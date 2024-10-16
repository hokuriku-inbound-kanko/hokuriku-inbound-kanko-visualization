"use client";

import { DAY_OF_BEGINNING } from "@/app/constants";
import { DateService } from "@/service/date.service";

type Props = {
  initial: {
    toDate: Date;
    fromDate: Date;
  };
  onChangeToDate: (toDate: Date) => void;
  onChangeFromDate: (fromDate: Date) => void;
};
export default function SpanSelector(props: Props) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <label>
        開始:
        <input
          className="rounded-full border-2 border-separator p-2 hover:cursor-pointer hover:border-secondary"
          type="date"
          defaultValue={DateService.dateStrOf(props.initial.fromDate)}
          onChange={(ev) => {
            props.onChangeFromDate(new Date(ev.target.value));
          }}
          min={DateService.dateStrOf(DAY_OF_BEGINNING)}
          max={DateService.dateStrOf(DateService.yesterday())}
        />
      </label>
      <span>〜</span>
      <label>
        終了:
        <input
          className="rounded-full border-2 border-separator p-2 hover:cursor-pointer hover:border-secondary"
          type="date"
          defaultValue={DateService.dateStrOf(props.initial.toDate)}
          onChange={(ev) => {
            props.onChangeToDate(new Date(ev.target.value));
          }}
          min={DateService.dateStrOf(DAY_OF_BEGINNING)}
          max={DateService.dateStrOf(DateService.yesterday())}
        />
      </label>
    </div>
  );
}
