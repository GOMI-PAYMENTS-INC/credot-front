export const getElementLocation = (id: string) => {
  const target = document.querySelector(`#${id}`) as HTMLElement;
  return target;
};
