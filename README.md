# Lorem Ipsum Generator

<p align="center">
  <img align="center" src="https://github.com/utrox/lipsum-generator/blob/main/static/lorem-generator-hero.png" alt="Hero Image" href="https://lipsum-generator-utrox.herokuapp.com/">
  <br>
  <a href="https://lipsum-generator-utrox.herokuapp.com/">Live Demo</a>
</p>


## Description of the project

On the index page of the website, the user can set the parameters of the text they want to generate. After clicking on `Generate Lorem Ipsum` the server rends a POST request to the `/generate` route. After reciving the request, the back-end checks for the body to get the settings specified by the user. If any is missing or invalid, the default value will be used. Depending on the user's settings the server generates the text. It generates paragraphs with random number of sentences, with random amount of words. The random words are pulled from an array of words, scraped from an [online dictionary](https://personal.math.ubc.ca/~cass/frivs/latin/latin-dict-full.html). After generating the paragraphs, the server sends them back to the front-end, where it's displayed in the text-area.

## Things used troughout this project
- HTML/CSS
- Vanilla JavaScript
- Node.js (Express framework)
- Python (for scraping and formatting dictionary.)

## TODO
- fix footer copyright symbol
