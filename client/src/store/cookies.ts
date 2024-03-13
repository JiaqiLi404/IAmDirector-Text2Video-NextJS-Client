import { setCookie,getCookie,deleteCookie } from "cookies-next";

export const loadCookies = (k: string) => {
  return getCookie(k);
};

export const saveCookies = (k: string, v: any) => {
  setCookie(k, v, { maxAge: 60 * 60 * 24 });
};

export const removeCookies = (k: string) => {
  deleteCookie(k);
}
