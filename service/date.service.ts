/**
 * Date型を便利に取り扱うための関数群
 */
export class DateService {
  /**
   * 昨日のDateを取得する
   * @returns {Date} 昨日のDate
   */
  public static yesterday(): Date {
    return this.nDaysAgo(1);
  }

  /**
   * n日前のDateを取得する
   * @param n
   * @returns
   */
  public static nDaysAgo(n: number): Date {
    const result = new Date();
    result.setDate(result.getDate() - n);
    return result;
  }

  /**
   * 与えられたDateの0埋めされた年月日の文字列を取得する
   * @param date 年月日文字列を取得したいDate
   * @param delimiter default: `-`
   * @returns {string} `YYYY${delimiter}MM${delimiter}DD`
   */
  public static dateStrOf(date: Date, delimiter: string = "-"): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const dayOfMonth = date.getDate().toString().padStart(2, "0");
    return `${year}${delimiter}${month}${delimiter}${dayOfMonth}`;
  }

  /**
   * Date a から Date b を引いた値
   * @param a
   * @param b
   */
  public static sub(from: Date, to: Date) {
    const diffEpochTime = to.getTime() - from.getTime();
    return {
      times: diffEpochTime,
      days: Math.ceil(diffEpochTime / (1000 * 60 * 60 * 24)),
    };
  }
}
