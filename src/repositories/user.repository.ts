import mongoose from "mongoose";
import UserModel from "../database/models/user.model";
import { IuserInterface } from "../database/interfaces/user.interface";
import { promises } from "dns";

export const getUserRepo = async (
    userId: string
): Promise<IuserInterface | null> => {
    try {
        const user = await UserModel.findOne({ uid: userId });
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const deleteUserRepo = async (userId: string): Promise<boolean> => {
    try {
        const deleted = await UserModel.findOneAndDelete({ uid: userId });
        if (deleted) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const createUserRepo = async (
    user: IuserInterface
): Promise<boolean> => {
    try {
        const result = await UserModel.create(user);
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const updateUserRepo = async (
    userId: string,
    updatedUser: IuserInterface
): Promise<boolean> => {
    try {
        const result = await UserModel.findOneAndUpdate(
            { uid: userId },
            updatedUser,
            { new: true }
        );
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};
export const updateUserWithTweetIdRepo = async (
    userId: string,
    tweetId: string
): Promise<boolean> => {
    try {
        const result = await UserModel.findOneAndUpdate(
            { uid: userId },
            { $push: { tweets: tweetId } }
        );
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const deleteUserWithTweetIdRepo = async (
    tweetId: string
): Promise<boolean> => {
    try {
        const result = await UserModel.findOneAndUpdate({
            $pull: { tweets: tweetId },
        });
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};
