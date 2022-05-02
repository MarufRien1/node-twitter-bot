const { rwClient, rateLimitPlugin, ApiResponseError } = require('./auth.js');

const blackListWords = [
  'bot',
  'robot',
  'retweet',
  'retweets',
  '_bot',
  '_robot',
];

// get tweets with selected query
const getTweets = async () => {
  try {
    const search = await rwClient.v2.search('#nodejs', {
      'user.fields': 'name,description',
      expansions: 'author_id',
      max_results: 100,
    });
    return search;
  } catch (err) {
    console.log('the error is', err);
  }
};

// filter tweets,user,description for blacklisted words
const filterTweets = async (searchData) => {
  try {
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
  } catch (err) {
    console.log('the error is', err);
  }
};

// like tweets
const likeTweets = async (tweets) => {
  try {
    //finding current user's id
    const currentUser = await rwClient.v2.me().then((me) => {
      return me.data.id;
    });

    tweets.forEach(async (tweet, i) => {
      if (i < 50) {
        const response = await rwClient.v2.like(currentUser, tweet.id);
      }
    });
  } catch (err) {
    console.log('the error is', err);
  }
};

// send statical data to a database or a spreed sheet
const recordData = async () => {
  try {
  } catch (err) {
    console.log('the error is', err);
  }
};

module.exports = { getTweets, likeTweets, filterTweets, recordData };
