import { Component, OnInit } from '@angular/core';

import { Task } from './task';
import { TaskService } from './task.service';

@Component({
    selector: 'al-tasks',
    templateUrl: 'app/tasks/task-list.component.html',
})
export class TaskListComponent implements OnInit {
    tasks: Task[];
    error: any;
    
    constructor(private taskService: TaskService) { }
    
    getTasks() {
        this.taskService.getTasks()
            .then(tasks => this.tasks = tasks)
            .catch(error => this.error = error);
    }
    
    ngOnInit() {
        this.getTasks();
    }   
}