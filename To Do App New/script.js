let modal = document.getElementById("myModal");
let _taskInput = document.getElementById("taskInput");
let _taskStatusSelect = document.getElementById("taskStatusSelect");
let _taskSubmitBtn = document.getElementById("taskSubmitBtn");

let _editTaskInput = document.getElementById("editTaskInput");
let _editTaskSubmitBtn = document.getElementById("editTaskSubmitBtn");
let _editTaskStatusSelect = document.getElementById("editTaskStatusSelect");

let todoBoard = document.getElementById("board-todo-tasks");
let inprogressBoard = document.getElementById("board-inprogress-tasks");
let doneBoard = document.getElementById("board-done-tasks");
let blockBoard = document.getElementById("board-blocked-tasks");

let tasks = [];
let btn = document.getElementById("myBtn");
let currentEditTaskId = null; 
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

  return `
    <div class="task">
      <input type="checkbox" ${isChecked} />
      <p>${text}</p>
      <div class="flex">
        <i class="fa fa-pencil" aria-hidden="true" onclick="showModalEdit(${id})"></i>
        <i class="fa fa-trash" aria-hidden="true" onclick="deleteTask(${id})"></i>
      </div>
    </div>`;
}

function showModalEdit(id) {
  let taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    let task = tasks[taskIndex];
    _editTaskInput.value = task.text;
    _editTaskStatusSelect.value = task.status;
    currentEditTaskId = id;
    showModal(); 
  }
}

function editTask() {
  let newTaskText = _editTaskInput.value;
  let newTaskStatus = _editTaskStatusSelect.value;

  if (newTaskText === "" || newTaskStatus === "") {
    alert("ym bich");
    return;
  }

  let taskIndex = tasks.findIndex((task) => task.id === currentEditTaskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = {
      id: currentEditTaskId,
      text: newTaskText,
      status: newTaskStatus,
      isDone: tasks[taskIndex].isDone 
    };
  }

  hideModal(); 
  renderTasks(); 
  currentEditTaskId = null; 
}

_editTaskSubmitBtn.addEventListener("click", editTask);

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
    alert("ym bich");
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
 
  let boardHTML = {
    todo: "",
    inprogress: "",
    done: "",
    blocked: ""
  };


  tasks.forEach((task) => {
    let _taskHTML = createTaskElement(task.text, task.id, task.isDone);
    if (boardHTML[task.status] !== undefined) {
      boardHTML[task.status] += _taskHTML;
    }
  });
  todoBoard.innerHTML = boardHTML.todo;
  inprogressBoard.innerHTML = boardHTML.inprogress;
  doneBoard.innerHTML = boardHTML.done;
  blockBoard.innerHTML = boardHTML.blocked;
}

_taskSubmitBtn.addEventListener("click", submitTask);
