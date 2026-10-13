// src/utils/textTokenizer.js
export const parseTextToTokens = (text) => {
  if (!text) return [];
  const cleanedText = text.replace(/\s+([.,!?:;()\-!])/g, '$1');
  const tokens = [];
  let isBold = false;
  let charIndex = 0;
  let wordCounter = 0;
  let i = 0;

  while (i < cleanedText.length) {
    if (cleanedText.startsWith('**', i)) {
      isBold = !isBold;
      i += 2;
      continue;
    }
    const spaceMatch = cleanedText.slice(i).match(/^\s+/);
    if (spaceMatch) {
      const spaceStr = spaceMatch[0];
      tokens.push({
        text: spaceStr,
        isWord: false,
        isBold,
        isKeyword: isBold,
        charStart: charIndex,
        charEnd: charIndex + spaceStr.length,
        wordIndex: -1
      });
      charIndex += spaceStr.length;
      i += spaceStr.length;
      continue;
    }
    const punctMatch = cleanedText.slice(i).match(/^[.,!?:;()[\]{}'"“”«»„“\-–—/\\+]+/);
    if (punctMatch) {
      const punctStr = punctMatch[0];
      tokens.push({
        text: punctStr,
        isWord: false,
        isBold,
        isKeyword: isBold,
        charStart: charIndex,
        charEnd: charIndex + punctStr.length,
        wordIndex: -1
      });
      charIndex += punctStr.length;
      i += punctStr.length;
      continue;
    }
    const wordMatch = cleanedText.slice(i).match(/^[^\s.,!?:;()[\]{}'"“”«»„“\-–—/\\+*]+/);
    if (wordMatch) {
      const wordStr = wordMatch[0];
      tokens.push({
        text: wordStr,
        isWord: true,
        isBold,
        isKeyword: isBold,
        charStart: charIndex,
        charEnd: charIndex + wordStr.length,
        wordIndex: wordCounter++
      });
      charIndex += wordStr.length;
      i += wordStr.length;
      continue;
    }
    const singleChar = cleanedText[i];
    const isWord = /^[a-zA-Z0-9ÄäÖöÜüß]$/.test(singleChar);
    tokens.push({
      text: singleChar,
      isWord,
      isBold,
      isKeyword: isBold,
      charStart: charIndex,
      charEnd: charIndex + 1,
      wordIndex: isWord ? wordCounter++ : -1
    });
    charIndex += 1;
    i += 1;
  }
  return tokens;
};

export const calculateWordTimings = (tokens) => {
  const words = tokens.filter(t => t.isWord);
  const totalChars = words.reduce((sum, w) => sum + w.text.length, 0);
  let accumulated = 0;

  return words.map((w, idx) => {
    const startRatio = accumulated / (totalChars || 1);
    accumulated += w.text.length;
    const endRatio = accumulated / (totalChars || 1);
    return { wordIndex: idx, startRatio, endRatio };
  });
};
