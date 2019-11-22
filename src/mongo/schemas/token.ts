import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IToken extends mongoose.Document {
  token: string;
  payload: Object;
}

const schema: mongoose.Schema = new Schema({
  token: { type: String, require: true, unique: true },
  payload: { type: Object }
});

const model = mongoose.model<IToken>('token', schema);

export default model;
