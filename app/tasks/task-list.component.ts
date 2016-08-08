// TaskListComponent handles all CRUD logic for tasks.

import { Component, OnInit } from '@angular/core';

import { AlerterService } from '../shared/alerter.service';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
    selector: 'al-tasks',
    templateUrl: 'app/tasks/task-list.component.html',
})
export class TaskListComponent implements OnInit {
    // The task list.
    tasks: Task[];
    // Stores any errors.
    error: any;
    // An empty placeholder task.
    newTask: Task = new Task();

    constructor(private taskService: TaskService,
        private alerter: AlerterService) { }

    getTasks() {
        // Retrieve all tasks from the service.
        this.taskService.getTasks()
            .then(tasks => this.tasks = tasks)
            .catch(error => this.error = error);
    }

    createTask() {
        // Create a new task and add to the bottom of the list.
        this.taskService.createTask(this.newTask)
            .then(task => {
                this.tasks.push(task)
                this.newTask = new Task();
                this.alerter.success('Task created successfully!');
            })
            .catch(error => {
                this.alerter.error('Unable to create task.');
                console.error(error);
            });
    }

    updateTask(task: Task) {
        // Update the task. Replace the task in the array with the item 
        // returned from the service.
        this.taskService.updateTask(task)
            .then(updatedTask => {
                var idx = this.tasks.indexOf(task);
                if (idx >= 0) {
                    this.tasks[idx] = updatedTask;
                    this.alerter.success('Task updated successfully!');
                }
            })
            .catch(error => {
                this.alerter.error('Unable to update task.');
                console.error(error);
            });
    }

    completeTask(task: Task) {
        // Mark a task complete (delete it). If the service returns success
        // then remove the item from the task list and shift other items up.
        this.taskService.deleteTask(task.id)
            .then(response => {
                var idx = this.tasks.indexOf(task);
                if (idx >= 0) {
                    this.tasks.splice(idx, 1);
                    this.alerter.success('Task completed successfully!');
                }
            })
            .catch(error => {
                this.alerter.error('Unable to complete task.');
                console.error(error);
            });
    }

    ngOnInit() {
        this.getTasks();
    }
}