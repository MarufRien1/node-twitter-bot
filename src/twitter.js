const rwClient = require('./auth.js');

const blackListWords = [
  'bot',
  'robot',
  'retweet',
  'retweets',
  'retweet',
  'ai',
  'machine',
  'created',
  'feed',
  //usernames
  'darkweb.Today',
];

// get tweets with selected query
const getTweets = async () => {
  const search = await rwClient.v2.search('#nodejs', {
    'user.fields': 'name,description',
    expansions: 'author_id',
    max_results: 100,
  });
  return search;
};

// filter tweets,user,description for blacklisted words
const filterTweets = async (searchData) => {
  // const tweets = searchData._realData.data;
  const userInfo = searchData._realData.includes.users;
  const tweets = searchData._realData.data;
  const whiteList = [];
  const tweetsToBeLiked = [];

  userInfo.forEach((user) => {
    const description = user.description;
    const username = user.name;
    const name = user.name;

    //check if any of the strings contains blacklisted words
    const descriptionCheck = blackListWords.some((word) =>
      description.toLowerCase().includes(word)
    );
    const usernameCheck = blackListWords.some((word) =>
      username.toLowerCase().includes(word)
    );
    const nameCheck = blackListWords.some((word) =>
      name.toLowerCase().includes(word)
    );

    user.nameCheck = nameCheck;
    user.usernameCheck = usernameCheck;
    user.descriptionCheck = descriptionCheck;

    if (!nameCheck && !usernameCheck && !descriptionCheck) {
      whiteList.push(user);
    }
  });
  tweets.forEach((tweet) => {
    const existingTweets = whiteList.find(
      (user) => user.id === tweet.author_id
    );
    if (existingTweets) {
      tweetsToBeLiked.push(tweet);
    }
  });

  return tweetsToBeLiked;
};

// like tweets
const likeTweets = async (tweets) => {
  tweets.forEach((tweet, i) => {
    if (i < 50) {
      rwClient.v2.like('2266223099', tweet.id);
      console.log(`Liked tweet ${tweet.id}`);
    } else return;
  });
};

// send statical data to a database or a spreed sheet
const recordData = async () => {};

module.exports = { getTweets, likeTweets, filterTweets, recordData };
