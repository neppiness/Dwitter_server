import {getTweets} from '../db/database.js';
import {findById} from '../data/auth.js';
import MongoDb from 'mongodb';

const ObjectId = MongoDb.ObjectId;

export async function queryingAll() {
    return getTweets()
    .find()
    .sort({createdAt: -1})
    .toArray()
    .then(mapTweets)
}

export async function queryingByUsername(username) {
    return getTweets()
    .find({username})
    .sort({createdAt: -1})
    .toArray()
    .then(mapTweets)
}

export async function findTweetsById(id) {
    return getTweets()
    .findOne({_id: new ObjectId(id)})
    .then(mapOptionalTweet);
}

export async function createNew(text, userId) {
    const {name, username, url} = await findById(userId);
    const tweet = {
        text,
        createdAt: new Date(),
        userId,
        name,
        username,
        url,
    };
    return getTweets().insertOne(tweet).then(data => {
        return mapOptionalTweet({...tweet, _id: data.insertedId});
    })
}

export async function deleteById(id) {
    id = new ObjectId(id);
    return getTweets()
    .deleteOne({_id: new ObjectId(id)})
};

export async function updateTweet(id, text) {
    return getTweets()
    .findOneAndUpdate(
        {_id: new ObjectId(id)},
        {$set: {text}},
        {returnDocument: 'after'}
    )
    .then(console.log)
    .then(result => result.value)
    .then(mapOptionalTweet);
}

function mapOptionalTweet(tweet) {
    return tweet ? {...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet);
}