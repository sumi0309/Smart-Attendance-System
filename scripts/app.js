const previewImage = document.querySelector(".preview-container");
const outImage = document.querySelector(".output-image");
const attendanceButton = document.getElementById("attendance-button");
const deleteButton = document.getElementById("delete-button");
const inputImagePreview = document.querySelector(".image-input");
const outputImagePreview = document.querySelector(".output-input");
const preview = document.querySelector("#preview");
const labelTag = document.querySelector("#preview-label");

const togglePreview = () => {
  previewImage.classList.toggle("visible");
};

const toggleImageInput = () => {
  inputImagePreview.classList.toggle("visible");
};

const toggleImageOutput = () => {
  outputImagePreview.classList.toggle("visible");
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

deleteButton.addEventListener("click", () => {
  if (preview.src !== "") {
    preview.src = "";
    inputImagePreview.removeChild(preview);
  }

  // preview.style.heigth = "18em";
});
