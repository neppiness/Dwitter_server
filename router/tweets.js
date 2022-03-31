import express from 'express';

const router = express.Router();

let tweets = [
    {
        id: '1',
        text: "하",
        createdAt: Date.now().toString(),
        name: "kim",
        username: "kim"
    }
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
    // const {text, name, username} = req.body;
    // const tweet = {
    //     id: String(noOfTweets + 1),
    //     text,
    //     createdAt: new Date(),
    //     name,
    //     username
    // };

    let noOfTweets = tweets.length;
    const newTweet = {
        id: String(noOfTweets + 1),
        text: req.body.text,
        createdAt: Date.now().toString(),
        name: 'Kim',
        username: 'kim',
        url: './img/profile.jpg'
    }
    tweets.push(newTweet);
    res.status(201).json(tweets);
});

// PUT /tweets/:id
function findTweetByID(id) {
    let foundTweet = null;
    tweets.forEach(tweet => {
        if (tweet.id == id) {foundTweet = tweet};
    });
    return foundTweet;
};

router.put('/:id', (req, res, next) => {
    const reqText = req.body.text;
    const id = req.params.id;
    const foundTweet = findTweetByID(id);
    if (foundTweet == null) {
        res.status(404).json({message: `Tweet id#${id} not found`});
    } else {
        foundTweet.text = reqText;
        foundTweet.createdAt = Date.now().toString();
        res.status(200).json(tweets);
    }
});

/* Ellie's Code
router.put('/:id', (req, res, next) => {
    const reqText = req.body.text;
    const id = req.params.id;
    const tweet = tweets.find((tweet) => tweet.id === id);
    if(tweet) {
        tweet.text = reqText;
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message: `Tweet id#${id} not found`});
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

/* Ellie's Code...
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    tweets = tweets.filter(tweet => tweet.id ! === id);
    res.sendStatus(204)
});
*/

export default router;