import {useVirtualId} from '../db/database.js';
import Mongoose from 'mongoose';

import {getTweets} from '../db/database.js';
import {findById} from '../data/auth.js';

const tweetSchema = new Mongoose.Schema({
    text: {type: String, required: true},
    userId: {type: String, required: true},
    name: {type: String, required: true},
    username: {type: String, required: true},
    url: String,
}, {timestamps: true});

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

export async function queryingAll() {
    return Tweet
        .find()
        .sort({createdAt: -1})
}

export async function queryingByUsername(username) {
    return Tweet
        .find({username})
        .sort({createdAt: -1})
}

export async function findTweetsById(id) {
    let foundTweet;
    try {
        foundTweet = Tweet.findOne({id})
    } catch {
        foundTweet = null;
    }
    return foundTweet
}

export async function createNew(text, userId) {
    const {name, username, url} = await findById(userId);
    const tweet = {
        text,
        userId,
        name,
        username,
        url,
    };
    return new Tweet(tweet)
        .save();
}

export async function deleteById(id) {
    return Tweet.deleteOne({id})
};

export async function updateTweet(id, text) {
    return Tweet.findByIdAndUpdate(id, {text}, {returnOriginal: false});
}

function mapOptionalTweet(tweet) {
    return tweet ? {...tweet, id: tweet._id.toString() } : tweet;
}
