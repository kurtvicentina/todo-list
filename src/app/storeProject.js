import { clearForm } from "./domController"
import { closeModal } from "./domController"
import { generateProject } from "./domController"
import { appendProject } from "./domController"
import { appendTask } from "./domController"
import { format, formatDistance } from "date-fns"
const projectForm = document.querySelector('#projectForm')
const projectModal = document.querySelector('#add-project-modal')
export const addProjectBtn = document.querySelector('#add-project-button')
export let allProjects = []

allProjects.push('Today')
allProjects.push('Weekly')
allProjects.push('Monthly')

projectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    createProject()
})

function createProject (){
    const projectName = projectForm.projectName.value
    allProjects.push(projectName)
    localStorage.setItem('allProject', JSON.stringify(allProjects))
    appendProject(projectName)
    generateProject()
    clearForm(projectForm)
    closeModal(projectModal)
}

export function findTasksOfProject(project){
    const taskCollection = JSON.parse(localStorage.getItem('allTask'))

    let tasks = taskCollection.filter(item => item.taskProject == project)
    tasks.forEach((task) => {
        const wordedDate = format(task.taskDeadline, 'MMMM d, yyyy')
        const dateDistance = formatDistance(new Date(), task.taskDeadline)
        appendTask(task.taskName, task.taskDescription, task.taskPriority, `${wordedDate} | ${dateDistance}`, task.taskIndex)
    })
}

export function showAllTasks(){
    const taskCollection = JSON.parse(localStorage.getItem('allTask'))

    taskCollection.forEach((task) => {
        const wordedDate = format(task.taskDeadline, 'MMMM d, yyyy')
        const dateDistance = formatDistance(new Date(), task.taskDeadline)
        appendTask(task.taskName, task.taskDescription, task.taskPriority, `${wordedDate} | ${dateDistance}`, task.taskIndex)
    })
}