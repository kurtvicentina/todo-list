import { getAllTask } from "./storeTask"
import { appendTask } from "./domController"

const taskCollection = getAllTask()
export function renderTask() {

    let name
    // let proj 
    let desc
    let deadline
    let prio
        for(const item of taskCollection){
            name = item.taskName
            desc = item.taskDescription
            deadline = item.taskDeadline
            prio = item.taskPriority
        }
        appendTask(name, desc, prio, deadline)
}