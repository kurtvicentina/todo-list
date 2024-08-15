import { clearForm } from "./domController"
import { closeModal } from "./domController"
import { appendTask } from "./domController"
import { showTaskDetails } from "./domController"
import { editTask } from "./domController"
import { removeTaskFromDom } from "./domController"
import { editTaskFromDom } from "./domController"
import { isInProjectTable } from "./domController"
import { addWeeks, format, formatDistance } from 'date-fns';
const taskForm = document.querySelector('#taskForm')
const taskModal = document.querySelector('#add-task-modal')
export const addTaskBtn = document.querySelector('#add-task-button')
export let allTask = []
import { allProjects } from "./storeProject"


taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const task = storeTask()
    allTask.push(task)
    localStorage.setItem('allTask', JSON.stringify(allTask))
    const wordedDate = format(task.taskDeadline, 'MMMM d, yyyy')
    const dateDistance = formatDistance(new Date(), task.taskDeadline)
    
    if(isInProjectTable(task.taskProject)){
    appendTask(task.taskName, task.taskDescription, task.taskPriority, `${wordedDate} | ${dateDistance}`, task.taskIndex)
    }
});

function storeTask(){
    const taskName = taskForm.taskName.value
    const taskProject = taskForm.taskProject.value
    const taskDescription = taskForm.taskDescription.value
    const taskDeadline = taskForm.taskDeadline.value
    const taskPriority = taskForm.taskPriority.value
    const isDone = false
    const taskIndex = allTask.length

    clearForm(taskForm)
    closeModal(taskModal)
    return{ taskName, taskProject, taskDescription, taskDeadline, taskPriority, isDone, taskIndex }
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

export const dummyTasks = [
    {
    taskName : 'Today task',
    taskProject : 'Today',
    taskDescription : 'Today Description',
    taskDeadline : format(new Date(), 'MMMM d, yyyy'),
    taskPriority: 'High',
    isDone: false,
    taskIndex: 0,
    },

    {
    taskName : 'Week task',
    taskProject : 'Weekly',
    taskDescription : 'Week Description',
    taskDeadline : format(addWeeks( new Date(), 1), 'MMMM d, yyyy'),
    taskPriority: 'Medium',
    isDone: false,
    taskIndex: 1,
    },

    {
    taskName : 'Month task',
    taskProject : 'Monthly',
    taskDescription : 'Month Description',
    taskDeadline : format(addWeeks( new Date(), 4), 'MMMM d, yyyy'),
    taskPriority: 'Low',
    isDone: false,
    taskIndex: 2,
    },
]