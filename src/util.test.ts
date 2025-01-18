import {
  getWordCount,
  getCharacterCount,
  getNumberOfSentences,
  getNumberOfParagraphs,
  getLongestWordsInParagraph,
  validateContent,
} from './utils';

const demoString =
  'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.';

describe('Text Analysis Functions', () => {
  test('getWordCount should return the correct word count', () => {
    expect(getWordCount(demoString)).toBe(16);
  });

  test('getCharacterCount should return the correct character count', () => {
    expect(getCharacterCount(demoString)).toBe(75);
  });

  test('getNumberOfSentences should return the correct number of sentences', () => {
    expect(getNumberOfSentences(demoString)).toBe(2);
  });

  test('getNumberOfParagraphs should return the correct number of paragraphs', () => {
    expect(getNumberOfParagraphs(demoString)).toBe(1);
  });

  test('getLongestWordsInParagraph should return the longest word in each paragraph', () => {
    expect(getLongestWordsInParagraph(demoString).length).toEqual(1);
    expect(getLongestWordsInParagraph(demoString)[0].length).toEqual(5);
  });

  test('validateContent should return true for valid content', () => {
    expect(validateContent(demoString)).toBe(true);
  });

  test('validateContent should return false for empty string', () => {
    expect(validateContent('')).toBe(false);
  });

  test('validateContent should return false for a number', () => {
    expect(validateContent(123)).toBe(false);
  });
});
