export const capitalize = (str: String) => {
  let lower = str.toLowerCase();
  let newStr = lower.replace(/\b[a-z]/g, (char: String) => char.toUpperCase());

  return newStr;
};
