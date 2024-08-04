import { clearForm } from "./domController"
import { closeModal } from "./domController"
import { appendTask } from "./domController"
const taskForm = document.querySelector('#taskForm')
const taskModal = document.querySelector('#add-task-modal')
export const addTaskBtn = document.querySelector('#add-task-button')
let allTask = []
import { allProjects } from "./storeProject"


addTaskBtn.addEventListener('click', () => {
    const task = storeTask();
    dailyTaskStoreLocal(task);
    appendTask(task.taskName, task.taskDescription, task.taskPriority, task.taskDeadline);
});

function storeTask(){
    const taskName = taskForm.taskName.value
    const taskProject = taskForm.taskProject.value
    const taskDescription = taskForm.taskDescription.value
    const taskDeadline = taskForm.taskDeadline.value
    const taskPriority = taskForm.taskPriority.value

    clearForm(taskForm)
    closeModal(taskModal)
    return{ taskName, taskProject, taskDescription, taskDeadline, taskPriority }
}

function dailyTaskStoreLocal(obj){
    allTask.push(obj)

    localStorage.setItem('allTask', JSON.stringify(allTask))
}

function getAllProjects(){
    const allTasks = localStorage.getItem('allTask')

    for (const obj in allTasks){
        allProjects.push(obj.taskProject) 
    }

}

export function getAllTask(){
    return JSON.parse(localStorage.getItem('allTask'))
}