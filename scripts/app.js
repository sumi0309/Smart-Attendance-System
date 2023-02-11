const previewImage = document.querySelector(".preview-container");
const outImage = document.querySelector(".output-image");
const attendanceButton = document.getElementById("attendance-button");
// const deleteButton = document.getElementById("delete-button");
const inputImagePreview = document.querySelector(".image-input");
const outputImagePreview = document.querySelector(".output-input");
const preview = document.querySelector("#preview");
const labelTag = document.querySelector("#preview-label");
const backdrop = document.querySelector("#backdrop");
const modalSheet = document.querySelector(".modal-sheet");

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

const showPreview = (event) => {
	if (event.target.files.length > 0) {
		const imageFile = event.target.files[0];
		const src = URL.createObjectURL(imageFile);

		togglePreview();
		toggleImageInput();
		preview.src = src;
		preview.style.display = "inline-block";
		preview.style.objectFit = "contain";
		preview.style.borderRadius = "1em";
		labelTag.textContent = imageFile.name;
	}
};

backdrop.addEventListener("click", () => {
	toggleBackdrop();
	toggleModalSheet();
});

attendanceButton.addEventListener("click", () => {
	if (inputImagePreview.src === undefined) {
		toggleBackdrop();
		toggleModalSheet();
	}
});
