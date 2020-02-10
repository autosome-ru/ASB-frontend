import {
    Component,
    HostBinding,
    OnInit,
    ViewEncapsulation
} from "@angular/core";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent  implements  OnInit {
    @HostBinding("class.asb-app")
    private cssClass = true;

    constructor() {}

    ngOnInit() {
    }

}
