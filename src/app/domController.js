export const openTaskButton = document.querySelector('#open-task-button')
export const closeTaskButton = document.querySelector('#close-task-button')
const taskModal = document.querySelector('#add-task-modal')

export const openProjectButton = document.querySelector('#open-project-button')
export const closeProjectButton = document.querySelector('#close-project-button')
const projectModal = document.querySelector('#add-project-modal')

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