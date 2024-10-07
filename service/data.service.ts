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
    const cacheDir = "caches";
    const cacheName = `${category}-${dateStr}.json`;

    const getData = async () => {
      let raw = await (await fetch(this.ghDataUrl(category, dateStr))).text();
      if (category === "hokuriku-gift-campaign") {
        raw = raw.split("\n").slice(2).join("\n");
      }
      const parsed = Papa.parse<string[]>(raw);
      if (parsed.errors.length > 0) console.warn(parsed.errors);
      return parsed.data.filter((row) => row.length === 150);
    };
    if (typeof window !== "undefined") {
      // CLIENT
      const opfsRoot = await navigator.storage.getDirectory();
      const cacheDirHandle = await opfsRoot.getDirectoryHandle(cacheDir, { create: true });
      const cacheFileHandle = await cacheDirHandle.getFileHandle(cacheName, { create: true });
      const cacheFile = await cacheFileHandle.getFile();
      // safariではOPFSのcreateWritableが利用できないので
      // そのために判定を挟む
      if ("createWritable" in cacheFileHandle && cacheFile.size === 0) {
        const data = await getData();
        try {
          const writable = await cacheFileHandle.createWritable();
          await writable.write(JSON.stringify(data));
          writable.close();
        } catch (error) {
          console.error(error);
        }
        return data;
      } else if (cacheFile.size > 0) {
        return JSON.parse(await cacheFile.text());
      } else {
        // opfsが利用できないので毎回データを取りに行く
        return await getData();
      }
    } else {
      const fs = await import("fs");
      // SERVER
      try {
        caches = fs.readdirSync("caches");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if ("code" in error && error.code === "ENOENT") {
          fs.mkdirSync("caches");
        }
      }
      if (caches.includes(`${cacheDir}/${cacheName}`)) {
        return JSON.parse(fs.readFileSync(`${cacheDir}/${cacheName}`).toString()) as string[][];
      } else {
        const data = await getData();
        fs.writeFileSync(`${cacheDir}/${cacheName}`, JSON.stringify(data));
        return data;
      }
    }
  }

  async getSpan(category: DataCategories, from: Date, to?: Date) {
    const res: string[][] = [];
    const yesterday = DateService.yesterday();

    for (
      let date = new Date(from);
      date.getTime() <= (to ? to?.getTime() : yesterday.getTime());
      date.setDate(date.getDate() + 1)
    ) {
      res.push(...(await this.get(category, DateService.dateStrOf(date))));
    }

    return res;
  }
}
