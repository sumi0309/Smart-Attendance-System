const inputImagePreview = document.querySelector(".image-input");
const inputPreviewContainer = document.querySelector(
  ".input-preview-container"
);
const attendanceBtn = document.querySelector("#upload-button");
const attendanceList = document.getElementById("aL");
const inputLabelTag = document.querySelector("#input-preview-label");
const inputPreview = document.querySelector("#input-preview");
const uploadAction = document.querySelector("#upload");

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri("../models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("../models"),
  faceapi.nets.mtcnn.loadFromUri("../models"),
]);

document.addEventListener("DOMContentLoaded", () => {
  localStorage.clear();
});

const toggleInputPreview = () => {
  inputImagePreview.classList.toggle("visible");
};

const toggleInputImage = () => {
  inputPreview.classList.toggle("visible");
};

// toggleInputImage();
// toggleInputPreview();

// inputPreview.style.display = "block";
// inputPreview.style.objectFit = "contain";
// inputPreview.style.borderRadius = "1em";

// inputLabelTag.textContent = imageFile.name;
async function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

imageFile = [];
finalList = [];

uploadAction.addEventListener("change", async (event) => {
  while (finalList.length !== 0) {
    finalList.pop();
  }
  attendanceList.innerHTML = "";
  outputLabelTag.textContent = "";
  for (let i = 0; i < event.target.files.length; i++) {
    imageFile.push(event.target.files[i]);
  }
  for (let i of imageFile) {
    await showOutputPreview(i);
    await execDetection(i);
  }
  // const listElems = document.querySelector("#aL").childNodes;
  // for (let i = 0; i < listElems.length; i++) {
  //   let string = listElems[i].innerText;
  //   string = string.substring(0, string.indexOf("("));
  //   finalList.push(string);
  // }

  const listElems = document.querySelector("#aL").childNodes;
  for (let i = 0; i < listElems.length; i++) {
    let string = listElems[i].innerText;
    string = string.substring(0, string.indexOf("("));
    finalList.push(string);
  }

  finalList.sort();

  finalList = await removeDuplicates(finalList);
  attendanceList.innerHTML = "";
  for (let i = 0; i < finalList.length; i++) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(finalList[i]));
    attendanceList.appendChild(li);
  }
  alert(
    "Processing Complete\n Click on the right button to get the attendance!"
  );
});
