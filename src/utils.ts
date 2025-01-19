import Text from './models/text';

export function getWordCount(content: string): number {
  return content.split(' ').filter((p) => p.trim() !== '').length;
}

export function getCharacterCount(content: string): number {
  // counts punction characters
  return content.split('').filter((p) => p.trim() !== '').length;
}

export function getNumberOfSentences(content: string): number {
  const punctuations = ['.', '!', '?'];
  const res = content
    .split(new RegExp(`[${punctuations.join('')}]`, 'g'))
    .filter((p) => p.trim() !== '')
    .filter(Boolean).length;

  return res;
}

export function getNumberOfParagraphs(content: string): number {
  return content.split('\n').filter((p) => p.trim() !== '').length;
}

export function getLongestWordsInParagraph(content: string): string[] {
  const paragraphs = content.split('\n');
  const words = paragraphs.map((paragraph) => paragraph.split(' '));
  const longestWords = words.map((paragraph) =>
    paragraph.reduce((acc, word) => (word.length > acc.length ? word : acc), '')
  );
  return longestWords;
}

export function validateContent(content: any) {
  return typeof content === 'string' && content.trim() !== '';
}

export async function findTextById(id: number) {
  const texts = await Text.findAll();
  return texts.find((t) => t.id === id);
}
