// Load tasks from localStorage when the page loads
window.onload = function() {
    loadTasks();
};

// Add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDate');
    const taskValue = taskInput.value.trim();
    const dueDateValue = dueDateInput.value;

    if (taskValue) {
        let tasks = getTasksFromLocalStorage();
        tasks.push({ text: taskValue, dueDate: dueDateValue, completed: false });
        saveTasksToLocalStorage(tasks);
        taskInput.value = ''; // Clear the input field
        dueDateInput.value = ''; // Clear the due date field
        renderTasks();
    }
}

// Remove a task
function removeTask(index) {
    let tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1); // Remove the task at the given index
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

// Edit a task
function editTask(index) {
    let tasks = getTasksFromLocalStorage();
    let taskText = prompt("Edit the task:", tasks[index].text);
    if (taskText !== null && taskText.trim() !== "") {
        tasks[index].text = taskText;
        saveTasksToLocalStorage(tasks);
        renderTasks();
    }
}

// Toggle task completion
function toggleTaskCompletion(index) {
    let tasks = getTasksFromLocalStorage();
    tasks[index].completed = !tasks[index].completed;
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

// Get tasks from localStorage
function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Save tasks to localStorage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render the task list
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the existing list

    const tasks = getTasksFromLocalStorage();
    let allCompleted = true;

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.innerText = task.text;

        const dueDate = document.createElement('span');
        dueDate.className = 'due-date';
        dueDate.innerText = task.dueDate ? `Due: ${task.dueDate}` : '';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = function() {
            toggleTaskCompletion(index);
        };

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&times;';
        deleteButton.onclick = function() {
            removeTask(index);
        };

        const editButton = document.createElement('button');
        editButton.innerHTML = '✏️';
        editButton.onclick = function() {
            editTask(index);
        };

        if (task.completed) {
            taskText.innerText += ' - Well Done!';
            taskText.style.color = 'green';
        } else {
            allCompleted = false; // If even one task is incomplete, set flag to false
        }

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(dueDate);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });

    // Show the congratulations message if all tasks are completed
    const congratulationsMessage = document.getElementById('congratulationsMessage');
    if (allCompleted && tasks.length > 0) {
        congratulationsMessage.style.display = 'block';
    } else {
        congratulationsMessage.style.display = 'none';
    }
}

// Load tasks from localStorage
function loadTasks() {
    renderTasks();
}
