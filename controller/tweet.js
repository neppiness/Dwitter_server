import * as tweetRepo from '../data/tweet.js';

export function getAll(req, res, next) {
    const username = req.query.username;
    const data = username
        ? tweetRepo.tweets.filter(tweet => tweet.username === username)
        : tweetRepo.tweets;
    res.status(200).json(data);
};

export function getById(req, res, next) {
    const id = req.params.id;
    let data = tweetRepo.findTweetsById(id);
    res.status(200).json(data);
};

export function post(req, res, next) {
    let newTweet = tweetRepo.createNewTweet(req);
    tweetRepo.pushNewTweet(newTweet);
    res.status(201).json(newTweet);
}

export function putById(req, res, next) {
    const id = req.params.id;
    const reqText = req.body.text;

    let foundTweet = tweetRepo.tweets.find(tweet => tweet.id === id);

    if (foundTweet) {
        foundTweet.text = reqText;
        foundTweet.createdAt = new Date();
        res.status(200).json(foundTweet);
    } else {
        res.status(404).json({message: `Tweet id#${id} not found`});
    };
}

export function remove(req, res, next) {
    const id = req.params.id;
    let modTweets = tweetRepo.tweets.filter((tweet) => tweet.id === id);
    res.status(204).json(modTweets);
};