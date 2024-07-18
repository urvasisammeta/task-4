document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const newTaskInput = document.getElementById('newTask');
    const addTaskButton = document.getElementById('addTaskButton');

    const apiEndpoint = '/api/tasks';

    const fetchTasks = async () => {
        const response = await fetch(apiEndpoint);
        const tasks = await response.json();
        renderTasks(tasks);
    };

    const renderTasks = (tasks) => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.description}</span>
                <div>
                    <button onclick="toggleTask(${task.id}, ${task.completed})">Complete</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    addTaskButton.addEventListener('click', async () => {
        const description = newTaskInput.value.trim();
        if (description) {
            const newTask = { description, completed: false };
            await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask)
            });
            newTaskInput.value = '';
            fetchTasks();
        }
    });

    window.toggleTask = async (id, completed) => {
        await fetch(`${apiEndpoint}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !completed })
        });
        fetchTasks();
    };

    window.deleteTask = async (id) => {
        await fetch(`${apiEndpoint}/${id}`, {
            method: 'DELETE'
        });
        fetchTasks();
    };

    fetchTasks();
});