import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app.component';
import { appRouteProviders } from './app.routes';

// Bootstrap the primary component
bootstrap(AppComponent, [
    appRouteProviders,
    HTTP_PROVIDERS
])
.catch(err => console.error(err));