
# 📝 Task Management App 
## Demo Link : https://drive.google.com/file/d/1DPd79qUel3IeDiMuVKV28o-xPW4ed45b/view?usp=sharing

## 📌 Objective

This project is a **Task Management Application** developed as part of **Sprint-2**. The goal is to build a responsive and efficient task manager using **React + TypeScript** that allows users to view, add, edit, delete, and filter tasks easily.



## 🚀 Features

### ✅ 1. Home Page (Task List)
- Displays all tasks in a clean **list/grid** format.
- Each task card shows:
  - **Title**
  - **Priority** (Low | Medium | High)
  - **Status** (To Do | In Progress | Done)
  - **Due Date**
- **Click on a task** to view detailed information.
- **Filtering Options**:
  - Filter by **Status**
  - Filter by **Priority**
- **Add Task** button to create a new task.

### 📄 2. Task Details Page
- Displays full task information:
  - Title, Description, Due Date, Priority, Status, Tags
- Action buttons:
  - **Edit Task** → navigates to Edit Task form
  - **Delete Task** → opens a confirmation modal before deletion
### 📝 3. Add/Edit Task Page
- Form built using **Formik** and validated with **Yup**:
  - **Title** – required
  - **Description** – optional
  - **Due Date** – must be a future date
  - **Priority** – dropdown (Low, Medium, High)
  - **Status** – dropdown (To Do, In Progress, Done)
  - **Tags** – comma-separated optional tags
- **Edit mode**:
  - Form pre-filled with existing task values
- **On Submit**:
  - Dispatches Redux action to **create** or **update** task
  - Navigates back to the task list


## 🎯 Bonus Enhancements (Optional but Implemented)

- 🔍 **Search Bar**: Filter tasks by title or tags
- 💾 **LocalStorage** (or mock API): Persist task data using `localStorage`
- ✅ **Snackbar Notifications**: For success/error on actions like add, edit, delete
- 🧩 **Custom Hooks**:
  - `useFilteredTasks` – to handle task filtering logic
  - `useTaskForm` – to manage Formik logic
  - `useDebouncedSearch` – to debounce the search input (if implemented)


## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React + TypeScript** | Frontend Framework |
| **Redux Toolkit** | Global State Management |
| **React Router DOM** | Page Navigation |
| **Formik + Yup** | Form Handling and Validation |
| **React Icons** | UI Enhancements |
| **LocalStorage / Axios** | Data Persistence (Mock API or local) |


## 📸 Demo Screenshots
![image](https://github.com/user-attachments/assets/1f1bd5ee-a51a-4888-9bad-288c7e680747)
![image](https://github.com/user-attachments/assets/044efdbb-26d4-40d8-b10c-7f48370dd33b)
![image](https://github.com/user-attachments/assets/220316b6-bb3b-4521-b8ef-5cae61e1a51c)
![image](https://github.com/user-attachments/assets/d99fd8a0-3a38-43cf-81c5-b6f8f9e8de58)
![image](https://github.com/user-attachments/assets/31016308-861b-4c75-8e2d-1f6ff071a918)
![image](https://github.com/user-attachments/assets/1c2fab4e-3de3-4fbf-a78d-99b15fb5562f)
![image](https://github.com/user-attachments/assets/44e75723-84bb-4acf-a1f1-cad504ace213)

## 📂 Project Structure (Optional)


src/
│
├── components/       # Reusable components like TaskCard, Filter, Snackbar
├── pages/            # Home, TaskDetails, AddTask, EditTask
├── redux/            # Slices and store configuration
├── hooks/            # Custom hooks (useFilteredTasks, useTaskForm, etc.)
├── types/            # TypeScript interfaces for task models
├── App.tsx           # App routing
└── index.tsx         # Entry point

## 🧪 How to Run

# Clone the repo
git clone https://github.com/SubithaNaidu/S8_08_Apr_86cygrakd.git
cd task-manager

# Install dependencies
npm install

# Start the server
npm start

> App runs on `http://localhost:3000`

---

## 📌 Conclusion

This app showcases my ability to:
- Work with modern React features (hooks, state, routing)
- Handle forms with proper validation
- Maintain scalable code architecture
- Implement global state management and routing


## 🙋‍♀️ Author

**Subitha Naidu**

