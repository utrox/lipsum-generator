function populateLipsum(paragraphs) {
  lipsumDisplayArea.innerHTML = "";
  var innerHTML = "";
  paragraphs.forEach((paragraph) => {
    innerHTML += `<p>${paragraph}</p>`;
  });
  lipsumDisplayArea.innerHTML = innerHTML;
}

async function submitForm(event) {
  console.log("submitted");
  event.preventDefault();
  const paragraphs = await fetchLipsum();
  populateLipsum(paragraphs);
  console.log(paragraphs);
}

async function fetchLipsum() {
  const bodyData = {
    number: document.querySelector("#number").value,
    type: document.querySelector('input[name="type"]:checked').value,
    startsWithLipsum: document.querySelector("#startsWithLipsum").checked,
  };

  const response = await fetch("/generate", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(bodyData),
  });

  if (response.status !== 200) {
    console.error(response.statusText, ". Please try again later.");
  }

  const paragraphs = await response.json();
  return [...paragraphs.paragraphs];
}

const lipsumDisplayArea = document.querySelector(".lipsum-result");
document.querySelector("footer").innerHTML = `
Copyright &copy${new Date().getFullYear()}. All rights reserved`;
document
  .querySelector("form")
  .addEventListener("submit", (event) => submitForm(event));
