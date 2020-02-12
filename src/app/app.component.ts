import {
    Component,
    HostBinding,
    OnInit,
    ViewEncapsulation
} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent  implements  OnInit {
    @HostBinding("class.asb-app")
    private cssClass = true;

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

}
