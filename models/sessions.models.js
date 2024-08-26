import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/collections.js";

const sessionSchema = new mongoose.Schema({
  session: {
    type: String,
    required: true,
  },
});

const SessionModel = new mongoose.model(COLLECTIONS.SESSIONS, sessionSchema);

export const createSession = (data) => SessionModel.create(data);
export const getApiKey = (data) => SessionModel.findOne(data)