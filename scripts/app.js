const clickButton = document.getElementById("clickButton");
const changedText = document.getElementById("textArea");

function addText() {
  let textValue = changedText.value;
  const value = "text...";
  textValue += value;
  changedText.value = textValue;
  console.log(textValue);
}

clickButton.addEventListener("click", addText);
