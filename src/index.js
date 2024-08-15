import './style.css'
import 'boxicons'

import { generateProject } from './app/domController'
import { createHoverEffect, sideBtns } from './app/styling'
import { renderProject } from './app/domController'
import { clearTable } from './app/domController'
import { showAllTasks } from './app/storeProject'
import { dummyTasks } from './app/storeTask';
import { allTask } from './app/storeTask';

function initialLoad(){
    for( const item of dummyTasks){
        allTask.push(item)
    }
    localStorage.setItem('allTask', JSON.stringify(allTask))
    renderProject('All')
    clearTable()    
    showAllTasks()
    createHoverEffect()
}

generateProject()
initialLoad()
