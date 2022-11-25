import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import path from 'path'
import { fileURLToPath } from 'url';

const app=express();
app.use(express.json());
const hostname='192.168.1.12';
const port=process.env.PORT || 9090;
const databaseName = 'StudentChat';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });


  app.use('/user',userRoutes);
  app.use('/post',postRoutes);

  //load image from url
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use("/images/user",express.static(path.join(__dirname , "public/images/user")))
  app.use("/images/post",express.static(path.join(__dirname , "public/images/post")))

app.listen(port,hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})