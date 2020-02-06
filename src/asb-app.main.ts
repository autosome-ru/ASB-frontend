import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { environment } from "./environments/environment";

import "hammerjs";

import { AsbAppModule } from "./app/asb-app.module";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AsbAppModule)
    .catch(err => console.error(err));
