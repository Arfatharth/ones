// Real-time activity and notifications (example functionality)
document.querySelector('.notification-btn').addEventListener('click', () => {
  alert("You have new notifications!");
});

// Elements
const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");
const closeModal = document.getElementById("closeModal");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const modalTitle = document.getElementById("modalTitle");
const taskDoneBtn = document.getElementById("taskDoneBtn");
const personalProgressBar = document.querySelector('.personal-progress .progress');
const progressText = document.querySelector('.personal-progress .progress-text');

// Persistent Storage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null; // To track the task being edited

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <div>
        <span class="task-title">${task.taskName}</span>
        <p>Due: ${task.dueDate}</p>
      </div>
      <div>
        <div class="progress-bar">
          <div class="progress" style="width: ${task.progress}%"></div>
        </div>
        <div class="slider-container">
          <input type="range" min="0" max="100" value="${task.progress}" data-index="${index}" />
          <span class="progress-percentage">${task.progress}%</span>
          <span class="edit-icon" data-index="${index}">✏️</span>
        </div>
      </div>
    `;
    taskList.appendChild(taskItem);
  });

  // Add event listeners for sliders and edit icons
  document.querySelectorAll('input[type="range"]').forEach((slider) => {
    slider.addEventListener("input", (event) => {
      const index = event.target.getAttribute("data-index");
      tasks[index].progress = parseInt(event.target.value, 10);
      saveTasks();
      renderTasks();
      updateAverageProgress();
    });
  });

  document.querySelectorAll(".edit-icon").forEach((icon) => {
    icon.addEventListener("click", (event) => {
      editIndex = event.target.getAttribute("data-index");
      openEditModal(editIndex);
    });
  });

  updateAverageProgress(); // Update the average progress bar
}

// Open modal for adding or editing tasks
function openModal() {
  modalTitle.innerText = "Add New Task";
  taskForm.reset();
  editIndex = null;
  taskDoneBtn.style.display = "none"; // Hide Task Done button in Add Mode
  taskModal.classList.add("active");
}

function openEditModal(index) {
  const task = tasks[index];
  modalTitle.innerText = "Edit Task";
  document.getElementById("taskName").value = task.taskName;
  document.getElementById("dueDate").value = task.dueDate;
  taskModal.classList.add("active");
  taskDoneBtn.style.display = "inline-block"; // Show Task Done button in Edit Mode
}

// Add or Edit Task
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskName = document.getElementById("taskName").value;
  const dueDate = document.getElementById("dueDate").value;
  const task = { taskName, dueDate, progress: editIndex !== null ? tasks[editIndex].progress : 0 };

  if (editIndex !== null) {
    tasks[editIndex] = task; // Update the task
  } else {
    tasks.push(task); // Add a new task
  }

  saveTasks();
  renderTasks();
  taskModal.classList.remove("active");
});

// Mark Task as Done (Delete Task)
taskDoneBtn.addEventListener("click", () => {
  tasks.splice(editIndex, 1); // Remove task from array
  saveTasks();
  renderTasks();
  taskModal.classList.remove("active");
});

// Close modal
closeModal.addEventListener("click", () => {
  taskModal.classList.remove("active");
});

addTaskBtn.addEventListener("click", openModal);

// Update Average Progress
function updateAverageProgress() {
  if (tasks.length === 0) {
    personalProgressBar.style.width = '0%';
    progressText.textContent = 'No tasks added!';
    return;
  }

  const totalProgress = tasks.reduce((sum, task) => sum + task.progress, 0);
  const averageProgress = Math.round(totalProgress / tasks.length);

  personalProgressBar.style.width = `${averageProgress}%`;
  progressText.textContent = `Completed ${averageProgress}% of your tasks!`;
}

// Initial render
renderTasks();
