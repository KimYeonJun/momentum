const taskForm = document.querySelector(".js-toDoForm");
const taskInput = taskForm.querySelector("input");
const todoList = document.querySelector(".js-todoList");
const finishedList = document.querySelector(".js-finishedList");

const TODO_LS = "todo";
const FINISHED_LS = "finished";

let todoArray = [];
let finishedArray = [];
const sortTodo = () => {
  let idx = 1;
  todoArray.forEach(function (todo) {
    todo.id = idx++;
  });
  idx = 1;
  todoList.childNodes.forEach(function (node) {
    node.id = idx++;
  });
};
const sortFinished = () => {
  let idx = 1;
  finishedArray.forEach(function (task) {
    task.id = idx++;
  });
  idx = 1;
  finishedList.childNodes.forEach(function (node) {
    node.id = idx++;
  });
};
const saveTodos = () => {
  localStorage.setItem(TODO_LS, JSON.stringify(todoArray));
};
const saveFinished = () => {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedArray));
};
const deleteTodo = (event) => {
  const li = event.target.parentNode;
  console.log(li);
  todoList.removeChild(li);
  todoArray = todoArray.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  saveTodos();
};
const deleteFinished = (event) => {
  const li = event.target.parentNode;
  finishedList.removeChild(li);
  finishedArray = finishedArray.filter(function (task) {
    return task.id !== parseInt(li.id);
  });
  saveFinished();
};
const deleteTodoHandler = (event) => {
  deleteTodo(event);
};
const deleteFinishedHandler = (event) => {
  deleteFinished(event);
};
const todoToFin = (event) => {
  deleteTodo(event);
  const li = event.target.parentNode;
  const text = li.childNodes[0].innerText;
  paintFinished(text);
};
const finToTodo = (event) => {
  deleteFinished(event);
  const li = event.target.parentNode;
  const text = li.childNodes[0].innerText;
  paintTodo(text);
};
const paintFinished = (text) => {
  sortFinished();
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const penBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = finishedArray.length + 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteFinishedHandler);
  penBtn.innerHTML = "⏮";
  penBtn.addEventListener("click", finToTodo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(penBtn);
  li.id = newId;
  finishedList.appendChild(li);
  const taskObj = {
    text: text,
    id: newId,
  };
  finishedArray.push(taskObj);
  saveFinished();
};
const paintTodo = (text) => {
  sortTodo();
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = todoArray.length + 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteTodoHandler);
  finBtn.innerHTML = "✅";
  finBtn.addEventListener("click", todoToFin);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newId;
  todoList.appendChild(li);
  const taskObj = {
    text: text,
    id: newId,
  };
  todoArray.push(taskObj);
  saveTodos();
};

const handleSubmitTodo = (event) => {
  event.preventDefault();
  const currentValue = taskInput.value;
  paintTodo(currentValue);
  taskInput.value = "";
  //add pendingLIst;
};

const loadFinished = () => {
  const loadedFinished = localStorage.getItem(FINISHED_LS);
  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (task) {
      paintFinished(task.text);
    });
  }
};

const loadTodos = () => {
  const loadedToDos = localStorage.getItem(TODO_LS);
  todoArray = [];
  if (loadedToDos !== null) {
    const parsedTodos = JSON.parse(loadedToDos);
    parsedTodos.forEach(function (task) {
      paintTodo(task.text);
    });
  }
};
const todoInit = () => {
  loadTodos();
  loadFinished();
  taskForm.addEventListener("submit", handleSubmitTodo);
};
todoInit();
