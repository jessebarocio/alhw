import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Task } from './task'

@Injectable()
export class TaskService {
    private tasksEndpoint = 'http://homework.avantlink.com/tasks';
    private headers = new Headers({
        "Application-ID": "29fc20cc-5c3c-11e6-9168-0a5449992ecf"
    });

    constructor(private http: Http) { }
    
    createTask(task: Task): Promise<Task> {
        return this.http.post(this.tasksEndpoint, task, { headers: this.headers })
            .toPromise()
            .then(response => {
                var taskData = (<TaskData>response.json().data);
                return {
                    id: taskData.task_id,
                    name: taskData.task_name
                };
            })
            .catch(this.handleError);
    }

    getTasks(): Promise<Task[]> {
        return this.http.get(this.tasksEndpoint, { headers: this.headers })
            .toPromise()
            .then(response => {
                return (<TaskData[]>response.json().data).map(t => {
                    return {
                        id: t.task_id,
                        name: t.task_name
                    };
                })
            })
            .catch(this.handleError);
    }

    getTask(id: number): Promise<Task> {
        return this.http.get(this.tasksEndpoint + '/' + id, { headers: this.headers })
            .toPromise()
            .then(response => {
                var taskData = (<TaskData>response.json().data);
                return {
                    id: taskData.task_id,
                    name: taskData.task_name
                };
            })
            .catch(this.handleError);
    }

    updateTask(task: Task): Promise<Task> {
        var url = this.tasksEndpoint + '/' + task.id;
        return this.http.put(url, task, { headers: this.headers })
            .toPromise()
            .then(response => {
                var taskData = (<TaskData>response.json().data);
                return {
                    id: taskData.task_id,
                    name: taskData.task_name
                };
            })
            .catch(this.handleError);
    }

    deleteTask(id: number) {
        var url = this.tasksEndpoint + '/' + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .catch(this.handleError);
    }
    
    saveTask(task: Task): Promise<Task> {
        if(!task.id) {
            return this.createTask(task);
        } else {
            return this.updateTask(task);
        }
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