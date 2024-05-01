import { Router } from "express";
import { getTweetController, createTweetController, deleteTweetController, updateTweetController } from "../controllers/tweet.controller";


const tweetRouter = Router();


// define route path 

tweetRouter.get("/:tweetId", getTweetController)
// tweetRouter.get("/:tweetId", getAllTweetsController)
tweetRouter.post("/", createTweetController)
tweetRouter.delete("/:userId", deleteTweetController)
tweetRouter.put("/", updateTweetController)

export default tweetRouter