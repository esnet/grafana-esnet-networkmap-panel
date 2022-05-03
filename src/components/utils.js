export function getUrlSearchParams() {
  const search = window.location.search.substring(1);
  const searchParamsSegments = search.split('&');
  let params = {};
  for (const p of searchParamsSegments) {
    const keyValuePair = p.split('=');
    if (keyValuePair.length > 1) {
      // key-value param
      const key = decodeURIComponent(keyValuePair[0]);
      const value = decodeURIComponent(keyValuePair[1]);
      if (key in params) {
        params[key] = [...params[key], value];
      } else {
        params[key] = [value];
      }
    } else if (keyValuePair.length === 1) {
      // boolean param
      const key = decodeURIComponent(keyValuePair[0]);
      params[key] = true;
    }
  }
  return params;
}
