import {getTweets} from '../db/database.js';
import {findById} from '../data/auth.js';
import MongoDb from 'mongodb';

const ObjectId = MongoDb.ObjectId;

export async function queryingAll() {
    let allTweets = [];

    await getTweets()
    .find({})
    .forEach(tweet => {
        allTweets.push(tweet);
    })

    return allTweets
}

export async function queryingByUsername(username) {
    let tweetsFoundByUsername = [];

    await getTweets()
    .find({username})
    .forEach(tweet => {
        tweetsFoundByUsername.push(tweet);
    })

    return tweetsFoundByUsername;
}

export async function findTweetsById(id) {
    return getTweets()
    .findOne({_id: new ObjectId(id)})
    .then(mapOptionalTweet);
}

export async function createNew(text, userId) {
    const user = await findById(userId);
    const timeStamp = new Date();
    const tweet = {
        "username": user.username,
        "userid": user.id,
        "createdAt": timeStamp,
        "updatedAt": timeStamp,
        text,
    };

    return getTweets()
    .insertOne(tweet)
    .then(data => {
        return {
            "id": data.insertedId.toString(),
            ...tweet,
        }
    })
}

export async function deleteById(id) {
    id = new ObjectId(id);
    return getTweets()
    .deleteOne({_id: new ObjectId(id)})
};

function mapOptionalTweet(tweet) {
    return tweet ? {...tweet, id: tweet._id} : tweet;
}