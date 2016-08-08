import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { TaskListComponent } from './tasks/task-list.component';



@Component({
    selector: 'al-app',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
    pageTitle: string = 'AvantLink Task List'
}