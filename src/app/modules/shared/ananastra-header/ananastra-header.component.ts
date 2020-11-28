import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'asb-ananastra-header',
  templateUrl: './ananastra-header.component.html',
  styleUrls: ['./ananastra-header.component.less']
})
export class AnanastraHeaderComponent implements OnInit {
    public searchGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private router: Router) { }

    ngOnInit(): void {
        this.searchGroup = this.formBuilder.group({search: ''})
    }

    submit() {
        if (this.searchGroup.value.search) {
            this.router.navigateByUrl(`/ticket/${this.searchGroup.value.search}`)
        }
    }
}
