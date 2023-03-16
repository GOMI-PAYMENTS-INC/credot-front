export const mergeCopiedValue = (_obj: any) => {
  const registerValue = _obj;
  return (...args: any) => Object.assign({}, registerValue, ...args);
};
