import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { DateService } from "./date.service";
import Papa from "papaparse";

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
    let caches: string[] = [];
    try {
      caches = readdirSync("caches");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if ("code" in error && error.code === "ENOENT") {
        mkdirSync("caches");
      }
    }
    const cacheName = `caches/${category}-${dateStr}.json`;
    if (caches.includes(cacheName)) {
      return JSON.parse(readFileSync(cacheName).toString()) as string[][];
    } else {
      let raw = await (await fetch(this.ghDataUrl(category, dateStr))).text();
      if (category === "hokuriku-gift-campaign") {
        raw = raw.split("\n").slice(2).join("\n");
      }
      const parsed = Papa.parse<string[]>(raw);
      if (parsed.errors.length > 0) console.warn(parsed.errors);
      writeFileSync(cacheName, JSON.stringify(parsed.data));
      return parsed.data;
    }
  }

  async getSpan(category: DataCategories, from: Date, to?: Date) {
    const res: string[][] = [];
    const yesterday = DateService.yesterday();

    for (
      let date = from;
      date.getTime() <= (to ? to?.getTime() : yesterday.getTime());
      date.setDate(date.getDate() + 1)
    ) {
      res.push(...(await this.get(category, DateService.dateStrOf(date))));
    }

    return res;
  }
}
