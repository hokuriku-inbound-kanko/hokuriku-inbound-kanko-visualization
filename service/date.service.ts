/**
 * Date型を便利に取り扱うための関数群
 */
export class DateService {
  /**
   * 昨日のDateを取得する
   * @returns {Date} 昨日のDate
   */
  public static yesterday(): Date {
    const result = new Date();
    result.setDate(result.getDate() - 1);
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
}
