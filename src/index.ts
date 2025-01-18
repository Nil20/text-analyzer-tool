import express, { Request, Response } from 'express';
import sequelize from './models/index';
import Text from './models/text';
import {
  findTextById,
  getCharacterCount,
  getLongestWordsInParagraph,
  getNumberOfParagraphs,
  getNumberOfSentences,
  getWordCount,
  validateContent,
} from './utils';

const app = express();
app.use(express.json());

app.post('/texts', async (req: Request, res: Response): Promise<any> => {
  const { content } = req.body;
  if (!validateContent(content)) {
    return res
      .status(400)
      .json({ error: 'Invalid content. Could not save text in db.' });
  }
  const text = await Text.create({ content });
  return res.status(201).json(text);
});

app.get('/texts', async (req: Request, res: Response) => {
  try {
    const texts = await Text.findAll();
    res.json(texts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/texts/:id', async (req: Request, res: Response): Promise<any> => {
  const { content } = req.body;
  const { id: toBeUpdatedId } = req.params;

  const existingText = await findTextById(Number(toBeUpdatedId));

  if (!existingText) {
    return res.status(404).json({ error: 'Text not found for updating.' });
  }

  await Text.update({ content }, { where: { id: toBeUpdatedId } });
  res.json({ message: 'Text updated' });
});

app.delete('/texts/:id', async (req: Request, res: Response): Promise<any> => {
  const { id: toBeUpdatedId } = req.params;
  const existingText = await findTextById(Number(toBeUpdatedId));

  if (!existingText) {
    return res.status(404).json({ error: 'Text not found for deletion.' });
  }

  await Text.destroy({ where: { id: toBeUpdatedId } });
  res.json({ message: 'Text deleted' });
});

app.post(
  '/api/number-of-words',
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { content } = req.body;
      if (!validateContent(content)) {
        return res
          .status(400)
          .json({ error: 'Invalid content. Please provide a string.' });
      }
      const wordCount = getWordCount(content);
      res.status(201).json({ wordCount });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

app.post(
  '/api/number-of-characters',
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { content } = req.body;
      if (!validateContent(content)) {
        return res
          .status(400)
          .json({ error: 'Invalid content. Please provide a string.' });
      }
      const characterCount = getCharacterCount(content);
      res.status(201).json({ characterCount });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

app.post(
  '/api/number-of-sentences',
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { content } = req.body;
      if (!validateContent(content)) {
        return res
          .status(400)
          .json({ error: 'Invalid content. Please provide a string.' });
      }
      const sentenceCount = getNumberOfSentences(content);
      res.status(201).json({ sentenceCount });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

app.post(
  '/api/number-of-paragraphs',
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { content } = req.body;
      if (!validateContent(content)) {
        return res
          .status(400)
          .json({ error: 'Invalid content. Please provide a string.' });
      }
      const paragraphCount = getNumberOfParagraphs(content);
      res.status(201).json({ paragraphCount });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

app.post(
  '/api/longest-words',
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { content } = req.body;
      if (!validateContent(content)) {
        return res
          .status(400)
          .json({ error: 'Invalid content. Please provide a string.' });
      }
      const longestWords = getLongestWordsInParagraph(content);
      res.status(201).json({ longestWords });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

sequelize.sync().then(() => {
  app.listen(3000, () =>
    console.log('Server running on http://localhost:3000')
  );
});
