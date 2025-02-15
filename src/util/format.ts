import { months } from "./arrays";

/* Date Format */
/**
 * Recives a string called date with the format YYYYMMDD.
 * @returns the string in format YYYY-MM-DD
 */
export function dateHTMLFormat(date: string) {
  return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6);
}
/**
 * Recives a string called date with the format YYYY-MM-DD.
 * @returns the string in format YYYYMMDD
 */
export function dateIntFormat(date: string) {
  return date.replaceAll("-", "");
}

/**
 * Recives a string called date with the format YYYY-MM-DD.
 * @returns the string in format YYYYMMDD
 */
export function dateStringFormat(date: string) {
  let month;
  try {
    month = parseInt(date.slice(4, 6)) - 1;
  } catch (error) {
    month = 0;
  }
  return date.slice(6) + "/" + months[month] + "/" + date.slice(0, 4);
}

/* Phone Format */
/**
 * Recives a string with a phone number.
 * @returns the phone number in format XXX-XXX-XXXX
 */
export function phoneStringFormat(phone: string) {
  if (phone !== "") {
    return phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6);
  }
  return "";
}

/* Number Format */
/**
 * Recives a number.
 * @returns the number in format X.XX
 */
export function numberDecFormat(num: number) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

/* Text Format */
/**
 * Recives a text.
 * @returns
 */
export function firstUpperCaseFormat(txt: string) {
  txt = txt.toLowerCase();
  var aux = txt.charAt(0).toUpperCase();
  txt = aux + txt.slice(1);
  return txt;
}
