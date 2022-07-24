// @desc    get random words from json file
// @route   GET /word
// @access  Public
const data = require("../data/data");

// generate type list from word list based on type
const genrateTypeList = (type, wordList) => {
  return wordList.filter((el) => el.pos === type);
};

// generate random number
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// generate array of numbers from min to max
const createArrayOfNumbers = (start, end) => {
  let array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
};

// Create a new word list without repetitions, but every word of the same type comes in a sequence, so you need  shuffle
const creatNewWordList = (typeList, numberOfWords) => {
  let tmp = [];
  let indexArray = createArrayOfNumbers(0, typeList.length - 1);

  for (let i = 0; i < numberOfWords; i++) {
    let randomIndex = getRandomNumber(0, indexArray.length);
    tmp.push(typeList[indexArray[randomIndex]]);
    indexArray.splice(randomIndex, 1);
  }
  return tmp;
};

// shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

exports.getRandomWords = async (req, res, next) => {
  let wordList = data.wordList;
  let neWordList = [];
  let verbList = [];
  let nounList = [];
  let adjectiveList = [];
  let adverbList = [];

  verbList = genrateTypeList("verb", wordList);
  nounList = genrateTypeList("noun", wordList);
  adjectiveList = genrateTypeList("adjective", wordList);
  adverbList = genrateTypeList("adverb", wordList);

  neWordList = [
    ...neWordList,
    ...creatNewWordList(verbList, 3),
    ...creatNewWordList(nounList, 3),
    ...creatNewWordList(adjectiveList, 3),
    ...creatNewWordList(adverbList, 1),
  ];

  const randomWordlist = shuffleArray(neWordList);

  res
    .status(200)
    .json({ randomList: randomWordlist, count: randomWordlist.length });
  next();
};

// calculate the rank of the user
exports.getRank = async (req, res, next) => {
  let score = req.body.score;
  let scoresList = data.scoresList;
  let rank = 0;
  for (let i = 0; i < scoresList.length; i++) {
    if (score > scoresList[i]) {
      rank++;
    }
  }

  res.status(200).json({ rank: (rank / scoresList.length) * 100 });
  next();
};
