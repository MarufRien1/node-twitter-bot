const rwClient = require('./auth.js');

const blackListWords = [
  'bot',
  'robot',
  'retweet',
  'retweets',
  'ai',
  'machine',
  'created',
  'feed',
  //usernames
  'darkweb.Today',
];

const getTweets = async () => {
  const search = await rwClient.v2.search('#nodejs', {
    'user.fields': 'name,description',
    expansions: 'author_id',
  });
  return search;
};
const filterTweets = async (searchData) => {
  const tweets = searchData._realData.data;

  const likeableTweets = tweets.map((tweet) => {
    if (tweet.lang === 'en') {
      return tweet;
    }
  });

  return tweets;
};

const likeTweets = async () => {};

const recordData = async () => {};

module.exports = { getTweets, likeTweets, filterTweets, recordData };
