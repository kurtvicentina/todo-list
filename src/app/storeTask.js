import { clearForm } from "./domController"
import { closeModal } from "./domController"
import { appendTask } from "./domController"
import { showTaskDetails } from "./domController"
import { editTask } from "./domController"
import { removeTaskFromDom } from "./domController"
import { editTaskFromDom } from "./domController"
const taskForm = document.querySelector('#taskForm')
const taskModal = document.querySelector('#add-task-modal')
export const addTaskBtn = document.querySelector('#add-task-button')
let allTask = []
import { allProjects } from "./storeProject"


addTaskBtn.addEventListener('click', () => {
    const task = storeTask();
    allTask.push(task)
    localStorage.setItem('allTask', JSON.stringify(allTask))
    const taskIndex = allTask.indexOf(task)
    appendTask(task.taskName, task.taskDescription, task.taskPriority, task.taskDeadline, taskIndex);
});

function storeTask(){
    const taskName = taskForm.taskName.value
    const taskProject = taskForm.taskProject.value
    const taskDescription = taskForm.taskDescription.value
    const taskDeadline = taskForm.taskDeadline.value
    const taskPriority = taskForm.taskPriority.value
    const isDone = false

    clearForm(taskForm)
    closeModal(taskModal)
    return{ taskName, taskProject, taskDescription, taskDeadline, taskPriority, isDone }
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

export function taskDone(index){
    if (allTask[index]) {
    allTask[index].isDone = !allTask[index].isDone
    }
    localStorage.setItem('allTask', JSON.stringify(allTask))
}

export function showTaskEdit(index){
    const taskIndex = index
    if(allTask[index]){
        const tName = allTask[index].taskName
        const tProjName = allTask[index].taskProject
        const tDesc = allTask[index].taskDescription
        const tDeadline = allTask[index].taskDeadline
        const tPrio = allTask[index].taskPriority
        editTask(tName, tProjName, tDesc, tDeadline, tPrio, taskIndex)
}
}

export function saveEdit(index, newTask){
    allTask[index] = newTask;
    localStorage.setItem('allTask', JSON.stringify(allTask));
    editTaskFromDom(index, newTask.taskName, newTask.taskDescription, newTask.taskPriority, newTask.taskDeadline)
    // removeTaskFromDom(index)
    // appendTask(newTask.taskName, newTask.taskDescription, newTask.taskPriority, newTask.taskDeadline)
}

export function getTaskDetails(index){
    if(allTask[index]){
    const tName = allTask[index].taskName
    const tProjName = allTask[index].taskProject
    const tDesc = allTask[index].taskDescription
    const tDeadline = allTask[index].taskDeadline
    const tPrio = allTask[index].taskPriority
    showTaskDetails(tName, tProjName, tDesc, tDeadline, tPrio)
}
}