const outputImagePreview = document.querySelector(".image-output");
const outputPreviewContainer = document.querySelector(".output-preview-container");
const outputLabelTag = document.querySelector("#output-preview-label");
const outputPreview = document.querySelector("#output-preview");

const attendanceButton = document.getElementById("attendance-button");

const backdrop = document.querySelector("#backdrop");
const modalSheet = document.querySelector(".modal-sheet");

const toggleOutputPreview = () => {
	outputImagePreview.classList.toggle("visible");
};

const toggleOutputImage = () => {
	outputPreview.classList.toggle("visible");
};

const toggleBackdrop = () => {
	backdrop.classList.toggle("visible");
};

const toggleModalSheet = () => {
	modalSheet.classList.toggle("visible");
};

const dataUrlToBlob = (imageDataUrl) => {
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

const showOutputPreview = (latestImage) => {
	toggleOutputPreview();
	toggleOutputImage();

	outputPreview.src = latestImage;
	outputPreview.style.display = "inline-block";
	outputPreview.style.objectFit = "contain";
	outputPreview.style.borderRadius = "1em";
};

let image;
let canvas;

const execDetection = async (loadImage) => {
	if (loadImage === null) labelTag.textContent = "No Image Found";
	else {
		if (image) image.remove();
		if (canvas) canvas.remove();

		const imageBLob = dataUrlToBlob(loadImage);
		image = await faceapi.bufferToImage(imageBLob);

		canvas = faceapi.createCanvasFromMedia(image);
		outputPreviewContainer.append(canvas);
		outputImagePreview.style.justifyContent = "start";
		outputImagePreview.style.alignItems = "center";
		outputImagePreview.style.position = "relative";

		const displaySize = {
			width: outputPreview.width,
			height: outputPreview.height,
		};
		faceapi.matchDimensions(canvas, displaySize);

		const detections = await faceapi
			.detectAllFaces(image, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.28 }))
			.withFaceLandmarks()
			.withFaceDescriptors();
		outputLabelTag.textContent = detections.length;
		const resizeDetections = faceapi.resizeResults(detections, displaySize);
		resizeDetections.forEach((item) => {
			const box = item.detection.box;
			const drawBox = new faceapi.draw.DrawBox(box);
			drawBox.draw(canvas);
		});
	}
};

backdrop.addEventListener("click", () => {
	toggleBackdrop();
	toggleModalSheet();
});

attendanceButton.addEventListener("click", () => {
	const latestImage = localStorage.getItem("latest-image");
	if (latestImage === null) {
		toggleBackdrop();
		toggleModalSheet();
	} else {
		showOutputPreview(latestImage);
		execDetection(latestImage);
	}
});
