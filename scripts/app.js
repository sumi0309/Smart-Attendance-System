const inputImage = document.getElementById("input-image");
const outImage = document.getElementById("output-image");
const uploadButton = document.getElementById("upload-button");
const attendanceButton = document.getElementById("attendance-button");

// const toggleDefInputComp = () => {
//   inputImage.classList.toggle("visible");
// };

const dislayUploadedImage = (imageSrc) => {
  const uploadedImage = URL.createObjectURL(imageSrc);
  const uploadImage = document.querySelector(".uploaded-image");
  uploadImage.src = uploadedImage;
};

const uploadImage = () => {
  let inputImageComp = document.createElement("input");
  inputImageComp.type = "file";
  inputImageComp.accept = "image/png, image/jpeg, image/jpg, image/heic";
  inputImageComp.click();

  inputImageComp.addEventListener =
    ("change",
    () => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        let uploadedImage = reader.result;
        document.querySelector(".uploaded-image").style.backgroundImage = `url(${uploadedImage})`;
      });
      reader.readAsDataURL(this.files[0]);
      console.log(reader);
    });
};
uploadButton.addEventListener("click", uploadImage);
