// TaskService handles communication with the tasks API.

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Task } from './task'

@Injectable()
export class TaskService {
    // The API endpoint for tasks
    private tasksEndpoint = 'http://homework.avantlink.com/tasks';
    // Default request options (used on every request).
    private requestOptions = {
        headers: new Headers({
            "Application-ID": "29fc20cc-5c3c-11e6-9168-0a5449992ecf"
        })
    }

    constructor(private http: Http) { }

    createTask(task: Task): Promise<Task> {
        return this.http.post(this.tasksEndpoint, task, this.requestOptions)
            .toPromise()
            .then(this.getTaskFromResponse)
            .catch(this.handleError);
    }

    

    getTasks(): Promise<Task[]> {
        return this.http.get(this.tasksEndpoint, this.requestOptions)
            .toPromise()
            .then(this.getTasksFromResponse)
            .catch(this.handleError);
    }

    getTask(id: number): Promise<Task> {
        var url = `${this.tasksEndpoint}/${id}`;
        return this.http.get(url, this.requestOptions)
            .toPromise()
            .then(this.getTaskFromResponse)
            .catch(this.handleError);
    }

    updateTask(task: Task): Promise<Task> {
        var url = `${this.tasksEndpoint}/${task.id}`;
        return this.http.put(url, task, this.requestOptions)
            .toPromise()
            .then(this.getTaskFromResponse)
            .catch(this.handleError);
    }

    deleteTask(id: number) {
        var url = `${this.tasksEndpoint}/${id}`;
        return this.http.delete(url, this.requestOptions)
            .toPromise()
            .catch(this.handleError);
    }

    saveTask(task: Task): Promise<Task> {
        if (!task.id) { // If id is undefined then this is a new task.
            return this.createTask(task);
        } else { // Otherwise update the existing one.
            return this.updateTask(task);
        }
    }
    
    private getTaskFromResponse(response: Response): Task {
        // Map the JSON result from the API to our client side Task model.
        var taskData = (<TaskData>response.json().data);
        return {
            id: taskData.task_id,
            name: taskData.task_name
        }
    }

    private getTasksFromResponse(response: Response): Task[] {
        // Map the JSON result from the API to an array of our client side 
        // Task model.
        return (<TaskData[]>response.json().data).map(t => {
            return {
                id: t.task_id,
                name: t.task_name
            };
        });
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

interface TaskData {
    task_id: number;
    task_name: string;
}