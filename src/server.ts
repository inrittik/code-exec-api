import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
})


const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://mongo:27017/mydatabase")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });