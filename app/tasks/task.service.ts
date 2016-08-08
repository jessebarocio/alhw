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

    getTasks(): Promise<Task[]> {
        return this.http.get(this.tasksEndpoint, { headers: this.headers })
            .toPromise()
            .then(response => response.json().data as Task[])
            .catch(this.handleError);
    }
    
    getTask(id: number): Promise<Task> {
        return this.http.get(this.tasksEndpoint + '/' + id, { headers: this.headers })
            .toPromise()
            .then(response => response.json().data as Task)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}