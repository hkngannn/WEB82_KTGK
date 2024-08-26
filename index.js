import express from 'express'
import mongoose from 'mongoose';
import dotevn from 'dotenv';
// import { login, register } from './controllers/users.controllers.js';
import { createSession } from './models/sessions.models.js';
import { posts } from './controllers/posts.controllers.js';
import authMiddleware from './middlewares/auth.js';
dotevn.config();
const app = express();
app.use(express.json())

await mongoose.connect(process.env.MONGO_DB);
console.log('connected')
app.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await getUser({ email });
    if (checkUser.length) {
      throw new Error("This email has been existed");
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = {userName, email, password: hashPassword};
    const createNewUser = await createUser(newUser);

    res.status(200).send({
        message: "success",
        user: createNewUser,
    })
  } catch (error) {
    res.status(500).send({
        message: error.message,
      });
  }
})
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
      throw new Error("Invalid email");
    }

    const checkPassword = bcrypt.compareSync(password, findUser.password);
    if (!checkPassword) {
      throw new Error("Password is incorrect");
    }
    const randomstring = uuidv4();
    const apiKey = `mern-${findUser._id}-${findUser.email}-${randomstring}`

     await createSession(apiKey)
    res.status(201).send({
      message: "login success",
      apiKey,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}
)

app.use(authMiddleware.authentication)

app.post("/posts", posts);
app.put("/posts/:id", updatePost)

app.listen(process.env.PORT_DEVELOP, () => {
    console.log("Server is running!");
  });