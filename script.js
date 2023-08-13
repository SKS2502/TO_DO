document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const pendingTasksList = document.getElementById("pendingTasks");
    const completedTasksList = document.getElementById("completedTasks");

    let tasks = [];

    function addTask(title, description) {
        const task = {
            title: title,
            description: description,
            status: "pending",
        };
        tasks.push(task);
        updateTaskLists();
    }

    function updateTaskLists() {
        pendingTasksList.innerHTML = "";
        completedTasksList.innerHTML = "";

        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            const taskInfoDiv = document.createElement("div");
            taskInfoDiv.classList.add("task-info");
            const titleElement = document.createElement("h3");
            titleElement.textContent = task.title;
            taskInfoDiv.appendChild(titleElement);

            if (task.description) {
                const descriptionElement = document.createElement("p");
                descriptionElement.textContent = task.description;
                taskInfoDiv.appendChild(descriptionElement);
            }

            listItem.appendChild(taskInfoDiv);

            if (task.status === "pending") {
                const completeButton = document.createElement("button");
                completeButton.textContent = "Complete";
                completeButton.addEventListener("click", function () {
                    completeTask(index);
                });
                listItem.appendChild(completeButton);
                
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", function () {
                    deleteTask(index);
                });
                listItem.appendChild(deleteButton);
                pendingTasksList.appendChild(listItem);
            } else {
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", function () {
                    deleteTask(index);
                });
                listItem.appendChild(deleteButton);
                completedTasksList.appendChild(listItem);
            }
        });
    }

    function completeTask(index) {
        tasks[index].status = "completed";
        updateTaskLists();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        updateTaskLists();
    }

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const taskTitle = document.getElementById("taskTitle").value;
        const taskDescription = document.getElementById("taskDescription").value;
        addTask(taskTitle, taskDescription);
        taskForm.reset();
    });

    updateTaskLists();
});
