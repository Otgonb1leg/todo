let modal = document.getElementById("myModal");
let _taskInput = document.getElementById("taskInput");
let _taskStatusSelect = document.getElementById("taskStatusSelect");
let _taskSubmitBtn = document.getElementById("taskSubmitBtn");

let todoBoard = document.getElementById("board-todo-tasks");
let inprogressBoard = document.getElementById("board-inprogress-tasks");
let doneBoard = document.getElementById("board-done-tasks");  
let blockBoard = document.getElementById("board-blocked-tasks");

let tasks = [];
let btn = document.getElementById("myBtn");

function showModal() {
  modal.style.display = "block";
}

btn.onclick = showModal;

function hideModal() {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    // hideModal();  
  }
};

function createTaskElement(text, id, checked) {
  let isChecked = checked ? "checked" : ""; 

  let _taskHTML = `
  <div class="task">
    <input type="checkbox" ${isChecked} />
    <p>${text}</p>
    <div class="flex">
      <i class="fa fa-trash" aria-hidden="true">
      <i class="fa fa-pencil" aria-hidden="true" onclick="deleteTask(${id})"</i>
    </div>
  </div>`;

  return _taskHTML;
}

function deleteTask(id) {
  let taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    renderTasks();
  }
}




function submitTask() {
  let taskText = _taskInput.value;
  let taskStatus = _taskStatusSelect.value;


  if (taskText === "" || taskStatus === "") {
    alert("Please enter task text and select a status");
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

  _taskInput.value = "";
}

function renderTasks() {
  let _todosHTML = "";
  let _inprogressHTML = "";
  let _doneHTML = "";  
  let _blockedHTML = "";  

  tasks.forEach((task) => {
    let taskText = task.text;
    let taskCheck = task.isDone;
    let taskId = task.id;

    let _taskHTML = createTaskElement(taskText, taskId, taskCheck);

    if (task.status === "todo") {
      _todosHTML += _taskHTML;
    } else if (task.status === "inprogress") {
      _inprogressHTML += _taskHTML;
    } else if (task.status === "done") {
      _doneHTML += _taskHTML;
    } else if (task.status === "blocked") {
      _blockedHTML += _taskHTML;
    }
  });

  todoBoard.innerHTML = _todosHTML;
  inprogressBoard.innerHTML = _inprogressHTML;
  doneBoard.innerHTML = _doneHTML;
  blockBoard.innerHTML = _blockedHTML;
}

_taskSubmitBtn.addEventListener("click", submitTask);
