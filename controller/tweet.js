import * as tweetRepo from '../data/tweet.js';
import { getSocketIO } from '../connection/socket.js';

export async function getAll(req, res, next) {
    const username = req.query.username;

    const data = (username
        ? await tweetRepo.queryingByUsername(username)
        : await tweetRepo.queryingAll()
    )
    res.status(200).json(data);
};

export async function getById(req, res, next) {
    const id = req.params.id;
    let data = await tweetRepo.findTweetsById(id);
    res.status(200).json(data);
};

export async function post(req, res, next) {
    let userId = req.userId;
    const text = req.body.text;

    let newTweet = await tweetRepo.createNew(text, userId);

    res.status(201).json(newTweet);
    getSocketIO().emit('tweets', newTweet);
}

export async function putById(req, res, next) {
    const id = req.params.id;
    let usernameOfToken = req.username;
    let tweetOfId = await tweetRepo.findTweetsById(id);

    if (tweetOfId == null) {return res.status(404).json({message: `Tweet id#${id} not found`})}

    let usernameOfTweet = tweetOfId.username;
    if (usernameOfToken != usernameOfTweet) {return res.status(403).json()};

    const reqText = req.body.text;
    let updatedTweet = await tweetRepo.updateTweet(id, reqText);
    return res.status(200).json(updatedTweet);
}

export async function remove(req, res, next) {
    const id = req.params.id;

    let usernameOfToken = req.username;
    let tweetOfId = await tweetRepo.findTweetsById(id);
    if (usernameOfToken != tweetOfId.username) {return res.status(403).json()};

    await tweetRepo.deleteById(id);
    res.status(204).json({message: `Tweet id#${id} deleted`});
};