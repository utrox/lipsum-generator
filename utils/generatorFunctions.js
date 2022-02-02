const {
  sentencesPerParagraph,
  wordsPerSentence,
  comma,
} = require("../settings");

var wordList;
var wordListLength;

function loadWordsFile(path) {
  // read the array of words stored in utils
  wordList = require("./dictionary");
  wordListLength = wordList.length;
  console.log(`Loaded ${wordListLength} words from the dictionary...`);
}

function generateRandomBtw(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

async function generateParagraphs(noParagraphs) {
  var paragraphs = [];
  for (let i = 0; i < noParagraphs; i++) {
    const result = generateParagraph();
    paragraphs.push(result);
  }
  // wait for every promise to get fulfilled, and then return the paragraphs.
  const result = await Promise.all(paragraphs.map((paragraph) => paragraph));
  return result;
}

async function generateSentences(noSentences) {
  var text = [];
  for (let i = 0; i < noSentences; i++) {
    const result = await generateSentence();
    text.push(result);
  }
  const paragraphs = divideTextIntoParagraphs(text);
  return paragraphs;
}

async function generateWords(noWords) {
  var text = [];
  var currentWordCount = 0;
  // keep looping until near desired wordcount.
  while (noWords - currentWordCount > wordsPerSentence.max) {
    const wordsToGenerate = generateRandomBtw(
      wordsPerSentence.min,
      wordsPerSentence.max
    );
    currentWordCount += wordsToGenerate;
    const result = await generateSentence(wordsToGenerate);
    text.push(result);
  }
  // generate the last sentence to get exact wordcount.
  const result = await generateSentence(noWords - currentWordCount);
  text.push(result);
  // divide array of sentences into array of paragraph(s)
  const paragraphs = divideTextIntoParagraphs(text);
  return paragraphs;
}

async function generateParagraph() {
  // generate paragraph with random amount of sentences
  const noSentences = await generateRandomBtw(
    sentencesPerParagraph.min,
    sentencesPerParagraph.max
  );
  var paragraph = [];
  // generate sentences with random amount of words
  for (let j = 0; j < noSentences; j++) {
    const result = await generateSentence(
      generateRandomBtw(wordsPerSentence.min, wordsPerSentence.max)
    );
    paragraph.push(result);
  }
  return paragraph.join(" ");
}

function generateSentence(number) {
  const wordCount =
    number || generateRandomBtw(wordsPerSentence.min, wordsPerSentence.max);
  var sentence = [];
  // generate an array of random words
  for (let k = 0; k < wordCount; k++) {
    const result = generateWord();
    sentence.push(result);
  }
  // step over each words of the sentence, except the ones to skip, and randomly add comma(s)
  for (let i = comma.firstWordsSkip; i < sentence.length - 1; i++) {
    if (generateRandomBtw(0, 1) <= comma.frequency) {
      sentence[i] = sentence[i] + ",";
      i += comma.minCommaSpacing;
    }
  }
  sentence = sentence.join(" ");
  // format sentence -> capitalize and add punctuation.
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function generateWord() {
  // chose a word randomly from the array of words
  return wordList[generateRandomBtw(0, wordListLength)];
}

function divideTextIntoParagraphs(text) {
  var paragraphs = [];
  var startOfParagraph = 0;
  var endOfParagraph = 0;
  // loop over the array of sentences, and divide them up randomly into paragraphs
  while (startOfParagraph <= text.length) {
    endOfParagraph =
      startOfParagraph +
      generateRandomBtw(sentencesPerParagraph.min, sentencesPerParagraph.max);
    const paragraph = text.slice(startOfParagraph, endOfParagraph).join(" ");
    paragraphs.push(paragraph);
    startOfParagraph = endOfParagraph;
  }
  return paragraphs;
}

function addLoremIpsum(text) {
  // replace the first two words with "Lorem ipsum ..."
  return "Lorem ipsum" + text.slice(text.split(" ", 2).join(" ").length);
}

module.exports = {
  loadWordsFile,
  generateParagraphs,
  generateSentences,
  generateWords,
  addLoremIpsum,
};
