import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { DateService } from "./date.service";

/**
 * 北陸インバウンド観光DXデータコンソーシアムで収集しているオープンデータの種類
 */
export type DataCategories = "hokuriku-gift-campaign";

export class DataService {
  private static _instance: DataService;
  readonly now = new Date();

  constructor() {
    if (DataService._instance) {
      return DataService._instance;
    }
    DataService._instance = this;
  }

  readonly ghDataUrl = (category: DataCategories, dateStr: string) =>
    `https://raw.githubusercontent.com/hokuriku-inbound-kanko/${category}/refs/heads/main/daily/${dateStr}.csv`;

  async get(category: DataCategories, dateStr: string) {
    let csvs: string[] = [];
    try {
      csvs = readdirSync("csv");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if ("code" in error && error.code === "ENOENT") {
        mkdirSync("csv");
      }
    }
    const cacheName = `${category}-${dateStr}.csv`;
    if (csvs.includes(cacheName)) {
      return readFileSync(`csv/${cacheName}`).toString();
    } else {
      const data = await (await fetch(this.ghDataUrl(category, dateStr))).text();
      writeFileSync(`csv/${cacheName}`, data);
      return data;
    }
  }

  async getSpan(category: DataCategories, from: Date, to?: Date) {
    let res = "";
    const yesterday = DateService.yesterday();

    for (
      let date = from;
      date.getTime() <= (to ? to?.getTime() : yesterday.getTime());
      date.setDate(date.getDate() + 1)
    ) {
      const dailyData = await this.get(category, DateService.dateStrOf(date));

      if (category === "hokuriku-gift-campaign") {
        res += dailyData.split("\n").slice(2).join("\n");
      } else {
        res += dailyData;
      }
    }

    return res;
  }
}
