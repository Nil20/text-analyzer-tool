export function getWordCount(content: string): number {
  return content.split(' ').length;
}

export function getCharacterCount(content: string): number {
  return content.length;
}

export function getNumberOfSentences(content: string): number {
  return content.split('.').length - 1;
}

export function getNumberOfParagraphs(content: string): number {
  return content.split('\n').length;
}

export function getLongestWordsInParagraph(content: string): string[] {
  const paragraphs = content.split('\n');
  const words = paragraphs.map((paragraph) => paragraph.split(' '));
  const longestWords = words.map((paragraph) =>
    paragraph.reduce((acc, word) => (word.length > acc.length ? word : acc), '')
  );
  return longestWords;
}
