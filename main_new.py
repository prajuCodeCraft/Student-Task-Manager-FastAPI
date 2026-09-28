from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Student Task Manager",
    description="Simple Task Management API using FastAPI",
    version="1.0.0"
)

# Allow frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Data Models
# -----------------------------

class TaskCreate(BaseModel):
    title: str
    description: str = ""
    priority: str = "Medium"


class TaskUpdate(BaseModel):
    title: str
    description: str = ""
    priority: str = "Medium"
    completed: bool = False


# -----------------------------
# Temporary Database
# -----------------------------

tasks = [
    {
        "id": 1,
        "title": "Complete Python Assignment",
        "description": "Finish FastAPI workshop assignment",
        "priority": "High",
        "completed": False
    },
    {
        "id": 2,
        "title": "Submit DBMS Project",
        "description": "Upload final DBMS project",
        "priority": "Medium",
        "completed": True
    },
    {
        "id": 3,
        "title": "Prepare Presentation",
        "description": "Prepare project presentation slides",
        "priority": "Low",
        "completed": False
    }
]

next_id = 4


# -----------------------------
# Home API
# -----------------------------

@app.get("/")
def home():
    return {
        "message": "Welcome to Student Task Manager API",
        "status": "running"
    }


# -----------------------------
# Get All Tasks
# -----------------------------

@app.get("/tasks")
def get_tasks():
    return tasks


# -----------------------------
# Get Single Task
# -----------------------------

@app.get("/tasks/{task_id}")
def get_task(task_id: int):

    for task in tasks:
        if task["id"] == task_id:
            return task

    raise HTTPException(
        status_code=404,
        detail="Task not found"
    )


# -----------------------------
# Add New Task
# -----------------------------

@app.post("/tasks")
def create_task(task: TaskCreate):

    global next_id

    new_task = {
        "id": next_id,
        "title": task.title,
        "description": task.description,
        "priority": task.priority,
        "completed": False
    }

    tasks.append(new_task)

    next_id += 1

    return {
        "message": "Task created successfully",
        "task": new_task
    }


# -----------------------------
# Update Task
# -----------------------------

@app.put("/tasks/{task_id}")
def update_task(task_id: int, updated_task: TaskUpdate):

    for task in tasks:

        if task["id"] == task_id:

            task["title"] = updated_task.title
            task["description"] = updated_task.description
            task["priority"] = updated_task.priority
            task["completed"] = updated_task.completed

            return {
                "message": "Task updated successfully",
                "task": task
            }

    raise HTTPException(
        status_code=404,
        detail="Task not found"
    )


# -----------------------------
# Mark Task Complete
# -----------------------------

@app.patch("/tasks/{task_id}/complete")
def complete_task(task_id: int):

    for task in tasks:

        if task["id"] == task_id:

            task["completed"] = not task["completed"]

            return {
                "message": "Task status updated",
                "task": task
            }

    raise HTTPException(
        status_code=404,
        detail="Task not found"
    )


# -----------------------------
# Delete Task
# -----------------------------

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):

    for index, task in enumerate(tasks):

        if task["id"] == task_id:

            deleted_task = tasks.pop(index)

            return {
                "message": "Task deleted successfully",
                "task": deleted_task
            }

    raise HTTPException(
        status_code=404,
        detail="Task not found"
    )


# -----------------------------
# Statistics
# -----------------------------

@app.get("/stats")
def get_stats():

    total = len(tasks)

    completed = len(
        [task for task in tasks if task["completed"]]
    )

    pending = total - completed

    return {
        "total": total,
        "completed": completed,
        "pending": pending
    }