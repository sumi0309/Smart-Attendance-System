const outputImagePreview = document.querySelector(".image-output");
const outputPreviewContainer = document.querySelector(
  ".output-preview-container"
);
const outputLabelTag = document.querySelector("#output-preview-label");
const outputPreview = document.querySelectorAll("#output-preview");
const attendanceButton = document.getElementById("attendance-button");
const aLDiv = document.querySelector("#aLContainer");
const aL = document.getElementById("aL");
const backdrop = document.querySelector("#backdrop");
const modalSheet = document.querySelector(".modal-sheet");

const toggleOutputImage = () => {
  outputPreview.classList.toggle("visible");
};

const toogleAttendanceList = () => {
  aLDiv.classList.toggle("visible");
};

const toggleOutputPreview = () => {
  outputImagePreview.classList.toggle("visible");
};

const toggleAttendanceList = () => {
  aLDiv.classList.toggle("visible");
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const toggleModalSheet = () => {
  modalSheet.classList.toggle("visible");
};

const drawBoxes = async () => {};

let image;
let canvas;
const sortedList = [];
var totalOutputHeight = 0;

const execDetection = async (loadImage, index) => {
  if (loadImage === null) outputLabelTag.textContent = "No Image Found";
  else {
    while (sortedList.length !== 0) {
      sortedList.pop();
    }

    image = await faceapi.bufferToImage(loadImage);
    const imageLabel = document.createElement("p");
    canvas = await faceapi.createCanvasFromMedia(image);
    outputImagePreview.style.justifyContent = "start";
    outputImagePreview.style.alignItems = "center";
    outputImagePreview.style.position = "relative";

    const holder = document.createElement("div");
    holder.setAttribute("id", `holder${index}`);
    holder.setAttribute("class", "image-holder");
    outputPreviewContainer.appendChild(holder);

    image.setAttribute("id", "output-preview");
    image.style.display = "block";
    image.style.objectFit = "contain";
    image.style.borderRadius = "1em";
    document.querySelector(`#holder${index}`).appendChild(image);

    // let imgH = image.height;
    // document
    //   .querySelector(`#holder${index}`)
    //   .setAttribute("style", `height:${imgH + 30};`);

    // totalOutputHeight += imgH + 30;

    imageLabel.setAttribute("id", "output-preview-label");
    imageLabel.textContent = `output_${loadImage.name}`;
    imageLabel.style.textAlign = "center";
    imageLabel.style.marginTop = "0.3em";
    imageLabel.style.marginBottom = "0.3em";
    document.querySelector(`#holder${index}`).appendChild(imageLabel);

    const faceMatcher = await new faceapi.FaceMatcher(studentData, 0.53);
    const displaySize = {
      width: document.querySelectorAll("#output-preview")[index].width,
      height: document.querySelectorAll("#output-preview")[index].height,
    };
    await faceapi.matchDimensions(canvas, displaySize);
    // console.log(displaySize);

    const detections = await faceapi
      .detectAllFaces(
        image,
        new faceapi.SsdMobilenetv1Options({ minConfidence: 0.33 })
      )
      .withFaceLandmarks()
      .withFaceDescriptors();
    const resizeDetections = await faceapi.resizeResults(
      detections,
      displaySize
    );
    const results = await resizeDetections.map((d) =>
      faceMatcher.findBestMatch(d.descriptor)
    );
    // console.log(resizeDetections);
    // console.log(results);

    await results.forEach((student) => {
      sortedList.push(student.toString());
    });

    await results.forEach((result, i) => {
      const box = resizeDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box);
      drawBox.draw(canvas);
    });
    document.querySelector(`#holder${index}`).appendChild(canvas);

    sortedList.sort();

    for (let i = 0; i < sortedList.length; i++) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(sortedList[i]));
      attendanceList.appendChild(li);
    }
  }
};

backdrop.addEventListener("click", () => {
  toggleBackdrop();
  toggleModalSheet();
});

attendanceButton.addEventListener("click", () => {
  if (document.getElementById("aL").children.length === 0) {
    toggleBackdrop();
    toggleModalSheet();
  } else toogleAttendanceList();
});
