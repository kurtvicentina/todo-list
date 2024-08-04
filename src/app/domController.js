import { allProjects } from "./storeProject"

export const openTaskButton = document.querySelector('#open-task-button')
export const closeTaskButton = document.querySelector('#close-task-button')
const taskModal = document.querySelector('#add-task-modal')
const taskForm = document.querySelector('#taskForm')

export const openProjectButton = document.querySelector('#open-project-button')
export const closeProjectButton = document.querySelector('#close-project-button')
const projectModal = document.querySelector('#add-project-modal')

const selectorDiv = document.querySelector('#projectSelectorContainer')

const taskTable = document.querySelector('.task-table')
const projectSidebar = document.querySelector('#projectSidebar')

openTaskButton.addEventListener('click', () => {
    taskModal.showModal()
})

closeTaskButton.addEventListener('click', () => {
    taskModal.close()
})

openProjectButton.addEventListener('click', () => {
    projectModal.showModal()
})

closeProjectButton.addEventListener('click', () => {
    projectModal.close()
})

export function clearForm(form){
    for (const child of form){
        child.value = ''
    }
}

export function closeModal(modal){
    modal.close()
}

export function generateProject(){

    const projectSelector = document.querySelector('#project')
    domRemover(projectSelector)
    const newSelect = createProjectSelector()
    for (const item of allProjects){
        const projOption = document.createElement('option')
        projOption.textContent = item
        newSelect.append(projOption)
    }
}

function createProjectSelector(){
        const newProjectSelector = document.createElement('select')
        newProjectSelector.setAttribute('name', 'taskProject')
        newProjectSelector.setAttribute('id', 'project')
        selectorDiv.append(newProjectSelector)

        return newProjectSelector
}

function domRemover(node){
    node.remove()
}

export function appendTask(name, description, priority, deadline){
    const doneCheckBox = document.createElement('input')
    doneCheckBox.type = 'checkbox'
    
    const taskNameDom = document.createElement('p')
    taskNameDom.textContent = name

    const taskDescriptionDom = document.createElement('p')
    taskDescriptionDom.textContent = description

    const taskPriorityDom = document.createElement('p')
    taskPriorityDom.textContent = priority
    taskPriorityDom.setAttribute('class', 'low')

    const taskDeadlineDom = document.createElement('p')
    taskDeadlineDom.textContent = deadline

    const taskDetailBtn = document.createElement('button')
    taskDetailBtn.type = 'button'
    taskDetailBtn.setAttribute('class', 'action-button')
    taskDetailBtn.setAttribute('id', 'detail-button')

    const taskEditBtn = document.createElement('button')
    taskEditBtn.type = 'button'
    taskEditBtn.setAttribute('class', 'action-button')
    taskEditBtn.setAttribute('id', 'edit-button')

    const taskDeleteBtn = document.createElement('button')
    taskDeleteBtn.type = 'button'
    taskDeleteBtn.setAttribute('class', 'action-button')
    taskDeleteBtn.setAttribute('id', 'delete-button')

    const checkBoxTd = document.createElement('td')
    const taskNameTd = document.createElement('td')
    const taskDescTd = document.createElement('td')
    const taskDeadlineTd = document.createElement('td')
    const taskPriorityTd = document.createElement('td')
    const taskBtnsTd = document.createElement('td')

    const taskTableRow = document.createElement('tr')

    checkBoxTd.append(doneCheckBox)
    taskNameTd.append(taskNameDom)
    taskDescTd.append(taskDescriptionDom)
    taskPriorityTd.append(taskPriorityDom)
    taskDeadlineTd.append(taskDeadlineDom)
    taskBtnsTd.append(taskDetailBtn)
    taskBtnsTd.append(taskEditBtn)
    taskBtnsTd.append(taskDeleteBtn)

    taskTableRow.append(checkBoxTd)
    taskTableRow.append(taskNameTd)
    taskTableRow.append(taskDescTd)
    taskTableRow.append(taskPriorityTd)
    taskTableRow.append(taskDeadlineTd)
    taskTableRow.append(taskBtnsTd)
    taskTableRow.append(taskBtnsTd)
    taskTableRow.append(taskBtnsTd)

    taskTable.append(taskTableRow)
}

export function appendProject(projectName){
    const projectContainer = document.createElement('li')
    const projectButton = document.createElement('button')

    projectButton.setAttribute('class', 'project-button')
    projectButton.textContent = projectName

    projectContainer.append(projectButton)
    projectSidebar.append(projectContainer)
}