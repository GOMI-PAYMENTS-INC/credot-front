export function convertTypeToValue<V extends string, T extends { [key in string]: V }>(
  o: T,
): T {
  return o;
}
