import mongoose, { Document, Schema } from "mongoose";
import { IuserInterface } from "../interfaces/user.interface";

const userSchema = new Schema<IuserInterface>({
    uid: { type: String, required: true },
    tweets: { type: [String], default: [] },
    firstName: { type: String, default: "User" },
    lastName: { type: String, default: "Name" },
    email: {
        type: String, required: true,
        createdAt: { type: String, required: true },
    },
});

const UserModel = mongoose.model<IuserInterface>('UserModel', userSchema)
export default UserModel;