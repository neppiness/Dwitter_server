import {tweets, pushNewTweet, concatTweets} from '../data/data.js';

export function getTweets(req, res, next) {
    const username = req.query.username;
    const data = username
        ? tweets.filter(tweet => tweet.username === username)
        : tweets;
    return data;
};

export function getTweetsById(req, res, next) {
    const id = req.params.id;
    const data = tweets.find(tweet => tweet.id === id);
    return data;
};

export function postTweet(req, res, next) {
    const {text, name, username} = req.body;
    const newTweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    };
    pushNewTweet(newTweet);
    return newTweet;
}

export function findTweetById(req, res, next) {
    const id = req.params.id;
    const reqText = req.body.text;
    let foundTweet = tweets.find(tweet => tweet.id === id);
    if (foundTweet) {
        foundTweet.text = reqText;
        foundTweet.createdAt = new Date();
    }
    return foundTweet;
};

export function findTweetIndex(id) {
    let foundIndex = -1;
    for (let i = 0; i < tweets.length; i++) {
        if (tweets[i].id == id) {foundIndex = i};
    }
    return foundIndex;
};

export function deleteTweetByIndex(index) {
    index++;
    let arrayOnLeft = tweets.slice(0, index);
    arrayOnLeft.pop(); // deleting target
    let arrayOnRight = tweets.slice(index);
    return concatTweets(arrayOnLeft, arrayOnRight);
};