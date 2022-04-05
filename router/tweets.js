import express from 'express';
import {getTweets, getTweetsById} from '../controller/controller.js';
import {postTweet, findTweetById} from '../controller/controller.js';
import {findTweetIndex, deleteTweetByIndex} from '../controller/controller.js';
import {tweets} from '../data/data.js';

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
// Response 200, [tweet, tweet, …]
router.get('/', (req, res, next) => {
    let data = getTweets(req, res, next)
    res.status(200).json(data);
});

// GET /tweets/:id
router.get('/:id', (req, res, next) => {
    let data = getTweetsById(req, res, next);
    if (data != null) {
        res.status(200).json(data);
    } else {
        res.status(404).json({message: `Tweet id#${id} not found`});
    }
});

// POST /tweets
router.post('/', (req, res, next) => {
    let newTweet = postTweet(req, res, next);
    res.status(201).json(newTweet);
});

// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    let foundTweet = findTweetById(req, res, next);
    if (foundTweet) {
        res.status(200).json(foundTweet);
    } else {
        res.status(404).json({message: `Tweet id#${id} not found`});
    }
});

// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    let foundIndex = findTweetIndex(id);
    if (foundIndex == -1) {res.sendStatus(404)};
    
    let modTweets = deleteTweetByIndex(foundIndex);
    res.status(204).json(modTweets);
});

export default router;