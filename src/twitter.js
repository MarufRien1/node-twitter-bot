require('dotenv').config();
const { rwClient, rateLimitPlugin, ApiResponseError } = require('./auth.js');
const { getLimitInfo, getCurrentUser } = require("./helper")
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
    const currentLimit = await getLimitInfo("search")

    if (currentLimit.limitFound && currentLimit.limit.remaining > 0) {
      const search = await rwClient.v2.search(process.env.Q, {
        'user.fields': 'name,description',
        expansions: 'author_id',
        max_results: 100,
      });

      const tweets = search._realData.data;
      const userInfo = search._realData.includes.users;
      if (tweets && userInfo) {
        return { tweets, userInfo }
      }


      return search;

    }
  } catch (err) {
    console.log("error at getTweets function\n" + err);
  }
};


const filterTweets = async (searchResult) => {
  try {
    const tweets = searchResult.tweets
    const userInfo = searchResult.userInfo;

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

    // return tweetsToBeLiked;
    return tweetsToBeLiked
  } catch (err) {
    console.log('the error is', err);
  }

};

const likeTweets = async (tweets) => {
  try {
    const currentLimit = await getLimitInfo("like")
    const currentUser = await getCurrentUser();


    if (currentLimit.limitFound && currentLimit.limit.remaining > 0) {

      let maxLoops;

      if (+currentLimit.limit.remaining >= tweets.length) {
        maxLoops = tweets.length

      } else {
        maxLoops = +currentLimit.limit.remaining
      }

      for (let i = 0; i < maxLoops; i++) {

        await rwClient.v2.like(currentUser.id, tweets[i].id)

        console.log("liked tweet with id: " + tweets[i].id);
      }

      // calculate remaining time to next limit
      const currentTime = Date.now()
      let resetTime = currentLimit.limit.reset
      resetTime = resetTime.toString() + "000"
      resetTime = Number(resetTime)


      const diff = (resetTime - currentTime)


      return { success: true, remaining: diff }

    } else {

      return { success: false, remaining: undefined }

    }
  } catch (err) { console.log("error at likeTweet function\n" + err); }
};


// send statical data to a database or a spreed sheet
const recordData = async () => { };

module.exports = { getTweets, likeTweets, filterTweets, recordData };
