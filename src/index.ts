import express from "express";
import postRoute from './routes/post-route';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/v1/posts', postRoute);


app.get("/", (req, res) => {
  res.send("Hi Jomok!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
