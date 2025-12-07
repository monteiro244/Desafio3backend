import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.log(err));

const ItemSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
});

const Item = mongoose.model('Item', ItemSchema);

/* CREATE */
app.post('/items', async (req, res) => {
  const item = await Item.create(req.body);
  res.json(item);
});

/* READ */
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

/* UPDATE */
app.put('/items/:id', async (req, res) => {
  const item = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(item);
});

/* DELETE */
app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(3333, () =>
  console.log('🚀 Backend rodando na porta 3333')
);
