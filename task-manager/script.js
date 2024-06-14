document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
});

// Function to render tasks from localStorage
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (task.completed) {
            li.classList.add('completed');
        }
        li.innerHTML = `
            <span>${task.title}</span>
            <div>
                <button onclick="toggleTaskCompletion(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskTitle = taskInput.value.trim();
    if (taskTitle === '') {
        alert('Please enter a task.');
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title: taskTitle,
        completed: false
    };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
    renderTasks();
}

// Function to toggle task completion
function toggleTaskCompletion(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Function to delete a task
function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        renderTasks();
    }
}
