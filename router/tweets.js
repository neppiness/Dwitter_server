import express from 'express';
import {body} from 'express-validator';

import * as tweetController from '../controller/tweet.js';
import {validate} from '../middleware/validator.js';

const validator = [
    body('text').trim().isLength({min: 3}).withMessage('Please enter a message with 3 chars at least.'),
    // body('name').trim().isLength({min: 2, max: 10}).withMessage('2~10 chars for a name'),
    // body('username').trim().isLength({min: 2, max: 10}).withMessage('2~10 chars for a username'),
    validate
];

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getAll);

// GET /tweets/:id
router.get('/:id', tweetController.getById);

// POST /tweets, with validator
router.post('/', validator, tweetController.post);

// PUT /tweets/:id, with validator
router.put('/:id', validator, tweetController.putById);

// DELETE /tweets/:id
router.delete('/:id', tweetController.remove);

export default router;