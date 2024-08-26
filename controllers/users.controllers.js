import { createUser, getUser } from "../models/users.models.js";
import UserModel from "../models/users.models.js";
import { createSession } from '../models/sessions.models.js';
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

export const register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await getUser({ email });
    if (checkUser) {
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
};

export const login = async (req, res) => {
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

     await createSession({apiKey})
    res.status(201).send({
      message: "login success",
      apiKey,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
};