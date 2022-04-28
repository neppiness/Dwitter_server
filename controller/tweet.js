import * as tweetRepo from '../data/tweet.js';
import jwt from 'jsonwebtoken';
import * as authDB from '../data/auth.js';
import { config } from '../config.js';
import { getSocketIO } from '../connection/socket.js';

const jwtSecreteKey = config.jwt.secretKey;

async function findUsernameByToken(req, res, next) {
    const authHeader = req.get('Authorization');

    if(!authHeader) {return res.status(401).json(AUTH_ERROR);}

    const dividedAuthHeader = authHeader.split(' ');
    const authDirectives = dividedAuthHeader[0];
    const token = dividedAuthHeader[1];

    if(authDirectives != 'Bearer') {return res.status(401).json(AUTH_ERROR)};

    return jwt.verify(
        token, jwtSecreteKey,
        async (err, decoded) => {
            if(err) {
                return res.status(401).json(AUTH_ERROR);
            }
            const account = await authDB.findById(decoded.id);

            if(!account) {
                return res.status(401).json(AUTH_ERROR);
            }
            return account.username;
        }
    )
}

export async function getAll(req, res, next) {
    const username = req.query.username;
    const data = (username
        ? await tweetRepo.tweets.filter(tweet => tweet.username === username)
        : tweetRepo.tweets);
    res.status(200).json(data);
};

export async function getById(req, res, next) {
    const id = req.params.id;
    let data = await tweetRepo.findTweetsById(id);
    res.status(200).json(data);
};

export async function post(req, res, next) {
    let usernameOfToken = await findUsernameByToken(req, res, next);
    if (usernameOfToken != req.username) {return res.status(403).json()};
    let newTweet = await tweetRepo.createNewTweet(req);
    await tweetRepo.pushNewTweet(newTweet);
    res.status(201).json(newTweet);
    getSocketIO().emit('tweets', newTweet);
}

export async function putById(req, res, next) {
    const id = req.params.id;
    let usernameOfToken = await findUsernameByToken(req, res, next);
    let tweetOfId = await tweetRepo.findTweetsById(id);
    let usernameOfTweet = tweetOfId.username;
    
    if (usernameOfToken != usernameOfTweet) {return res.status(403).json()};

    const reqText = req.body.text;

    let foundTweet = await tweetRepo.tweets.find(tweet => tweet.id === id);

    if (foundTweet) {
        foundTweet.text = reqText;
        foundTweet.createdAt = new Date().toString();
        res.status(200).json(foundTweet);
    } else {
        res.status(404).json({message: `Tweet id#${id} not found`});
    };
}

export async function remove(req, res, next) {
    const id = req.params.id;

    let usernameOfToken = await findUsernameByToken(req, res, next);
    let tweetOfId = await tweetRepo.findTweetsById(id);
    if (usernameOfToken != tweetOfId.username) {return res.status(403).json()};

    let modTweets = await tweetRepo.tweets.filter((tweet) => tweet.id === id);
    res.status(204).json(modTweets);
};