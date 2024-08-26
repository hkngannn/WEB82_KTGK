import express from 'express'
import mongoose from 'mongoose';
import dotevn from 'dotenv';
import { login, register } from './controllers/users.controllers.js';
import { posts, updatePost } from './controllers/posts.controllers.js';
import authMiddleware from './middlewares/auth.js';
dotevn.config();
const app = express();
app.use(express.json())

await mongoose.connect(process.env.MONGO_DB);
console.log('connected')
app.post("/register", register)
app.post("/login", login)

app.use(authMiddleware.authentication)

app.post("/posts", posts);
app.put("/posts/:id", updatePost)

app.listen(process.env.PORT_DEVELOP, () => {
    console.log("Server is running!");
  });