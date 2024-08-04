import { clearForm } from "./domController"
import { closeModal } from "./domController"
import { generateProject } from "./domController"
import { appendProject } from "./domController"
const projectForm = document.querySelector('#projectForm')
const projectModal = document.querySelector('#add-project-modal')
export const addProjectBtn = document.querySelector('#add-project-button')
export let allProjects = []

allProjects.push('Daily')
allProjects.push('Weekly')
allProjects.push('Monthly')

addProjectBtn.addEventListener('click', createProject)

function createProject (){
    const projectName = projectForm.projectName.value
    allProjects.push(projectName)
    localStorage.setItem('allProject', JSON.stringify(allProjects))
    appendProject(projectName)
    generateProject()
    clearForm(projectForm)
    closeModal(projectModal)
}


//Task to be completed

// overall design
// done checkbox button should work
// action buttons should work