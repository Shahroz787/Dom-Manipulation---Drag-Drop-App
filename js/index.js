const dragArea = document.querySelector(".ddBody");
const dragText = dragArea.querySelector("h3");
const button = dragArea.querySelector("button");
const input = dragArea.querySelector("input");

let myFile;

button.onclick = () => {
  input.click();
};

input.addEventListener("change", function () {
  myFile = this.files[0];
  dragArea.classList.add("active");
  showMe();
});

dragArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dragArea.classList.add("active");

  dragText.textContent = "Release to Upload File";
});

dragArea.addEventListener("dragleave", (event) => {
  dragArea.classList.remove("active");
  dragText.textContent = "Drag & Drop";
});

dragArea.addEventListener("drop", (event) => {
  event.preventDefault();

  myFile = event.dataTransfer.files[0];

  showMe();
});

function showMe() {
  let fileType = myFile.type;

  const validEx = ["image/jpeg", "image/jpg", "image/png"];

  if (validEx.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let imgUrl = fileReader.result;
      let img = `<img src="${imgUrl}" alt="">`;

      dragArea.innerHTML = img;
    };
    fileReader.readAsDataURL(myFile);
  } else {
    alert("This File Is Not Valid ..!");
    dragArea.classList.remove("active");
    dragText.textContent = "Drag & Drop";
  }
}
