import express, { Request, Response } from 'express';
import sequelize from './models/index';
import Text from './models/text';

const app = express();
app.use(express.json());

app.post('/texts', async (req: Request, res: Response) => {
  const { content } = req.body;
  const text = await Text.create({ content });
  res.status(201).json(text);
});

app.get('/texts', async (req: Request, res: Response) => {
  const texts = await Text.findAll();
  res.json(texts);
});

app.put('/texts/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  await Text.update({ content }, { where: { id } });
  res.json({ message: 'Text updated' });
});

app.delete('/texts/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Text.destroy({ where: { id } });
  res.json({ message: 'Text deleted' });
});

sequelize.sync().then(() => {
  app.listen(3000, () =>
    console.log('Server running on http://localhost:3000')
  );
});
