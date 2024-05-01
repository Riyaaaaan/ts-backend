import { Document } from "mongoose";

export interface IuserInterface extends Document{
    uid:string,
    tweets:string[],
    firstName:string,
    lastName:string,
    email:string,
    createdAt:string
}