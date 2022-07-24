var data = {
  wordList: [
    {
      id: 1,
      word: "slowly",
      pos: "adverb",
    },
    {
      id: 2,
      word: "ride",
      pos: "verb",
    },
    {
      id: 3,
      word: "bus",
      pos: "noun",
    },
    {
      id: 4,
      word: "commute",
      pos: "verb",
    },
    {
      id: 5,
      word: "emissions",
      pos: "noun",
    },
    {
      id: 6,
      word: "walk",
      pos: "verb",
    },
    {
      id: 7,
      word: "fast",
      pos: "adjective",
    },
    {
      id: 8,
      word: "car",
      pos: "noun",
    },
    {
      id: 9,
      word: "crowded",
      pos: "adjective",
    },
    {
      id: 10,
      word: "arrival",
      pos: "noun",
    },
    {
      id: 11,
      word: "emit",
      pos: "verb",
    },
    {
      id: 12,
      word: "independent",
      pos: "adjective",
    },
    {
      id: 13,
      word: "convenient",
      pos: "adjective",
    },
    {
      id: 14,
      word: "lane",
      pos: "noun",
    },
    {
      id: 15,
      word: "heavily",
      pos: "adverb",
    },
  ],
  scoresList: [
    20, 90, 100, 50, 10, 50, 60, 0, 60, 10, 90, 30, 100, 30, 20, 90, 40, 20, 10,
    60, 50, 100, 50, 80, 50, 80, 60, 80, 10, 40,
  ],
};


// var wordList = data.wordList;
// var neWordList = [];
// var verbList = [];
// var nounList = [];
// var adjectiveList = [];
// var adverbList = [];


// const genrateTypeList = (type) => {
//   return wordList.filter((el) => el.pos === type);
// };



// const getRandomNumber = (min, max) => {
//     return Math.floor(Math.random() * (max - min)) + min;
// };

// const createArrayOfNumbers = (start, end) => {
//     let array = [];
//     for (let i = start; i <= end; i++) {
//         array.push(i);
//     }
//     return array;
// };


// const creatNewWordList = (typeList,numberOfWords) => {
    
//     let indexArray = createArrayOfNumbers(0, typeList.length - 1);
    
//     for(let i = 0; i <numberOfWords; i++){
//         let randomIndex = getRandomNumber(0, indexArray.length);
//         neWordList.push(typeList[indexArray[randomIndex]]);
//         indexArray.splice(randomIndex, 1);
        
//     }
    
// }



// verbList = genrateTypeList("verb");
// nounList = genrateTypeList("noun");
// adjectiveList = genrateTypeList("adjective");
// adverbList = genrateTypeList("adverb");

// creatNewWordList(verbList, 3)
// creatNewWordList(nounList, 3)
// creatNewWordList(adjectiveList, 3)
// creatNewWordList(adverbList, 1)





// const shuffleArray = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     const temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
//   }
//   return array;
// };


// const randomWordlist = shuffleArray(neWordList);
// console.log(randomWordlist);
let scoresList = data.scoresList;

console.log(scoresList);

const getRank = (score) => {
  let rank = 0;
  for (let i = 0; i < scoresList.length; i++) {
    if (score > scoresList[i]) {
      rank++;
    }
  }
  return (rank/scoresList.length)*100;
}
console.log(getRank(50));
console.log(getRank(60));
console.log(getRank(30));