// AlerterService is used to display alerts to the user using toastr.js
// (http://codeseven.github.io/toastr/).

import { Injectable } from '@angular/core';

@Injectable()
export class AlerterService {
    
    success(message: string) {
        toastr.success(message);
    }
    
    error(message: string) {
        toastr.error(message);
    }

    constructor() {
        // Set toastr options
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": 300,
            "hideDuration": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 1000,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }
}