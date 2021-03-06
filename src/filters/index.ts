
/**
 * 时间转化
 *
 * @export
 * @param {Date} time
 * @param {string} formatStr
 * @returns {string}
 */
export function format(time: Date, formatStr: string): string {
  const date = new Date(time);
  const o: any = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    'S': date.getMilliseconds(), // millisecond
  };
  if (/(y+)/.test(formatStr)) {
    formatStr = formatStr.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(formatStr)) {
      formatStr = formatStr.replace(RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return formatStr;
}
