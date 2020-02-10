import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'asb-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less']
})
export class SearchPageComponent implements OnInit {

    public filter: string = "";

    constructor(private route: ActivatedRoute,
                private titleService: Title) {}
    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title);
        this.filter = this.route.snapshot.paramMap.get("id");
  }

}
