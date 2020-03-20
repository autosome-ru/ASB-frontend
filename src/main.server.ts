import { enableProdMode } from "@angular/core";
import "@angular/localize/init";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from "./app/app.server.module";
export { renderModule, renderModuleFactory } from "@angular/platform-server";
