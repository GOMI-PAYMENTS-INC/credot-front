/** 문자열의 길이가 길어지는 경우 특정 길이 이후로는 '...'으로 대체하는 함수
 *  @string 문자열
 *  @length 제한할 문자열 길이
 
 * ex) console.log(replaceOverLength("asdf","1"))  a...
 */
export const replaceOverLength = (string: string, length: number) => {
  if (string.length > length) {
    return string.substring(0, length) + '...';
  }
  return string;
};
