import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/collections.js";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const UserModel = new mongoose.model(COLLECTIONS.USERS, userSchema);

export const getUser = (data) => {
    return UserModel.findOne({ data });
  };
  
  export const createUser = (data) => {
    return UserModel.create(data);
  };

export default UserModel;