import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ToListPipe} from "./json-to-list.pipe";


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ToListPipe
  ],
  exports: [
    ToListPipe
  ]
})
export class AsbPipesModule {
}
