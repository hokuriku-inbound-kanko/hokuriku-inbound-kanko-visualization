import { DateService } from "./date.service";
import Papa from "papaparse";

/**
 * 北陸インバウンド観光DXデータコンソーシアムで収集しているオープンデータの種類
 */
export type DataCategories = "hokuriku-gift-campaign";

export const dataFormats: Record<
  DataCategories,
  { headerTitle: string; essential: boolean; index: number; multiline: boolean }[]
> = {
  "hokuriku-gift-campaign": [
    {
      index: 0,
      headerTitle: "id",
      essential: true,
      multiline: false,
    },
    {
      index: 1,
      headerTitle: "QRコード読取日時",
      essential: true,
      multiline: false,
    },
    {
      index: 2,
      headerTitle: "アンケート回答日時",
      essential: true,
      multiline: false,
    },
    {
      index: 3,
      headerTitle: "言語",
      essential: true,
      multiline: false,
    },
    {
      index: 4,
      headerTitle: "会員ID",
      essential: true,
      multiline: false,
    },
    {
      index: 5,
      headerTitle: "県",
      essential: true,
      multiline: false,
    },
    {
      index: 6,
      headerTitle: "エリア",
      essential: true,
      multiline: false,
    },
    {
      index: 7,
      headerTitle: "業種",
      essential: true,
      multiline: false,
    },
    {
      index: 8,
      headerTitle: "生まれ年",
      essential: true,
      multiline: false,
    },
    {
      index: 9,
      headerTitle: "性別",
      essential: true,
      multiline: false,
    },
    {
      index: 10,
      headerTitle: "国籍",
      essential: true,
      multiline: false,
    },
    {
      index: 11,
      headerTitle: "世帯年収(金額)",
      essential: true,
      multiline: false,
    },
    {
      index: 12,
      headerTitle: "世帯年収(通貨)",
      essential: true,
      multiline: false,
    },
    {
      index: 13,
      headerTitle: "訪日目的ALL",
      essential: true,
      multiline: true,
    },
    {
      index: 14,
      headerTitle: "観光・レジャー",
      essential: false,
      multiline: false,
    },
    {
      index: 15,
      headerTitle: "家族・知人訪問",
      essential: false,
      multiline: false,
    },
    {
      index: 16,
      headerTitle: "ハネムーン",
      essential: false,
      multiline: false,
    },
    {
      index: 17,
      headerTitle: "学校関係の旅行",
      essential: false,
      multiline: false,
    },
    {
      index: 18,
      headerTitle: "スポーツ・スポーツ観戦",
      essential: false,
      multiline: false,
    },
    {
      index: 19,
      headerTitle: "イベント",
      essential: false,
      multiline: false,
    },
    {
      index: 20,
      headerTitle: "留学",
      essential: false,
      multiline: false,
    },
    {
      index: 21,
      headerTitle: "治療・検診",
      essential: false,
      multiline: false,
    },
    {
      index: 22,
      headerTitle: "インセンティブツアー",
      essential: false,
      multiline: false,
    },
    {
      index: 23,
      headerTitle: "ビジネス（展示会・見本市）",
      essential: false,
      multiline: false,
    },
    {
      index: 24,
      headerTitle: "ビジネス（国際会議）",
      essential: false,
      multiline: false,
    },
    {
      index: 25,
      headerTitle: "ビジネス（企業ミーティング）",
      essential: false,
      multiline: false,
    },
    {
      index: 26,
      headerTitle: "ビジネス（研修）",
      essential: false,
      multiline: false,
    },
    {
      index: 27,
      headerTitle: "ビジネス（その他ビジネス）",
      essential: false,
      multiline: false,
    },
    {
      index: 28,
      headerTitle: "トランジット",
      essential: false,
      multiline: false,
    },
    {
      index: 29,
      headerTitle: "日本国内在住",
      essential: false,
      multiline: false,
    },
    {
      index: 30,
      headerTitle: "その他",
      essential: false,
      multiline: false,
    },
    {
      index: 31,
      headerTitle: "同伴者",
      essential: false,
      multiline: false,
    },
    {
      index: 32,
      headerTitle: "滞在日数",
      essential: false,
      multiline: false,
    },
    {
      index: 33,
      headerTitle: "旅の総予算(金額)",
      essential: false,
      multiline: false,
    },
    {
      index: 34,
      headerTitle: "旅の総予算(通貨)",
      essential: false,
      multiline: false,
    },
    {
      index: 35,
      headerTitle: "宿泊予算(金額)",
      essential: false,
      multiline: false,
    },
    {
      index: 36,
      headerTitle: "宿泊予算(通貨)",
      essential: false,
      multiline: false,
    },
    {
      index: 37,
      headerTitle: "旅行情報元ALL",
      essential: true,
      multiline: true,
    },
    {
      index: 38,
      headerTitle: "日本政府観光局(JNTO)ホームページ",
      essential: false,
      multiline: false,
    },
    {
      index: 39,
      headerTitle: "旅行会社ホームページ",
      essential: false,
      multiline: false,
    },
    {
      index: 40,
      headerTitle: "宿泊施設ホームページ",
      essential: false,
      multiline: false,
    },
    {
      index: 41,
      headerTitle: "航空会社ホームページ",
      essential: false,
      multiline: false,
    },
    {
      index: 42,
      headerTitle: "地方観光協会ホームページ",
      essential: false,
      multiline: false,
    },
    {
      index: 43,
      headerTitle: "宿泊予約サイト(例：Agoda、Expedia、Booking.com等)",
      essential: false,
      multiline: false,
    },
    {
      index: 44,
      headerTitle: "口コミサイト（Tripadvisor等）",
      essential: false,
      multiline: false,
    },
    {
      index: 45,
      headerTitle: "Google Mapなどの地図アプリやサイトでの検索",
      essential: false,
      multiline: false,
    },
    {
      index: 46,
      headerTitle: "Instagram",
      essential: false,
      multiline: false,
    },
    {
      index: 47,
      headerTitle: "X (Twitter)",
      essential: false,
      multiline: false,
    },
    {
      index: 48,
      headerTitle: "Facebook",
      essential: false,
      multiline: false,
    },
    {
      index: 49,
      headerTitle: "YouTube",
      essential: false,
      multiline: false,
    },
    {
      index: 50,
      headerTitle: "その他SNS",
      essential: false,
      multiline: false,
    },
    {
      index: 51,
      headerTitle: "個人のブログ",
      essential: false,
      multiline: false,
    },
    {
      index: 52,
      headerTitle: "その他インターネットサイト（検索サイトを除く）",
      essential: false,
      multiline: false,
    },
    {
      index: 53,
      headerTitle: "日本政府観光局の案内所",
      essential: false,
      multiline: false,
    },
    {
      index: 54,
      headerTitle: "旅行会社パンフレット",
      essential: false,
      multiline: false,
    },
    {
      index: 55,
      headerTitle: "旅行ガイドブック",
      essential: false,
      multiline: false,
    },
    {
      index: 56,
      headerTitle: "自国の親戚・知人",
      essential: false,
      multiline: false,
    },
    {
      index: 57,
      headerTitle: "日本在住の親族・知人",
      essential: false,
      multiline: false,
    },
    {
      index: 58,
      headerTitle: "旅行の展示会や見本市",
      essential: false,
      multiline: false,
    },
    {
      index: 59,
      headerTitle: "テレビ番組",
      essential: false,
      multiline: false,
    },
    {
      index: 60,
      headerTitle: "新聞",
      essential: false,
      multiline: false,
    },
    {
      index: 61,
      headerTitle: "旅行専門誌",
      essential: false,
      multiline: false,
    },
    {
      index: 62,
      headerTitle: "その他雑誌",
      essential: false,
      multiline: false,
    },
    {
      index: 63,
      headerTitle: "その他",
      essential: false,
      multiline: false,
    },
    {
      index: 64,
      headerTitle: "特になし",
      essential: false,
      multiline: false,
    },
    {
      index: 65,
      headerTitle: "訪日回数",
      essential: true,
      multiline: false,
    },
    {
      index: 66,
      headerTitle: "訪問目的(県)ALL",
      essential: true,
      multiline: true,
    },
    {
      index: 67,
      headerTitle: "日本食を食べること",
      essential: false,
      multiline: false,
    },
    {
      index: 68,
      headerTitle: "日本の酒を飲むこと（日本酒・焼酎等）",
      essential: false,
      multiline: false,
    },
    {
      index: 69,
      headerTitle: "旅館に宿泊",
      essential: false,
      multiline: false,
    },
    {
      index: 70,
      headerTitle: "温泉入浴",
      essential: false,
      multiline: false,
    },
    {
      index: 71,
      headerTitle: "自然・景勝地観光",
      essential: false,
      multiline: false,
    },
    {
      index: 72,
      headerTitle: "繁華街の街歩き",
      essential: false,
      multiline: false,
    },
    {
      index: 73,
      headerTitle: "ショッピング",
      essential: false,
      multiline: false,
    },
    {
      index: 74,
      headerTitle: "美術館・博物館・動植物園・水族館",
      essential: false,
      multiline: false,
    },
    {
      index: 75,
      headerTitle: "テーマパーク",
      essential: false,
      multiline: false,
    },
    {
      index: 76,
      headerTitle: "スキー・スノーボード",
      essential: false,
      multiline: false,
    },
    {
      index: 77,
      headerTitle: "その他スポーツ（ゴルフ等）",
      essential: false,
      multiline: false,
    },
    {
      index: 78,
      headerTitle: "舞台・音楽鑑賞",
      essential: false,
      multiline: false,
    },
    {
      index: 79,
      headerTitle: "スポーツ観戦（相撲・サッカー等）",
      essential: false,
      multiline: false,
    },
    {
      index: 80,
      headerTitle: "自然体験ツアー・農山漁村体験",
      essential: false,
      multiline: false,
    },
    {
      index: 81,
      headerTitle: "四季の体感（花見・紅葉・雪等）",
      essential: false,
      multiline: false,
    },
    {
      index: 82,
      headerTitle: "映画・アニメ縁の地を訪問",
      essential: false,
      multiline: false,
    },
    {
      index: 83,
      headerTitle: "日本の歴史・伝統文化体験",
      essential: false,
      multiline: false,
    },
    {
      index: 84,
      headerTitle: "日本の日常生活体験",
      essential: false,
      multiline: false,
    },
    {
      index: 85,
      headerTitle: "日本のポップカルチャーを楽しむ",
      essential: false,
      multiline: false,
    },
    {
      index: 86,
      headerTitle: "治療・検診",
      essential: false,
      multiline: false,
    },
    {
      index: 87,
      headerTitle: "上記には当てはまるものがない",
      essential: false,
      multiline: false,
    },
    {
      index: 88,
      headerTitle: "訪問目的(施設)ALL",
      essential: true,
      multiline: true,
    },
    {
      index: 89,
      headerTitle: "行きたい観光スポットがあったから",
      essential: false,
      multiline: false,
    },
    {
      index: 90,
      headerTitle: "景観・自然・気候を楽しみたいから",
      essential: false,
      multiline: false,
    },
    {
      index: 91,
      headerTitle: "行きたいお店・ここでしか購入できないものがあるから",
      essential: false,
      multiline: false,
    },
    {
      index: 92,
      headerTitle: "泊まりたいホテル・旅館があるから",
      essential: false,
      multiline: false,
    },
    {
      index: 93,
      headerTitle: "温泉を楽しみたいから",
      essential: false,
      multiline: false,
    },
    {
      index: 94,
      headerTitle: "地域の食事や特産品を味わいたい（or買いたい）から",
      essential: false,
      multiline: false,
    },
    {
      index: 95,
      headerTitle: "ドライブ・ツーリングを楽しみたいから",
      essential: false,
      multiline: false,
    },
    {
      index: 96,
      headerTitle: "写真を撮影したいから",
      essential: false,
      multiline: false,
    },
    {
      index: 97,
      headerTitle: "日常を離れ、バカンスを楽しみたいから",
      essential: false,
      multiline: false,
    },
    {
      index: 98,
      headerTitle: "費用が手頃だから",
      essential: false,
      multiline: false,
    },
    {
      index: 99,
      headerTitle: "以前に訪問し気に入ったから",
      essential: false,
      multiline: false,
    },
    {
      index: 100,
      headerTitle: "友人・知人に勧められたから",
      essential: false,
      multiline: false,
    },
    {
      index: 101,
      headerTitle: "テレビ・雑誌・インターネットで紹介されていたから",
      essential: false,
      multiline: false,
    },
    {
      index: 102,
      headerTitle: "同行者が訪問したがったから",
      essential: false,
      multiline: false,
    },
    {
      index: 103,
      headerTitle: "ツアーに組み込まれていたから",
      essential: false,
      multiline: false,
    },
    {
      index: 104,
      headerTitle: "出張など用事があったため",
      essential: false,
      multiline: false,
    },
    {
      index: 105,
      headerTitle: "その他",
      essential: false,
      multiline: false,
    },
    {
      index: 106,
      headerTitle: "満足度(施設)",
      essential: true,
      multiline: false,
    },
    {
      index: 107,
      headerTitle: "満足度の理由(施設)",
      essential: true,
      multiline: false,
    },
    {
      index: 108,
      headerTitle: "一人当たりの消費額(施設)(金額)",
      essential: true,
      multiline: false,
    },
    {
      index: 109,
      headerTitle: "一人当たりの消費額(施設)(通貨)",
      essential: true,
      multiline: false,
    },
    {
      index: 110,
      headerTitle: "交通手段(施設)ALL",
      essential: true,
      multiline: true,
    },
    {
      index: 111,
      headerTitle: "レンタカー",
      essential: false,
      multiline: false,
    },
    {
      index: 112,
      headerTitle: "借上バス",
      essential: false,
      multiline: false,
    },
    {
      index: 113,
      headerTitle: "路線バス",
      essential: false,
      multiline: false,
    },
    {
      index: 114,
      headerTitle: "タクシー",
      essential: false,
      multiline: false,
    },
    {
      index: 115,
      headerTitle: "ハイヤー",
      essential: false,
      multiline: false,
    },
    {
      index: 116,
      headerTitle: "自転車",
      essential: false,
      multiline: false,
    },
    {
      index: 117,
      headerTitle: "鉄道",
      essential: false,
      multiline: false,
    },
    {
      index: 118,
      headerTitle: "徒歩",
      essential: false,
      multiline: false,
    },
    {
      index: 119,
      headerTitle: "その他",
      essential: false,
      multiline: false,
    },
    {
      index: 120,
      headerTitle: "認知経路(施設)ALL",
      essential: true,
      multiline: true,
    },
    {
      index: 121,
      headerTitle: "日本政府観光局(JNTO)ホームページ",
      essential: false,
      multiline: false,
    },
    {
      index: 122,
      headerTitle: "旅行会社ホームページ",
      essential: false,
      multiline: false,
    },
    {
      index: 123,
      headerTitle: "宿泊施設ホームページ",
      essential: false,
      multiline: false,
    },
    {
      index: 124,
      headerTitle: "航空会社ホームページ",
      essential: false,
      multiline: false,
    },
    {
      index: 125,
      headerTitle: "地方観光協会ホームページ",
      essential: false,
      multiline: false,
    },
    {
      index: 126,
      headerTitle: "宿泊予約サイト(例：Agoda、Expedia、Booking.com等)",
      essential: false,
      multiline: false,
    },
    {
      index: 127,
      headerTitle: "口コミサイト（Tripadvisor等）",
      essential: false,
      multiline: false,
    },
    {
      index: 128,
      headerTitle: "Google Mapなどの地図アプリやサイトでの検索",
      essential: false,
      multiline: false,
    },
    {
      index: 129,
      headerTitle: "Instagram",
      essential: false,
      multiline: false,
    },
    {
      index: 130,
      headerTitle: "X (Twitter)",
      essential: false,
      multiline: false,
    },
    {
      index: 131,
      headerTitle: "Facebook",
      essential: false,
      multiline: false,
    },
    {
      index: 132,
      headerTitle: "YouTube",
      essential: false,
      multiline: false,
    },
    {
      index: 133,
      headerTitle: "その他SNS",
      essential: false,
      multiline: false,
    },
    {
      index: 134,
      headerTitle: "個人のブログ",
      essential: false,
      multiline: false,
    },
    {
      index: 135,
      headerTitle: "その他インターネットサイト（検索サイトを除く）",
      essential: false,
      multiline: false,
    },
    {
      index: 136,
      headerTitle: "日本政府観光局の案内所",
      essential: false,
      multiline: false,
    },
    {
      index: 137,
      headerTitle: "旅行会社パンフレット",
      essential: false,
      multiline: false,
    },
    {
      index: 138,
      headerTitle: "旅行ガイドブック",
      essential: false,
      multiline: false,
    },
    {
      index: 139,
      headerTitle: "自国の親戚・知人",
      essential: false,
      multiline: false,
    },
    {
      index: 140,
      headerTitle: "日本在住の親族・知人",
      essential: false,
      multiline: false,
    },
    {
      index: 141,
      headerTitle: "旅行の展示会や見本市",
      essential: false,
      multiline: false,
    },
    {
      index: 142,
      headerTitle: "テレビ番組",
      essential: false,
      multiline: false,
    },
    {
      index: 143,
      headerTitle: "新聞",
      essential: false,
      multiline: false,
    },
    {
      index: 144,
      headerTitle: "旅行専門誌",
      essential: false,
      multiline: false,
    },
    {
      index: 145,
      headerTitle: "その他雑誌",
      essential: false,
      multiline: false,
    },
    {
      index: 146,
      headerTitle: "その他",
      essential: false,
      multiline: false,
    },
    {
      index: 147,
      headerTitle: "特になし",
      essential: false,
      multiline: false,
    },
    {
      index: 148,
      headerTitle: "家族・知人への推奨度(施設)",
      essential: true,
      multiline: false,
    },
    {
      index: 149,
      headerTitle: "推奨度の理由(旅行)",
      essential: true,
      multiline: false,
    },
  ].sort((a, b) => a.index - b.index),
};

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
