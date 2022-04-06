import * as tweetRepo from '../data/tweet.js';

export async function getAll(req, res, next) {
    const username = req.query.username;
    const data = await (username
        ? tweetRepo.tweets.filter(tweet => tweet.username === username)
        : tweetRepo.tweets);
    res.status(200).json(data);
};

export async function getById(req, res, next) {
    const id = req.params.id;
    let data = await tweetRepo.findTweetsById(id);
    res.status(200).json(data);
};

export async function post(req, res, next) {
    let newTweet = await tweetRepo.createNewTweet(req);
    await tweetRepo.pushNewTweet(newTweet);
    res.status(201).json(newTweet);
}

export async function putById(req, res, next) {
    const id = req.params.id;
    const reqText = req.body.text;

    let foundTweet = await tweetRepo.tweets.find(tweet => tweet.id === id);

    if (foundTweet) {
        foundTweet.text = reqText;
        foundTweet.createdAt = new Date();
        res.status(200).json(foundTweet);
    } else {
        res.status(404).json({message: `Tweet id#${id} not found`});
    };
}

export async function remove(req, res, next) {
    const id = req.params.id;
    let modTweets = await tweetRepo.tweets.filter((tweet) => tweet.id === id);
    res.status(204).json(modTweets);
};