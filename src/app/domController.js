import { allProjects } from "./storeProject"
import { saveEdit, showTaskEdit, taskDone } from "./storeTask"
import { getTaskDetails } from "./storeTask"

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

export function appendTask(name, description, priority, deadline, taskIndex){
    const doneCheckBox = document.createElement('input')
    doneCheckBox.type = 'checkbox'
    doneCheckBox.setAttribute('data-index', taskIndex)
    doneCheckBox.addEventListener('click', () => taskDone(taskIndex))
    
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
    taskDetailBtn.textContent = 'Details'
    taskDetailBtn.setAttribute('class', 'action-button')
    taskDetailBtn.setAttribute('id', 'detail-button')
    taskDetailBtn.addEventListener('click', () => getTaskDetails(taskIndex))

    const taskEditBtn = document.createElement('button')
    taskEditBtn.type = 'button'
    taskEditBtn.textContent = 'Edit'
    taskEditBtn.setAttribute('class', 'action-button')
    taskEditBtn.setAttribute('id', 'edit-button')
    taskEditBtn.setAttribute('edit-index', taskIndex)
    taskEditBtn.addEventListener('click', () => showTaskEdit(taskIndex))

    const taskDeleteBtn = document.createElement('button')
    taskDeleteBtn.type = 'button'
    taskDeleteBtn.textContent = 'Delete'
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

export function appendProject(projectName){
    const projectContainer = document.createElement('li')
    const projectButton = document.createElement('button')

    projectButton.setAttribute('class', 'project-button')
    projectButton.textContent = projectName

    projectContainer.append(projectButton)
    projectSidebar.append(projectContainer)
}

export function showTaskDetails(tName, tProjName, tDesc, tDeadline, tPrio){
    const modal = document.createElement('dialog')
    modal.setAttribute('id', 'add-task-modal')
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

    modal.append(form)
    document.body.append(modal)
    modal.showModal()
}

export function editTask(tName, tProjName, tDesc, tDeadline, tPrio, taskIndex) {
    const modal = document.createElement('dialog');
    modal.setAttribute('id', 'edit-task-modal');
    
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
    const projectNameInput = document.createElement('input');
    projectNameInput.type = 'text';
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
    taskDeadlineContainer.getel
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
    const taskPriorityInput = document.createElement('input');
    taskPriorityInput.type = 'text';  // Changed from 'select' to 'text' for simplicity
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

    modal.append(form);
    document.body.append(modal);
    modal.showModal();
}

function removeTaskFromDom(index) {
    let row = document.querySelector(`[data-row = '${index}']`)
        row.remove()
}

// update the dom for every edit
// make sure that the form accepts 'enter' in keyboard