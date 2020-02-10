import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'not-found-app',
    template: `<div><h3>Page not found sry :((</h3></div>`,
    styles: [`.app-not-found`],
})
export class PageNotFoundComponent implements OnInit {
    constructor(private route: ActivatedRoute,
                private titleService: Title) {}
    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title);
    }
}
