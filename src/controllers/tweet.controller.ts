import { Request, Response } from "express";
import {
    getTweetRepo,
    createTweetRepo,
    deleteTweetRepo,
    updateTweetRepo,
} from "../repositories/tweet.repository";
import { ITweetInterface } from "../database/interfaces/tweet.interface";
import {
    updateUserWithTweetIdRepo,
    deleteUserWithTweetIdRepo,
} from "../repositories/user.repository";

export const getTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;

    try {
        const tweet = await getTweetRepo(tweetId);
        if (tweet) {
            res.status(200).json({ data: tweet });
        } else {
            res.status(500).json({ error: "Tweet Not Found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

export const createTweetController = async (req: Request, res: Response) => {
    const tweet: ITweetInterface = req.body;
    try {
        const success = await createTweetRepo(tweet);
        if (success) {
            const userUpdateSuccess = await updateUserWithTweetIdRepo(
                tweet.adminId,
                tweet.tweetId
            );
            if (userUpdateSuccess) {
                res.status(200).json({ data: tweet });
            } else {
                res.status(500).json({ error: "Tweet Not Updated" });
            }
        } else {
            res.status(500).json({ error: "Tweet Not Created" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

export const updateTweetController = async (req: Request, res: Response) => {
    const updatedTweet: ITweetInterface = req.body;
    try {
        const success = await updateTweetRepo(updatedTweet.tweetId, updatedTweet);
        if (success) {
            res.status(200).json({ data: "Tweet Updated" });
        } else {
            res.status(500).json({ error: "Tweet Not Updated" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

export const deleteTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.userId as string;
    console.log("Received tweetId:", tweetId);
    try {
        const success = await deleteTweetRepo(tweetId);
        if (success) {
            const userDeleteeSuccess = await deleteUserWithTweetIdRepo(tweetId);
            if (userDeleteeSuccess) {
                res.status(200).json({ data: "Tweet Deleted" });
            } else {
                res.status(500).json({ error: "Tweet Not DELETED" });
            }
        } else {
            res.status(500).json({ error: "Tweet Not Deleted" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};
