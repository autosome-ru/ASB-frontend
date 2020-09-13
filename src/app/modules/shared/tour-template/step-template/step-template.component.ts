import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input, TemplateRef,
    ViewChild
} from "@angular/core";


@Component({
    selector: "asb-step-template",
    templateUrl: "./step-template.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepTemplateComponent {

    @ViewChild('template')
    public template: TemplateRef<any>

    @HostBinding("class.asb-popover")
    private cssClass = true;

    @Input()
    public text: string;


    constructor() { }


}
