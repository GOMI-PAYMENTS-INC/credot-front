export const openBrowser = (url: string, sorted?: TSortBy) => {
  let _url = url;

  if (sorted) {
    _url = sorted === 'S' ? url + '&sortBy=sales' : url;
  }
  window.open(_url);
};
