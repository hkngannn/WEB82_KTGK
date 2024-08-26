import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/collections.js";

const sessionSchema = new mongoose.Schema({
  apiKey: {
    type: String,
    required: true,
  },
});

const SessionModel = new mongoose.model(COLLECTIONS.SESSIONS, sessionSchema);

export const createSession = (data) => {
  return SessionModel.create(data);
};
export const getApiKey = (data) => {
  return SessionModel.findOne(data);
};

export default SessionModel;
