const outputImagePreview = document.querySelector(".image-output");
const outputPreviewContainer = document.querySelector(
  ".output-preview-container"
);
const outputLabelTag = document.querySelector("#output-preview-label");
const outputPreview = document.querySelector("#output-preview");
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

const dataUrlToBlob = async (imageDataUrl) => {
  var byteString = atob(imageDataUrl.split(",")[1]);
  var mimeString = imageDataUrl.split(",")[0].split(":")[1].split(";")[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  var blob = new Blob([ab], { type: mimeString });
  return blob;
};

const showOutputPreview = async (latestImage) => {
  toggleOutputPreview();
  toggleOutputImage();

  outputPreview.src = latestImage;
  outputPreview.style.display = "inline-block";
  outputPreview.style.objectFit = "contain";
  outputPreview.style.borderRadius = "1em";
};

let image;
let canvas;
const sortedList = [];

const execDetection = async (loadImage) => {
  while (sortedList.length !== 0) {
    sortedList.pop();
  }
  attendanceList.innerHTML = "";
  if (loadImage === null) outputLabelTag.textContent = "No Image Found";
  else {
    if (image) await image.remove();
    if (canvas) await canvas.remove();

    // const imageBLob = await dataUrlToBlob(loadImage);
    image = await faceapi.bufferToImage(loadImage);
    canvas = await faceapi.createCanvasFromMedia(image);
    outputImagePreview.style.justifyContent = "start";
    outputImagePreview.style.alignItems = "center";
    outputImagePreview.style.position = "relative";

    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = await new faceapi.FaceMatcher(
      labeledFaceDescriptors,
      0.53
    );

    const displaySize = {
      width: outputPreview.width,
      height: outputPreview.height,
    };
    await faceapi.matchDimensions(canvas, displaySize);

    const detections = await faceapi
      .detectAllFaces(
        image,
        new faceapi.SsdMobilenetv1Options({ minConfidence: 0.33 })
      )
      .withFaceLandmarks()
      .withFaceDescriptors();
    // outputLabelTag.textContent = detections.length;
    const resizeDetections = await faceapi.resizeResults(
      detections,
      displaySize
    );

    const results = await resizeDetections.map((d) =>
      faceMatcher.findBestMatch(d.descriptor)
    );

    await results.forEach((student) => {
      sortedList.push(student.toString());
    });

    sortedList.sort();

    // results.forEach((result, i) => {
    //   const box = resizeDetections[i].detection.box;
    //   const drawBox = new faceapi.draw.DrawBox(box, {
    //     label: result.toString(),
    //   });
    //   drawBox.draw(canvas);
    // });
    for (let i = 0; i < sortedList.length; i++) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(sortedList[i]));
      attendanceList.appendChild(li);
    }
  }
  // outputPreviewContainer.append(canvas);
};

backdrop.addEventListener("click", () => {
  toggleBackdrop();
  toggleModalSheet();
});

attendanceButton.addEventListener("click", () => {
  if (document.getElementById("aL").childNodes.length === 0) {
    toggleBackdrop();
    toggleModalSheet();
  } else toogleAttendanceList();
});

function loadLabeledImages() {
  const labels = [
    "18T7121_Ekta Bara",
    "19T7104_Abhishek Thakur",
    "19T7105_Aditya Singh Dangi",
    "19T7109_Antriksh Tyagi",
    "19T7110_Anubhav Chahar",
    "19T7112_Ayush Agrawal",
    // "19T7113_Bharti Baghel",
    "19T7114_Bhumika Modh",
    // "19T7115_Daniya Afaq",
    "19T7117_Deepesh Aswani",
    "19T7118_Divyanshu Parwal",
    "19T7121_Gourav Dehariya",
    "19T7122_Hitesh Mani",
    "19T7127_Kushagra Bandil",
    // "19T7128_Lakshya Khare",
    "19T7132_Mihir Jain",
    "19T7137_Pranjal Sahu",
    "19T7138_Pranshu Jain",
    "19T7139_Prashant Bairagi",
    "19T7142_Priyanshu Khare",
    "19T7144_Rajat Hotwani",
    "19T7149_Sanidhya Pal",
    "19T7153_Shakti Aggarwal",
    "19T7154_Shraddha Soni",
    "19T7156_Shubh Laad",
    "19T7157_Siddhant Jain",
    "19T7158_Sumiran Jaiswal",
    // "19T7160_Swapnil Janoria",
    "19T7163_Urvish Jain",
    "19T7164_Utkarsh Gupte",
    // "19T7165_Vidushi Kumre",
    "19T7167_Vishal Yadav",
    "19T7170_Yogesh Jadon",
    "19T7171_Yuvraj Singh Shaktawat",
    "19T7172_Hussain Barwahwala",
    "19T7184_Nayan Bargal",
    "20T7182_Jayesh Mulchandani",
    "20T7184_Nisha Chilgar",
    "19T7005_Anjali Phadke",
    "007_Monu Bhaiya",
  ];

  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 1; i++) {
        const img = await faceapi.fetchImage(`labeledImages/${label}.jpg`);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}
