import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
    selector: "asb-browse",
    templateUrl: "./browse-page.component.html",
    styleUrls: ["./browse-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowsePageComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private titleService: Title) {}
    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title);
    }

}
