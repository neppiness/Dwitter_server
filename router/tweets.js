import express from 'express';

const router = express.Router();

// need to be debugged

let tweets = [
    {
        id: '1',
        text: '드림코더분들 화이팅!',
        createdAt: Date.now().toString(),
        name: 'Bob',
        username: 'bob',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
    {
        id: '2',
        text: '안뇽!',
        createdAt: Date.now().toString(),
        name: 'Ellie',
        username: 'ellie',
    },
];

// GET /tweets
// GET /tweets?username=:username
// Response 200, [tweet, tweet, …]
router.get('/', (req, res, next) => {
    const username = req.query.username;
    const data = username
        ? tweets.filter(tweet => tweet.username === username)
        : tweets;
    res.status(200).json(data);
});

// GET /tweets/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const data = tweets.find(tweet => tweet.id === id);
    if (data != null) {
        res.status(200).json(data);
    } else {
        res.status(404).json({message: `Tweet id#${id} not found`});
    }
});

// POST /tweets
router.post('/', (req, res, next) => {
    const { text, name, username } = req.body;
    const newTweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    }
    tweets.push(newTweet);
    res.status(201).json(newTweet);
});

// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
    const reqText = req.body.text;
    const id = req.params.id;
    const foundTweet = tweets.find(tweet => tweet.id === id)
    if (foundTweet) {
        foundTweet.text = reqText;
        foundTweet.createdAt = new Date();
        res.status(200).json(foundTweet);
    } else {
        res.status(404).json({message: `Tweet id#${id} not found`});
    }
});

//Ellie's code
/*
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet) {
        tweet.text = text;
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
});
*/

// DELETE /tweets/:id
function findTweetIndex(id) {
    let foundIndex = -1;
    for (let i = 0; i < tweets.length; i++) {
        if (tweets[i].id == id) {foundIndex = i};
    }
    return foundIndex;
};

function deleteTweetByIndex(index) {
    index = index + 1;
    let arrayOnLeft = tweets.slice(0, index);
    arrayOnLeft.pop(); // deleting target
    let arrayOnRight = tweets.slice(index);
    tweets = arrayOnLeft.concat(arrayOnRight);
}

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const foundIndex = findTweetIndex(id);
    if (foundIndex == -1) {
        res.sendStatus(404);
    } else {
        deleteTweetByIndex(foundIndex);
    }
    res.status(204).send(tweets);
});

export default router;