const imageUpload = document.querySelector(".image_input");
const imageResult = document.querySelector(".image_output");
const labelTag = document.querySelector("#preview-label");

Promise.all([
  await faceapi.loadSsdMobilenetv1Model("/models"),
  await faceapi.loadTinyFaceDetectorModel("/models"),
  await faceapi.loadMtcnnModel("/models"),
  await faceapi.loadFaceLandmarkModel("/models"),
  await faceapi.loadFaceLandmarkTinyModel("/models"),
  await faceapi.loadFaceRecognitionModel("/models"),
  await faceapi.loadFaceExpressionModel("/models"),
]).then(start);

function start() {}
