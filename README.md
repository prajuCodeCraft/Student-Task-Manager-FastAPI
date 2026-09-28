# 🎓 Student Task Manager

A simple and interactive **Student Task Manager** built using **FastAPI, Python, HTML, CSS, and JavaScript**.

This project demonstrates how a frontend application communicates with a backend through **REST APIs** and how CRUD operations can be implemented using FastAPI.

---

## 🚀 Project Overview

The Student Task Manager allows users to manage their tasks through a simple and interactive web interface.

### Features

* ➕ Add new tasks
* 📋 View all tasks
* ✏️ Update tasks
* ✅ Mark tasks as completed
* ↩️ Undo completed tasks
* 🗑️ Delete tasks
* 🔍 Filter pending and completed tasks
* 📊 View task statistics
* 🎯 Set task priorities

---

## 🛠️ Technologies Used

### Backend

* Python
* FastAPI
* Uvicorn
* Pydantic

### Frontend

* HTML5
* CSS3
* JavaScript

### API & Communication

* REST API
* JSON
* JavaScript Fetch API
* CRUD Operations
* Swagger UI

---

## 📁 Project Structure

```text
Student-Task-Manager-FastAPI/
│
├── backend/
│   ├── main_new.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/prajuCodeCraft/Student-Task-Manager-FastAPI.git
```

Go to the project folder:

```bash
cd Student-Task-Manager-FastAPI
```

---

## 2️⃣ Open Backend Folder

```bash
cd backend
```

---

## 3️⃣ Create Virtual Environment

```bash
python -m venv venv
```

### Windows CMD

```cmd
venv\Scripts\activate
```

### Windows PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

After activation, you should see:

```text
(venv)
```

before your terminal path.

---

## 4️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 5️⃣ Start FastAPI Server

Since the backend file is named `main_new.py`, use:

```bash
python -m uvicorn main_new:app --reload
```

Or:

```bash
uvicorn main_new:app --reload
```

The server will start at:

```text
http://127.0.0.1:8000
```

---

# 📖 API Documentation

FastAPI provides automatic interactive API documentation using Swagger UI.

Open:

```text
http://127.0.0.1:8000/docs
```

### Available APIs

| Method | Endpoint                    | Description         |
| ------ | --------------------------- | ------------------- |
| GET    | `/`                         | Check API status    |
| GET    | `/tasks`                    | Get all tasks       |
| GET    | `/tasks/{task_id}`          | Get a specific task |
| POST   | `/tasks`                    | Create a new task   |
| PUT    | `/tasks/{task_id}`          | Update a task       |
| PATCH  | `/tasks/{task_id}/complete` | Complete/undo task  |
| DELETE | `/tasks/{task_id}`          | Delete a task       |
| GET    | `/stats`                    | Get task statistics |

---

# 🔌 Example API Request

## Create a Task

### Endpoint

```text
POST /tasks
```

### Request Body

```json
{
    "title": "Complete Python Assignment",
    "description": "Finish the Python assignment",
    "priority": "High"
}
```

### Example Response

```json
{
    "message": "Task created successfully",
    "task": {
        "id": 4,
        "title": "Complete Python Assignment",
        "description": "Finish the Python assignment",
        "priority": "High",
        "completed": false
    }
}
```

---

# 🌐 Running the Frontend

Keep the FastAPI server running.

Then open:

```text
frontend/index.html
```

in your browser.

The frontend communicates with the FastAPI backend using JavaScript `fetch()`.

Example:

```javascript
fetch("http://127.0.0.1:8000/tasks")
```

---

# 🔄 Application Workflow

```text
                 USER
                   │
                   ▼
          ┌─────────────────┐
          │    Frontend     │
          │  HTML/CSS/JS    │
          └────────┬────────┘
                   │
              fetch() / JSON
                   │
                   ▼
          ┌─────────────────┐
          │     FastAPI     │
          │    REST APIs    │
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │  Python Memory  │
          │    Data Store   │
          └─────────────────┘
```

---

# 🔄 CRUD Operations

CRUD stands for:

| Operation | Meaning | Project Example           |
| --------- | ------- | ------------------------- |
| **C**     | Create  | Add a new task            |
| **R**     | Read    | View tasks                |
| **U**     | Update  | Update or complete a task |
| **D**     | Delete  | Delete a task             |

---

# 📊 Task Management

Each task contains:

```text
ID
Title
Description
Priority
Completed Status
```

### Priority Levels

* 🔴 High
* 🟡 Medium
* 🟢 Low

### Task Status

* ⏳ Pending
* ✅ Completed

---

# 🧠 What I Learned

Through this project, I learned how to:

* Build REST APIs using FastAPI
* Create CRUD operations
* Work with HTTP methods
* Use Pydantic models
* Handle JSON data
* Connect frontend and backend
* Use JavaScript Fetch API
* Handle API responses
* Test APIs using Swagger UI
* Debug frontend and backend issues
* Understand client-server communication
* Work with Python virtual environments

---

# ⚠️ Important Note

This project is created for **learning and educational purposes**.

Currently, task data is stored temporarily in Python memory.

Therefore, when the FastAPI server is restarted, the task data will reset.

This implementation is **not intended for production use**.

---

# 🔮 Future Improvements

The project can be extended with:

* 🔐 User authentication
* 🔑 JWT authentication
* 🗄️ MySQL / PostgreSQL database
* 🔒 Protected APIs
* 👤 Individual user accounts
* 📅 Task deadlines
* 🔔 Task reminders
* 📈 Advanced analytics
* ☁️ Cloud deployment
* 📱 Improved responsive design

---


## 🚀 Keep Learning. Keep Building. Keep Growing.

---

### 🏷️ Topics

`#FastAPI` `#Python` `#RESTAPI` `#BackendDevelopment` `#JavaScript` `#WebDevelopment` `#CRUD` `#Swagger` `#StudentDeveloper` `#LearningByDoing`
