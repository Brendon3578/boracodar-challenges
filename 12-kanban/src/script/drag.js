const draggableItens = document.querySelectorAll(".draggable-item");
const dropZones = document.querySelectorAll(".dropzone");

draggableItens.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("drag", drag);
  item.addEventListener("dragend", dragEnd);
});

function dragStart() {
  // console.log("Item: Start dragging");

  dropZones.forEach((dropzone) => dropzone.classList.add("dropzone-highlight"));

  // this = item that is dragging
  this.classList.add("is-dragging");
}

function drag() {
  // this = item that is dragging
  // console.log("Item: Is dragging");
}

function dragEnd() {
  dropZones.forEach((dropzone) =>
    dropzone.classList.remove("dropzone-highlight")
  );

  // this = item that is dragging
  this.classList.remove("is-dragging");
}

dropZones.forEach((dropzone) => {
  dropzone.addEventListener("dragenter", dragenter);
  dropzone.addEventListener("dragover", dragover);
  dropzone.addEventListener("dragleave", dragleave);
  dropzone.addEventListener("drop", drop);
});

function dragenter() {}

function dragover() {
  // this = dropzone column
  this.classList.add("drag-over");

  const itemBeingDragged = document.querySelector(".is-dragging");

  // console.log(this);
  this.appendChild(itemBeingDragged);
}

function dragleave() {
  // this = dropzone column
  this.classList.remove("drag-over");
}

function drop() {
  // this = dropzone column
  this.classList.remove("drag-over");
}
