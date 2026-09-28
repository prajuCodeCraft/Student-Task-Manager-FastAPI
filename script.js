// ----------------------------------
// API URL
// ----------------------------------

const API_URL = "http://127.0.0.1:8000";


// ----------------------------------
// Global Variables
// ----------------------------------

let allTasks = [];

let currentFilter = "all";


// ----------------------------------
// Load Tasks When Page Opens
// ----------------------------------

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadTasks();

        loadStats();

    }
);


// ----------------------------------
// Load All Tasks
// ----------------------------------

async function loadTasks() {

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML =
        '<div class="loading">Loading tasks...</div>';


    try {

        const response =
            await fetch(`${API_URL}/tasks`);


        if (!response.ok) {

            throw new Error(
                "Unable to load tasks"
            );

        }


        allTasks =
            await response.json();


        displayTasks();


        loadStats();

    }

    catch (error) {

        console.error(error);

        taskList.innerHTML = `
            <div class="empty">
                ❌ Unable to connect to FastAPI.
                <br><br>
                Make sure the backend is running.
            </div>
        `;

    }

}


// ----------------------------------
// Display Tasks
// ----------------------------------

function displayTasks() {

    const taskList =
        document.getElementById("taskList");


    let filteredTasks = allTasks;


    // Apply filter

    if (currentFilter === "pending") {

        filteredTasks =
            allTasks.filter(
                task => !task.completed
            );

    }


    if (currentFilter === "completed") {

        filteredTasks =
            allTasks.filter(
                task => task.completed
            );

    }


    // Empty state

    if (filteredTasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty">
                📭 No tasks found.
            </div>
        `;

        return;

    }


    // Create task cards

    taskList.innerHTML =
        filteredTasks.map(
            task => createTaskHTML(task)
        ).join("");

}


// ----------------------------------
// Create Task HTML
// ----------------------------------

function createTaskHTML(task) {

    const completedClass =
        task.completed ? "completed" : "";


    const buttonText =
        task.completed
            ? "↩️ Undo"
            : "✅ Complete";


    return `

        <div class="task-card ${completedClass}">

            <div class="task-top">

                <div class="task-info">

                    <div class="task-title">

                        ${escapeHTML(task.title)}

                    </div>


                    <div class="task-description">

                        ${
                            escapeHTML(
                                task.description ||
                                "No description"
                            )
                        }

                    </div>


                    <span class="priority ${task.priority}">

                        ${task.priority}

                    </span>

                </div>


                <div class="task-actions">

                    <button
                        class="complete-btn"
                        onclick="toggleTask(${task.id})"
                    >
                        ${buttonText}
                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteTask(${task.id})"
                    >
                        🗑️ Delete
                    </button>

                </div>

            </div>

        </div>

    `;

}


// ----------------------------------
// Add New Task
// ----------------------------------

document
    .getElementById("taskForm")
    .addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const title =
                document.getElementById(
                    "title"
                ).value.trim();


            const description =
                document.getElementById(
                    "description"
                ).value.trim();


            const priority =
                document.getElementById(
                    "priority"
                ).value;


            if (!title) {

                alert(
                    "Please enter a task title."
                );

                return;

            }


            const taskData = {

                title: title,

                description: description,

                priority: priority

            };


            try {

                const response =
                    await fetch(
                        `${API_URL}/tasks`,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    taskData
                                )

                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Unable to create task"
                    );

                }


                const result =
                    await response.json();


                console.log(result);


                alert(
                    "✅ Task added successfully!"
                );


                // Clear form

                document
                    .getElementById("taskForm")
                    .reset();


                // Reload tasks

                loadTasks();

            }

            catch (error) {

                console.error(error);

                alert(
                    "❌ Could not add task."
                );

            }

        }
    );


// ----------------------------------
// Toggle Task Completion
// ----------------------------------

async function toggleTask(taskId) {

    try {

        const response =
            await fetch(
                `${API_URL}/tasks/${taskId}/complete`,
                {
                    method: "PATCH"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Unable to update task"
            );

        }


        await response.json();


        loadTasks();

    }

    catch (error) {

        console.error(error);

        alert(
            "❌ Could not update task."
        );

    }

}


// ----------------------------------
// Delete Task
// ----------------------------------

async function deleteTask(taskId) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/tasks/${taskId}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Unable to delete task"
            );

        }


        await response.json();


        loadTasks();

    }

    catch (error) {

        console.error(error);

        alert(
            "❌ Could not delete task."
        );

    }

}


// ----------------------------------
// Filter Tasks
// ----------------------------------

function filterTasks(
    filter,
    button
) {

    currentFilter = filter;


    // Remove active class

    document
        .querySelectorAll(".filter-btn")
        .forEach(
            btn =>
                btn.classList.remove("active")
        );


    // Add active class

    button.classList.add("active");


    displayTasks();

}


// ----------------------------------
// Load Statistics
// ----------------------------------

async function loadStats() {

    try {

        const response =
            await fetch(
                `${API_URL}/stats`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load statistics"
            );

        }


        const stats =
            await response.json();


        document
            .getElementById("totalTasks")
            .textContent =
            stats.total;


        document
            .getElementById("completedTasks")
            .textContent =
            stats.completed;


        document
            .getElementById("pendingTasks")
            .textContent =
            stats.pending;

    }

    catch (error) {

        console.error(error);

    }

}


// ----------------------------------
// Security Helper
// ----------------------------------

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}