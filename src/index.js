import './style.css'
import 'boxicons'

import { openTaskButton } from './app/domController'
import { closeTaskButton } from './app/domController'
import { openProjectButton } from './app/domController'
import { closeProjectButton } from './app/domController'
import { addTaskBtn } from './app/storeTask'
import { addProjectBtn } from './app/storeProject'
import { allProjects } from './app/storeProject'
import { generateProject } from './app/domController'
import { getAllTask } from './app/storeTask'
import { appendTask } from './app/domController'

generateProject()
console.log(allProjects)

