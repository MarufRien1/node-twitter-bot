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
  });
  return search;
};

// filter tweets,user,description for blacklisted words
const filterTweets = async (searchData) => {
  // const tweets = searchData._realData.data;
  const userInfo = searchData._realData.includes.users;
  const whiteList = [];

  userInfo.forEach((user) => {
    const description = user.description;
    const username = user.name;
    const name = user.name;

    //check if any of the strings contains blacklisted words
    const descriptionCheck = !blackListWords.some((word) =>
      description.includes(word)
    );
    const usernameCheck = !blackListWords.some((word) =>
      username.includes(word)
    );
    const nameCheck = !blackListWords.some((word) => name.includes(word));

    if (descriptionCheck && usernameCheck && nameCheck) {
      whiteList.push(user);
    }
  });
  return whiteList;
};

// like tweets
const likeTweets = async () => {};

// send statical data to a database or a spreed sheet
const recordData = async () => {};

module.exports = { getTweets, likeTweets, filterTweets, recordData };
