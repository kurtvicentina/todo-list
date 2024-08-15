import { allProjects } from "./storeProject"
import { dummyTasks, saveEdit, showTaskEdit, taskDone } from "./storeTask"
import { getTaskDetails } from "./storeTask"
import { findTasksOfProject } from "./storeProject"
import { showAllTasks } from "./storeProject"
import { createHoverEffect } from "./styling"
import { format, formatDate, formatDistance } from "date-fns"

const mainContainer = document.querySelector('.main-content')

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

export const allTaskBtn = document.querySelector('#allTasksBtn')
export const todayProjBtn = document.querySelector('#todayBtn')
export const weekProjBtn = document.querySelector('#weekBtn')
export const monthProjBtn = document.querySelector('#monthBtn')

let allPriorities = []
allPriorities.push('High')
allPriorities.push('Medium')
allPriorities.push('Low')

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
    form.reset()
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

function hasDoneClass(item){
    if(!item.classList.contains('done')){
        return item.classList.add('done')
    }
    return item.classList.remove('done')
}

export function appendTask(name, description, priority, deadline, taskIndex){
    const doneCheckBox = document.createElement('input')
    doneCheckBox.type = 'checkbox'
    doneCheckBox.setAttribute('data-index', taskIndex)
    doneCheckBox.addEventListener('click', () => {
        taskDone(taskIndex)
        let row = document.querySelector(`[data-row = '${taskIndex}']`)
        hasDoneClass(row)
    })
    
    const taskNameDom = document.createElement('p')
    taskNameDom.setAttribute('class', 'task-name')
    taskNameDom.textContent = name

    const taskDescriptionDom = document.createElement('p')
    taskDescriptionDom.setAttribute('class', 'task-description')
    taskDescriptionDom.textContent = description

    const taskPriorityDom = document.createElement('p')
    taskPriorityDom.textContent = priority
    taskPriorityDom.setAttribute('class', `${priority.toLowerCase()}`)
    taskPriorityDom.classList.add('task-priority')

    const taskDeadlineDom = document.createElement('p')
    taskDeadlineDom.setAttribute('class', 'task-deadline')
    taskDeadlineDom.textContent = deadline

    const detailIcon = document.createElement('i')
    detailIcon.setAttribute('class', 'bx bx-merge')
    const detailText = document.createElement('span')
    detailText.textContent = 'Details'
    const taskDetailBtn = document.createElement('button')
    taskDetailBtn.type = 'button'
    taskDetailBtn.append(detailIcon)
    taskDetailBtn.append(detailText)
    taskDetailBtn.setAttribute('class', 'action-button')
    taskDetailBtn.setAttribute('id', 'detail-button')
    taskDetailBtn.addEventListener('click', () => getTaskDetails(taskIndex))

    const editIcon = document.createElement('i')
    editIcon.setAttribute('class', 'bx bxs-edit-alt')
    const editText = document.createElement('span')
    editText.textContent = 'Edit'
    const taskEditBtn = document.createElement('button')
    taskEditBtn.type = 'button'
    taskEditBtn.append(editIcon)
    taskEditBtn.append(editText)
    taskEditBtn.setAttribute('class', 'action-button')
    taskEditBtn.setAttribute('id', 'edit-button')
    taskEditBtn.setAttribute('edit-index', taskIndex)
    taskEditBtn.addEventListener('click', () => showTaskEdit(taskIndex))

    const deleteIcon = document.createElement('i')
    deleteIcon.setAttribute('class', 'bx bxs-trash-alt')
    const deleteText = document.createElement('span')
    deleteText.textContent = 'Delete'
    const taskDeleteBtn = document.createElement('button')
    taskDeleteBtn.type = 'button'
    taskDeleteBtn.append(deleteIcon)
    taskDeleteBtn.append(deleteText)
    taskDeleteBtn.setAttribute('class', 'action-button')
    taskDeleteBtn.setAttribute('id', 'delete-button')
    taskDeleteBtn.addEventListener('click', () => removeTaskFromDom(taskIndex))

    const checkBoxTd = document.createElement('td')
    const taskNameTd = document.createElement('td')
    const taskDescTd = document.createElement('td')
    const taskDeadlineTd = document.createElement('td')
    const taskPriorityTd = document.createElement('td')
    const taskBtnsTd = document.createElement('td')
    taskBtnsTd.setAttribute('class', 'taskButtonContainer')

    const taskTableRow = document.createElement('tr')
    taskTableRow.setAttribute('data-row', taskIndex)

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

export function editTaskFromDom(index, name, desc, prio, deadline) {
    let row = document.querySelector(`[data-row='${index}']`)
    
    let domTaskName = row.querySelector('.task-name')
    let domTaskDescription = row.querySelector('.task-description')
    let domTaskPriority = row.querySelector('.task-priority')
    let domTaskDeadline = row.querySelector('.task-deadline')
    
    domTaskName.textContent = name
    domTaskDescription.textContent = desc
    domTaskPriority.textContent = prio
    domTaskDeadline.textContent = `${format(new Date(deadline), 'MMMM d, yyyy')} | ${formatDistance(new Date(), deadline)}`
}


export function appendProject(projectName){
    const projectContainer = document.createElement('li')
    const projectButton = document.createElement('button')
    const projectIcon = document.createElement('i')
    projectIcon.setAttribute('class', 'bx bxs-cog')

    projectButton.setAttribute('class', 'project-button')
    projectButton.textContent = projectName
    projectButton.addEventListener('click', () => {
        renderProject(projectName)
        clearTable()
        findTasksOfProject(projectName)
    })
    projectContainer.append(projectIcon)
    projectContainer.append(projectButton)
    projectSidebar.append(projectContainer)
    createHoverEffect()
}

export function showTaskDetails(tName, tProjName, tDesc, tDeadline, tPrio){
    const modal = document.createElement('dialog')
    modal.setAttribute('id', 'detail-task-modal')

    const formContainer = document.createElement('div')
    formContainer.setAttribute('class', 'form-container')

    const form = document.createElement('form')
    const taskTitle = document.createElement('h2')
    taskTitle.textContent = 'Task Details'
    form.append(taskTitle)

    const taskNameContainer = document.createElement('div')
    taskNameContainer.setAttribute('class', 'form-input')
    const taskNameLabel = document.createElement('label')
    taskNameLabel.textContent = 'Task Name'
    const taskNameInput = document.createElement('input')
    taskNameInput.type = 'text'
    taskNameInput.value = tName
    taskNameInput.readOnly = true
    taskNameContainer.append(taskNameLabel)
    taskNameContainer.append(taskNameInput)
    form.append(taskNameContainer)

    const taskProjectNameContainer = document.createElement('div')
    taskProjectNameContainer.setAttribute('class', 'form-input')
    const projectNameLabel = document.createElement('label')
    projectNameLabel.textContent = 'Project Name'
    const projectNameInput = document.createElement('input')
    projectNameInput.type = 'select'
    projectNameInput.value = tProjName
    projectNameInput.readOnly = true
    taskProjectNameContainer.append(projectNameLabel)
    taskProjectNameContainer.append(projectNameInput)
    form.append(taskProjectNameContainer)

    const taskDescriptionContainer = document.createElement('div')
    taskDescriptionContainer.setAttribute('class', 'form-input')
    const taskDescriptionLabel = document.createElement('label')
    taskDescriptionLabel.textContent = 'Description'
    const taskDescriptionTextArea = document.createElement('textarea')
    taskDescriptionTextArea.value = tDesc
    taskDescriptionTextArea.readOnly = true
    taskDescriptionContainer.append(taskDescriptionLabel)
    taskDescriptionContainer.append(taskDescriptionTextArea)
    form.append(taskDescriptionContainer)

    const taskDeadlineContainer = document.createElement('div')
    taskDeadlineContainer.setAttribute('class', 'form-input')
    const taskDeadlineLabel = document.createElement('label')
    taskDeadlineLabel.textContent = 'Deadline'
    const taskDeadlineInput = document.createElement('input')
    taskDeadlineInput.type = 'date'
    taskDeadlineInput.value = tDeadline
    taskDeadlineInput.readOnly = true
    taskDeadlineContainer.append(taskDeadlineLabel)
    taskDeadlineContainer.append(taskDeadlineInput)
    form.append(taskDeadlineContainer)

    const taskPriorityContainer = document.createElement('div')
    taskPriorityContainer.setAttribute('class', 'form-input')
    const taskPriorityLabel = document.createElement('label')
    taskPriorityLabel.textContent = 'Priority'
    const taskPriorityInput = document.createElement('input')
    taskPriorityInput.type = 'select'
    taskPriorityInput.value = tPrio
    taskPriorityInput.readOnly = true
    taskPriorityContainer.append(taskPriorityLabel)
    taskPriorityContainer.append(taskPriorityInput)
    form.append(taskPriorityContainer)

    modal.append(formContainer)
    formContainer.append(form)
    document.body.append(modal)
    modal.showModal()
}

export function editTask(tName, tProjName, tDesc, tDeadline, tPrio, taskIndex) {
    const modal = document.createElement('dialog');
    modal.setAttribute('id', 'edit-task-modal');
    
    const formContainer = document.createElement('div')
    formContainer.setAttribute('class', 'form-container')


    const form = document.createElement('form');

    const taskTitle = document.createElement('h2');
    taskTitle.textContent = 'Edit Task';
    form.append(taskTitle);

    const taskNameContainer = document.createElement('div');
    taskNameContainer.setAttribute('class', 'form-input');
    const taskNameLabel = document.createElement('label');
    taskNameLabel.textContent = 'Task Name';
    const taskNameInput = document.createElement('input');
    taskNameInput.type = 'text';
    taskNameInput.name = 'taskName';
    taskNameInput.value = tName;
    taskNameContainer.append(taskNameLabel);
    taskNameContainer.append(taskNameInput);
    form.append(taskNameContainer);

    const taskProjectNameContainer = document.createElement('div');
    taskProjectNameContainer.setAttribute('class', 'form-input');
    const projectNameLabel = document.createElement('label');
    projectNameLabel.textContent = 'Project Name';
    const projectNameInput = document.createElement('select');
    for (const item of allProjects){
        const projOption = document.createElement('option')
        projOption.textContent = item
        projectNameInput.append(projOption)
    }
    projectNameInput.name = 'taskProject';
    projectNameInput.value = tProjName;
    taskProjectNameContainer.append(projectNameLabel);
    taskProjectNameContainer.append(projectNameInput);
    form.append(taskProjectNameContainer);

    const taskDescriptionContainer = document.createElement('div');
    taskDescriptionContainer.setAttribute('class', 'form-input');
    const taskDescriptionLabel = document.createElement('label');
    taskDescriptionLabel.textContent = 'Description';
    const taskDescriptionTextArea = document.createElement('textarea');
    taskDescriptionTextArea.name = 'taskDescription';
    taskDescriptionTextArea.value = tDesc;
    taskDescriptionContainer.append(taskDescriptionLabel);
    taskDescriptionContainer.append(taskDescriptionTextArea);
    form.append(taskDescriptionContainer);

    const taskDeadlineContainer = document.createElement('div');
    taskDeadlineContainer.setAttribute('class', 'form-input');
    const taskDeadlineLabel = document.createElement('label');
    taskDeadlineLabel.textContent = 'Deadline';
    const taskDeadlineInput = document.createElement('input');
    taskDeadlineInput.type = 'date';
    taskDeadlineInput.name = 'taskDeadline';
    taskDeadlineInput.value = tDeadline;
    taskDeadlineContainer.append(taskDeadlineLabel);
    taskDeadlineContainer.append(taskDeadlineInput);
    form.append(taskDeadlineContainer);

    const taskPriorityContainer = document.createElement('div');
    taskPriorityContainer.setAttribute('class', 'form-input');
    const taskPriorityLabel = document.createElement('label');
    taskPriorityLabel.textContent = 'Priority';
    const taskPriorityInput = document.createElement('select');
    for (const item of allPriorities){
        const itemPriority = document.createElement('option')
        itemPriority.textContent = item
        taskPriorityInput.append(itemPriority)
    }
    taskPriorityInput.name = 'taskPriority';
    taskPriorityInput.value = tPrio;
    taskPriorityContainer.append(taskPriorityLabel);
    taskPriorityContainer.append(taskPriorityInput);
    form.append(taskPriorityContainer);

    const editBtnContainer = document.createElement('div');
    editBtnContainer.setAttribute('class', 'form-buttons');
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Save';
    editBtn.type = 'button';
    editBtn.setAttribute('id', 'edit-task-button');
    editBtn.addEventListener('click', () => {
        const newTask = {
            taskName: taskNameInput.value, 
            taskProject: projectNameInput.value, 
            taskDescription: taskDescriptionTextArea.value,
            taskDeadline: taskDeadlineInput.value,
            taskPriority: taskPriorityInput.value,
        };
        saveEdit(taskIndex, newTask);
        modal.close();
    });

    editBtnContainer.append(editBtn);
    form.append(editBtnContainer);
    modal.append(formContainer)
    formContainer.append(form)

    document.body.append(modal);
    modal.showModal();
}

export function removeTaskFromDom(index) {
    let row = document.querySelector(`[data-row = '${index}']`)
        row.remove()
}

export function renderProject(projectName){
    const projectTitle = mainContainer.querySelector('.task-title')
    projectTitle.textContent = projectName
    projectTitle.setAttribute('id', projectName)
}

export function clearTable() {
    const taskTable = document.querySelector('.task-table');
    
    // Select all rows except the first one
    while (taskTable.rows.length > 1) {
        taskTable.deleteRow(1);  // Always delete the second row, as rows[0] is the header
    }
}


allTaskBtn.addEventListener('click', () => {
    renderProject('All')
    clearTable()
    showAllTasks()
})

todayProjBtn.addEventListener('click', () => {
    renderProject('Today')
    clearTable()
    findTasksOfProject('Today')
})
weekProjBtn.addEventListener('click', () => {
    renderProject('Weekly')
    clearTable()
    findTasksOfProject('Weekly')
})
monthProjBtn.addEventListener('click', () => {
    renderProject('Monthly')
    clearTable()
    findTasksOfProject('Monthly')
})

export function isInProjectTable(project){
    const projectTitle = mainContainer.querySelector('.task-title')
    const projectTitleId = projectTitle.getAttribute('id')
    console.log(projectTitleId)
    console.log(project)

    if(project != projectTitleId)return false
    return true
}

