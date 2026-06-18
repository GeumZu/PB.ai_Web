const CHOSUNG = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

function getChosung(char: string): string {
  const code = char.charCodeAt(0) - 0xAC00;
  if (code < 0 || code > 11171) return char;
  return CHOSUNG[Math.floor(code / (21 * 28))];
}

function isChosung(str: string): boolean {
  return CHOSUNG.includes(str);
}

export function matchesQuery(target: string, query: string): boolean {
  if (!query) return false;
  const q = query.trim();

  // 단일 초성 검색: ㄴ → 첫 글자 초성이 ㄴ인 경우
  if (q.length === 1 && isChosung(q)) {
    return getChosung(target.charAt(0)) === q ||
      target.toLowerCase().startsWith(q.toLowerCase());
  }

  // 일반 검색 (대소문자 무시)
  return target.toLowerCase().includes(q.toLowerCase());
}
