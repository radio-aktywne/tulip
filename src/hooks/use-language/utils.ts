import { defaultUserLanguage } from "../../constants";

export function getCurrentLanguage() {
  return window.navigator.language;
}

export function getDefaultLanguage() {
  return defaultUserLanguage;
}

export function subscribeLanguageChange(callback: () => void) {
  window.addEventListener("languagechange", callback);
  return () => {
    window.removeEventListener("languagechange", callback);
  };
}
