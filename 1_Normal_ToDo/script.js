document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
  
    // Initialize tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Render tasks from local storage
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.title;
        if (task.completed) {
          li.classList.add('completed');
        }
        li.setAttribute('data-index', index);
        li.addEventListener('click', toggleTask);
  
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteTask);
  
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    }
  
    // Toggle task completion
    function toggleTask() {
      const index = this.getAttribute('data-index');
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    }
  
    // Delete task
    function deleteTask(event) {
      event.stopPropagation();
      const index = this.parentElement.getAttribute('data-index');
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
  
    // Add new task
    addTaskBtn.addEventListener('click', function() {
      const taskTitle = taskInput.value.trim();
      if (taskTitle === '') return;
      
      const newTask = {
        title: taskTitle,
        completed: false
      };
      
      tasks.push(newTask);
      saveTasks();
      renderTasks();
      
      taskInput.value = '';
    });
  
    // Save tasks to localStorage
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Initial render
    renderTasks();
  });
  