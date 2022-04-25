export let tweets = [
    {
        id: '1',
        text: '드림코더분들 화이팅!',
        createdAt: new Date().toString(),
        name: 'Bob',
        username: 'bob',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
        userId: '1'
    },
    {
        id: '2',
        text: '안뇽!',
        createdAt: new Date().toString(),
        name: 'Ellie',
        username: 'ellie',
        userId: '2'
    },
];

export async function findTweetsById(id) {
    let data = tweets.find(tweet => tweet.id === id);
    return data;
};

export async function createNewTweet(req) {
    const {text, name, username} = req.body;

    const newTweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date().toString(),
        name,
        username
    };
    return newTweet;
};

export async function pushNewTweet(newTweet){
    tweets.push(newTweet);
};