import {
    Component,
    HostBinding,
    OnInit,
    ViewEncapsulation
} from "@angular/core";

@Component({
    selector: "asb-app",
    templateUrl: "./asb-app.component.html",
    styleUrls: ["./asb-app.component.less"],
    encapsulation: ViewEncapsulation.None,
})
export class AsbAppComponent implements  OnInit {

    @HostBinding("class.asb-app")
    private cssClass = true;

    constructor( ) {}

    ngOnInit() {
    }
}
