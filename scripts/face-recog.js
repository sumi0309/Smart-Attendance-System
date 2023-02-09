Promise.all([
  await faceapi.loadSsdMobilenetv1Model("/models"),
  await faceapi.loadTinyFaceDetectorModel("/models"),
  await faceapi.loadMtcnnModel("/models"),
  await faceapi.loadFaceLandmarkModel("/models"),
  await faceapi.loadFaceLandmarkTinyModel("/models"),
  await faceapi.loadFaceRecognitionModel("/models"),
  await faceapi.loadFaceExpressionModel("/models"),
]);

console.log("Loaded");
