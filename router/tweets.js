import express from 'express';
import * as tweetController from '../controller/tweet.js';
import * as tweetRepo from '../data/tweet.js';

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getAll);

// GET /tweets/:id
router.get('/:id', tweetController.getById);

// POST /tweets
router.post('/', tweetController.post);

// PUT /tweets/:id
router.put('/:id', tweetController.putById);

// DELETE /tweets/:id
router.delete('/:id', tweetController.remove);

export default router;