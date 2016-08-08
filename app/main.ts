import { bootstrap } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { appRouteProviders } from './app.routes';

// Bootstrap the primary component
bootstrap(AppComponent, [
    appRouteProviders
])
    .catch(err => console.error(err));