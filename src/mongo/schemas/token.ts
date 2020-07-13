/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

export interface IToken extends mongoose.Document {
    userId?: Types.ObjectId;
    token: string;
    payload: Object;
    pushNotificationToken?: string;
}

const schema: mongoose.Schema = new Schema({
    userId: Schema.Types.ObjectId,
    token: { type: String, require: true, unique: true },
    payload: { type: Object },
    pushNotificationToken: String
});

const model = mongoose.model<IToken>('token', schema);

export default model;
