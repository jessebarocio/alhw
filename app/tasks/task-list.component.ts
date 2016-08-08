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
    newTask: Task = new Task();

    constructor(private taskService: TaskService) { }

    getTasks() {
        this.taskService.getTasks()
            .then(tasks => this.tasks = tasks)
            .catch(error => this.error = error);
    }

    createTask() {
        this.taskService.createTask(this.newTask)
            .then(task => {
                this.tasks.push(task)
                this.newTask = new Task();
            })
            .catch(error => this.error = error);
    }

    updateTask(task: Task) {
        this.taskService.updateTask(task)
            .then(updatedTask => {
                var idx = this.tasks.indexOf(task);
                if (idx >= 0) {
                    this.tasks[idx] = updatedTask;
                }
            })
            .catch(error => this.error = error);
    }

    completeTask(task: Task) {
        this.taskService.deleteTask(task.id)
            .then(response => {
                var idx = this.tasks.indexOf(task);
                if (idx >= 0) {
                    this.tasks.splice(idx, 1);
                }
            })
            .catch(error => this.error = error);
    }

    ngOnInit() {
        this.getTasks();
    }
}