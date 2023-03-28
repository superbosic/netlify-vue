export function urlParamsToObject(urlParams?:string) {
  return urlParams
    ? JSON.parse(`{"${decodeURI(urlParams).replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`)
    : {};
}
