import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
    selector: "asb-help-page",
    templateUrl: "./help-page.component.html",
    styleUrls: ["./help-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpPageComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle(this.route.snapshot.data.title);
    }

}
