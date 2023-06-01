export function getParameter(location: Location, key: string) {
  return new URLSearchParams(location.search).get(key);
}
