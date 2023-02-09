const previewImage = document.querySelector(".preview-container");
const outImage = document.querySelector(".output-image");
const attendanceButton = document.getElementById("attendance-button");
const deleteButton = document.getElementById("delete-button");

const showPreview = (event) => {
  if (event.target.files.length > 0) {
    const imageFile = event.target.files[0];
    const src = URL.createObjectURL(imageFile);
    const preview = document.querySelector("#preview");
    const labelTag = document.querySelector("#preview-label");
    preview.src = src;
    preview.style.display = "inline-block";
    preview.style.objectFit = "contain";
    labelTag.textContent = imageFile.name;
  }
};
