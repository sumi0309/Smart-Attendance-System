const inputImagePreview = document.querySelector(".image-input");
const inputPreviewContainer = document.querySelector(
  ".input-preview-container"
);
const attendanceBtn = document.querySelector("#upload-button");
const attendanceList = document.getElementById("aL");
const inputLabelTag = document.querySelector("#input-preview-label");
const inputPreview = document.querySelector("#input-preview");
const uploadAction = document.querySelector("#upload");
const backdrop2 = document.querySelector("#backdrop2");
const modalSheet2 = document.querySelector(".modal-sheet2");

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri("../models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("../models"),
  faceapi.nets.mtcnn.loadFromUri("../models"),
]);

const toggleBackdrop2 = () => {
  backdrop2.classList.toggle("visible");
};

const toggleModalSheet2 = () => {
  modalSheet2.classList.toggle("visible");
};

backdrop2.addEventListener("click", () => {
  toggleBackdrop2();
  toggleModalSheet2();
});

document.addEventListener("DOMContentLoaded", () => {
  localStorage.clear();
});

const toggleInputPreview = () => {
  inputImagePreview.classList.toggle("visible");
};

const toggleInputImage = () => {
  inputPreview.classList.toggle("visible");
};

<<<<<<< HEAD
const imageFile = [];

// toggleInputImage();
// toggleInputPreview();

// inputPreview.style.display = "block";
// inputPreview.style.objectFit = "contain";
// inputPreview.style.borderRadius = "1em";

// inputLabelTag.textContent = imageFile.name;
async function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
var finalList = [];
uploadAction.addEventListener("change", async (event) => {
  while (imageFile.length != 0) {
    imageFile.pop();
  }
  outputLabelTag.textContent = "";
=======
const removeDuplicates = async (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

let imageFile = [];
let finalList = [];
let studentData = [];

uploadAction.addEventListener("change", async (event) => {
  if (event.target.files.length === 0) return;

  while (imageFile.length !== 0) imageFile.pop();
  while (finalList.length !== 0) finalList.pop();
  inputPreviewContainer.innerHTML = "";
  attendanceList.innerHTML = "";
  if (canvas) await canvas.remove();
  if (image) await image.remove();

>>>>>>> main
  for (let i = 0; i < event.target.files.length; i++) {
    imageFile.push(event.target.files[i]);
  }

<<<<<<< HEAD
  while (finalList.length != 0) {
    finalList.pop();
  }
  attendanceList.innerHTML = "";
  for (let im of imageFile) {
    await showOutputPreview(im);
    await execDetection(im);
    for (let i = 0; i < sortedList.length; i++) {
      let string = sortedList[i];
      string = string.substring(0, string.indexOf("("));
      finalList.push(string);
    }
  }
  // const listElems = document.querySelector("#aL").childNodes;

  finalList = await removeDuplicates(finalList);
  await finalList.sort();
=======
  for (let i of imageFile) {
    const childImage = await faceapi.bufferToImage(i);
    const childImageLabel = document.createElement("p");

    childImage.setAttribute("id", "input-preview");
    childImage.style.display = "block";
    childImage.style.objectFit = "contain";
    childImage.style.borderRadius = "1em";
    inputPreviewContainer.appendChild(childImage);

    childImageLabel.setAttribute("id", "input-preview-label");
    childImageLabel.textContent = i.name;
    childImageLabel.style.textAlign = "center";
    childImageLabel.style.marginTop = "0.3em";
    childImageLabel.style.marginBottom = "0.3em";
    inputPreviewContainer.appendChild(childImageLabel);
  }
  inputLabelTag.textContent = "";
  outputPreviewContainer.innerHTML = "";
  outputLabelTag.textContent = "";

  studentData = await loadLabeledImages();

  for (let i = 0; i < imageFile.length; i++) {
    await execDetection(imageFile[i], i);
  }

  const allCanvas = document.querySelectorAll("canvas");
  // const holders = document.querySelectorAll(".image-holder");

  for (let i of allCanvas) {
    i.style.position = "relative";
    i.style.bottom = `${i.height + 30}`;
  }

  const listElems = document.querySelector("#aL").children;
  for (let i = 0; i < listElems.length; i++) {
    let string = listElems[i].innerText;
    string = string.substring(0, string.indexOf("("));
    finalList.push(string);
  }

  finalList.sort();
  document.querySelector("#aL").innerHTML = "";
  finalList = await removeDuplicates(finalList);

>>>>>>> main
  for (let i = 0; i < finalList.length; i++) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(finalList[i]));
    attendanceList.appendChild(li);
  }
<<<<<<< HEAD
  alert(
    "Processing Complete\n Click on the right button to get the attendance!"
  );
=======
  toggleBackdrop2();
  toggleModalSheet2();
>>>>>>> main
});
