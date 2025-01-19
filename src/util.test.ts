import {
  getWordCount,
  getCharacterCount,
  getNumberOfSentences,
  getNumberOfParagraphs,
  getLongestWordsInParagraph,
  validateContent,
  findTextById,
} from './utils';
import Text from './models/text';

jest.mock('./models/text', () => ({
  findAll: jest.fn(),
}));

const demoString =
  'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.';

describe('Text Analysis Functions', () => {
  beforeEach(() => {
    (Text.findAll as jest.Mock).mockClear();
  });

  test('getWordCount should return the correct word count', () => {
    expect(getWordCount(demoString)).toBe(16);
  });

  test('getCharacterCount should return the correct character count', () => {
    expect(getCharacterCount(demoString)).toBe(75);
  });

  test('getNumberOfSentences should return the correct number of sentences', () => {
    expect(getNumberOfSentences(demoString)).toBe(2);
  });

  const demoStringParagraphs =
    'I have a phd. \nI love it. \n\nAll the people love me too.';
  test('getNumberOfParagraphs should return the correct number of paragraphs', () => {
    expect(getNumberOfParagraphs(demoStringParagraphs)).toBe(3);
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

  it('should return the text object if found', async () => {
    const mockText = { id: 1, content: 'This is a test' };

    (Text.findAll as jest.Mock).mockResolvedValue([mockText]);

    const result = await findTextById(1);
    expect(result).toEqual(mockText);
    expect(Text.findAll).toHaveBeenCalledWith();
  });

  it('should return undefined if text is not found', async () => {
    (Text.findAll as jest.Mock).mockResolvedValue([]);

    const result = await findTextById(999);
    expect(result).toBeUndefined();
    expect(Text.findAll).toHaveBeenCalledWith();
  });
});
