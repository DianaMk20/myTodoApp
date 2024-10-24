const taskForm = document.querySelector("#taskForm");
const tasksList = document.querySelector("#tasksList");
const addButton = document.querySelector("#addButton");
const taskInput = document.querySelector("#task");

let taskCount = 0;
const maxWidth = 300; // Maximum width in pixels for the input field

// Create a canvas element to measure the text width
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
context.font = "16px monospace"; // Match the font style to the input field

function isTextExceedingWidth(text) {
  return context.measureText(text).width > maxWidth;
}

taskInput.addEventListener("input", function () {
  let currentValue = taskInput.value;

  // Keep trimming the input until it fits within the maxWidth
  while (isTextExceedingWidth(currentValue)) {
    currentValue = currentValue.slice(0, -1);
  }

  taskInput.value = currentValue;

  if (currentValue.trim() !== "") {
    addButton.disabled = false; /* Enable the Add button when input is not empty */
  } else {
    addButton.disabled = true; /* Disable the Add button when input is empty */
  }
});

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const task = taskInput.value;

  const newList = document.createElement("li");
  newList.dataset.taskNumber = ++taskCount;

  const taskText = document.createElement("span");
  taskText.textContent = task;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("click", function () {
    if (checkbox.checked) {
      taskText.style.textDecoration = "line-through";
    } else {
      taskText.style.textDecoration = "none";
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    tasksList.removeChild(newList);
    updateTaskNumbers();
  });

  newList.appendChild(taskText);
  newList.appendChild(checkbox);
  newList.appendChild(deleteButton);

  tasksList.appendChild(newList);

  taskInput.value = ""; /* clear the input field */
  addButton.disabled = true; /* Disable the Add button after submitting */
});

function updateTaskNumbers() {
  const taskListItems = tasksList.children;
  taskCount = 0;
  for (let i = 0; i < taskListItems.length; i++) {
    taskListItems[i].dataset.taskNumber = ++taskCount;
  }
}
