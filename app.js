const express = require("express");
const res = require("express/lib/response");
const app = express();

// import generator functions.
const {
  loadWordsFile,
  generateParagraphs,
  generateSentences,
  generateWords,
  addLoremIpsum,
} = require("./utils/generatorFunctions");

// load file where the words are stored
loadWordsFile("./static/text.txt");
const acceptedTypes = ["pharagraphs", "words", "sentences"];

// middlewares
app.use(express.static("./static"));
app.use(express.urlencoded());
app.use(express.json());

app.post("/generate", async (req, res) => {
  // add default values if the request is empty
  var number = +req.body.number || 5;
  var type = req.body.type || "paragraphs";
  if (!acceptedTypes.includes(type)) {
    type = "paragraphs";
  }
  var startsWithLipsum = !req.body.startsWithLipsum ? false : true;
  // console.log(number, type, startsWithLipsum);
  var txt;
  if (number < 1) {
    return res.status(400).send("Invalid number value.");
  }
  if (type === "paragraphs") {
    number = number > 150 ? 150 : number;
    txt = await generateParagraphs(number);
  } else if (type === "sentences") {
    number = number > 2000 ? 2000 : number;
    txt = await generateSentences(number);
  } else if (type === "words") {
    number = number > 100000 ? 100000 : number;
    txt = await generateWords(number);
  } else {
    return res.status(400).send("Invalid type.");
  }
  if (startsWithLipsum) {
    txt[0] = addLoremIpsum(txt[0]);
  }
  res.json({ paragraphs: txt });
});

app.listen(5000, () => {
  console.log("listening on port 5000...");
});
