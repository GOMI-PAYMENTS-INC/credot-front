export function getParameter(key: string) {
  return new URLSearchParams(window.location.search).get(key);
}
