import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'asb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

    public searchForm: FormGroup;
    public click: boolean = false;
    public searchOptions$: string[];
    public searchOptionsLoading$: boolean;

    constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
      this.searchForm = this.formBuilder.group({
          searchInput: null,
      });
      this.searchOptions$ = ["one", "two", "three"];
      this.searchOptionsLoading$ = true;

  }
  _changeClick() {
        this.click = !this.click
    }

}
