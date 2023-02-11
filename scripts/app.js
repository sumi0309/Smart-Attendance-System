const previewImage = document.querySelector(".preview-container");
const outImage = document.querySelector(".output-image");
const attendanceButton = document.getElementById("attendance-button");
const inputImagePreview = document.querySelector(".image-input");
const outputImagePreview = document.querySelector(".output-input");
const preview = document.querySelector("#preview");
const labelTag = document.querySelector("#preview-label");
const backdrop = document.querySelector("#backdrop");
const modalSheet = document.querySelector(".modal-sheet");
const uploadAction = document.querySelector("#upload");

document.addEventListener("DOMContentLoaded", () => {
	localStorage.clear();
});

const togglePreview = () => {
	previewImage.classList.toggle("visible");
};

const toggleImageInput = () => {
	inputImagePreview.classList.toggle("visible");
};

const toggleImageOutput = () => {
	outputImagePreview.classList.toggle("visible");
};

const toggleBackdrop = () => {
	backdrop.classList.toggle("visible");
};
const toggleModalSheet = () => {
	modalSheet.classList.toggle("visible");
};

// const showPreview = (event) => {
// 	if (event.target.files.length > 0) {
// 		const imageFile = event.target.files[0];
// 		const src = URL.createObjectURL(imageFile);
// 		console.log(src);
// 		togglePreview();
// 		toggleImageInput();
// 		preview.src = src;
// 		preview.style.display = "inline-block";
// 		preview.style.objectFit = "contain";
// 		preview.style.borderRadius = "1em";
// 		labelTag.textContent = imageFile.name;
// 	}
// };

const showPreview = (event) => {
	const imageFile = event.target.files[0];
	const reader = new FileReader();

	reader.readAsDataURL(imageFile);
	reader.addEventListener("load", () => {
		localStorage.setItem("latest-image", reader.result);
		const latestImage = localStorage.getItem("latest-image");
		preview.src = latestImage;
	});

	togglePreview();
	toggleImageInput();

	preview.style.display = "inline-block";
	preview.style.objectFit = "contain";
	preview.style.borderRadius = "1em";

	labelTag.textContent = imageFile.name;
};

uploadAction.addEventListener("change", (event) => {
	localStorage.clear();
	showPreview(event);
});

backdrop.addEventListener("click", () => {
	toggleBackdrop();
	toggleModalSheet();
});

attendanceButton.addEventListener("click", () => {
	const latestImage = localStorage.getItem("latest-image");
	if (latestImage === null) {
		toggleBackdrop();
		toggleModalSheet();
	}
});
