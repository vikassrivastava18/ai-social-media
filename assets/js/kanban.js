const answers = {
  "done": [0, 2, 4],
  "approved": [1, 3, 5]
};

let todo = document.getElementById("todo");
let done = document.getElementById("todo");
let approved = document.getElementById("todo");
let column = null;
let taskId = null;

document.getElementById("todo").addEventListener("drop", (ev) => dropHandler(ev, "todo"))
document.getElementById("done").addEventListener("drop", (ev) => dropHandler(ev, "done"))
document.getElementById("approved").addEventListener("drop", (ev) => dropHandler(ev, "approved"));

function dragstartHandler(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
  const cardWrappers = document.getElementsByClassName("cards-wrapper");
  Array.from(cardWrappers).forEach((c) => {
    c.classList.add("card-placeable");
  });
}

function dragendHandler(ev) {
  const cardWrappers = document.getElementsByClassName("cards-wrapper");
  Array.from(cardWrappers).forEach((c) => {
    c.classList.remove("card-placeable");
  });
  taskId = ev.target.id;
  console.log(taskId, column)
  console.log(answers[column]);

  if (taskId != null && column != null) {
    // Do validation
    if (answers[column].includes(Number(taskId))) {
      ev.target.style.backgroundColor = 'lightgreen';
    }
    else {
      ev.target.style.backgroundColor = 'pink';
    }
    column = null;
    taskId = null;
  }
}

function dragoverHandler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function dropHandler(ev, columnId) {
  ev.preventDefault();
  const card = ev.dataTransfer.getData("text/plain");
  const columnNow = document.getElementById(columnId);
  column = columnNow.id;
  columnNow.appendChild(document.getElementById(card));
}

