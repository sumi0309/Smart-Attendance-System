async function loadLabeledImages() {
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
