// AppComponent is the primary application component.

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { TaskService } from './tasks/task.service';


@Component({
    selector: 'al-app',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [TaskService]
})
export class AppComponent {
    pageTitle: string = 'AvantLink Task List'
}