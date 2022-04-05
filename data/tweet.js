export let tweets = [
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

export function findTweetsById(id) {
    let data = tweets.find(tweet => tweet.id === id);
    return data;
};

export function createNewTweet(req) {
    const {text, name, username} = req.body;
    const newTweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    };
    return newTweet;
};

export function pushNewTweet(newTweet){
    tweets.push(newTweet);
};