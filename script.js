let modal = document.getElementById("myModal");
let _taskInput = document.getElementById("taskInput");
let _taskStatusSelect = document.getElementById("taskStatusSelect");
let _taskSubmitBtn = document.getElementById("taskSubmitBtn");

let todoBoard = document.getElementsByClassName("board-Todo")[0];
let inprogressBoard = document.getElementsByClassName("board-Inprogress")[0];

// let task = {
//   text: "",
//   isDone: false,
//   status: "todo",
// };

let tasks = [];

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// When the user clicks the button, open the modal
function showModal() {
  modal.style.display = "block";
}

btn.onclick = showModal;

// When the user clicks on <span> (x), close the modal
function hideModal() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    hideModal();
  }
};

function createTaskElement(text, id, checked) {
  let isChecked = checked ? "checked" : ""; // ternary

  let _taskHMTL = `
  <div class="task">
    <input type="checkbox" ${isChecked} />
    <p>${text}</p>
    <div class="flex">
      <p class="icon">e</p>
      <p class="icon" onclick="deleteTask(${id})">x</p>
    </div>
  </div>`;

  return _taskHMTL;
}

function deleteTask(id) {
  let taskIndex = tasks.findIndex((task) => {
    if (task.id === id) {
      return task;
    }
  });

  tasks.splice(taskIndex, 1);

  renderTasks();
}

function submitTask() {
  let taskText = _taskInput.value;
  let taskStatus = _taskStatusSelect.value;

  // validation
  if (taskText === "" || taskStatus === "") {
    alert("hoosen baina");
    return;
  }

  let taskId = Math.random();

  let task = {
    id: taskId,
    text: taskText,
    status: taskStatus,
    isDone: false,
  };

  tasks.push(task);

  renderTasks();

  //clear input value
  _taskInput.value = "";
  hideModal();
}

function renderTasks() {
  let _todosHTML = "";
  let _inprogressHTML = "";

  tasks.forEach((task) => {
    let taskText = task.text;
    let taskCheck = task.isDone;
    let taskId = task.id;

    let _taskHTML = createTaskElement(taskText, taskId, taskCheck);

    if (task.status === "todo") {
      _todosHTML = _todosHTML + _taskHTML;
    }
    if (task.status === "inprogress") {
      _inprogressHTML = _inprogressHTML + _taskHTML;
    }
  });

  todoBoard.innerHTML = _todosHTML;
  inprogressBoard.innerHTML = _inprogressHTML;
}

_taskSubmitBtn.addEventListener("click", submitTask);