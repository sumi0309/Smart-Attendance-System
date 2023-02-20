const inputImagePreview = document.querySelector(".image-input");
const inputPreviewContainer = document.querySelector(".input-preview-container");
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
	const imageFile = event.target.files[0];
	const reader = new FileReader();

	reader.readAsDataURL(imageFile);
	reader.addEventListener("load", () => {
		inputPreview.src = reader.result;
		execDetection(reader.result);
		showOutputPreview(reader.result);
	});

	toggleInputImage();
	toggleInputPreview();

	inputPreview.style.display = "block";
	inputPreview.style.objectFit = "contain";
	inputPreview.style.borderRadius = "1em";

	inputLabelTag.textContent = imageFile.name;
};

uploadAction.addEventListener("change", (event) => {
	const targetDiv = document.querySelector(".al");
	const getLength = targetDiv.children.length;
	console.log(getLength);
	if (getLength > 0) {
		for (let i = 0; i < getLength; i++) {
			const child = targetDiv.children[0];
			targetDiv.removeChild(child);
		}
	}
	showInputPreview(event);
	toggleAttendanceList();
});
