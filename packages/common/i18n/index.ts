import ZHCN from "./ZHCN";
import ENUS from "./ENUS";
import ALLLang from "./ALL_LANG";
import type { i18nKey, i18nLang } from "./i18n-types";
export * from "./i18n-types";
export const isWindow = typeof window !== 'undefined';
/**
 * All launguages
 */
export const languages: { [_: string]: i18nLang } = {
  ZHCN,
  ENUS
};
export type LanguageType = keyof typeof languages;

let currentLang: LanguageType = "ZHCN";
export function changeLaunguage(lang: LanguageType) {
  document.body.setAttribute("data-locale", lang as string);
  currentLang = lang;
}

if (isWindow) {
  changeLaunguage(currentLang);
}

/**
 * Tool for translation
 * @param key 
 * @returns 
 */
export function t(key: i18nKey): string {
  const lang = languages[currentLang] || {};
  return lang[key] || key;
}