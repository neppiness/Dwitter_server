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

export function pushNewTweet(newTweet){
    tweets.push(newTweet);
}

export function concatTweets(arrayOnLeft, arrayOnRight) {
    tweets = arrayOnLeft.concat(arrayOnRight);
};