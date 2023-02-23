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

const showInputPreview = (event) => {
  let n = event.target.files.length;
  const imageFile = [];
  for (let i = 0; i < n; i++) {
    imageFile.push(event.target.files[i]);
  }
  const reader = new FileReader();
  for (let i = 0; i < n; i++) {
    reader.readAsDataURL(imageFile[i]);
    // console.log(imageFile[i]);
    reader.addEventListener("load", () => {
      inputPreview.src = reader.result;
      execDetection(reader.result);
      showOutputPreview(reader.result);
    });
    // toggleInputImage();
    // toggleInputPreview();

    // inputPreview.style.display = "block";
    // inputPreview.style.objectFit = "contain";
    // inputPreview.style.borderRadius = "1em";

    // inputLabelTag.textContent = imageFile.name;
  }
};

uploadAction.addEventListener("change", (event) => {
  // attendanceList.innerHTML = "";
  outputLabelTag.textContent = "";
  showInputPreview(event);
});
