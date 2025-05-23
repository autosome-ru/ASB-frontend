import { Directive, ElementRef, HostListener, Input, Renderer2, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
    selector: "[asbElevation]"
})
export class AsbElevationDirective implements OnChanges {

    @Input()
    defaultElevation = 2;

    @Input()
    raisedElevation = 10;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) {
        this.setElevation(this.defaultElevation);
    }

    ngOnChanges(_changes: SimpleChanges) {
        this.setElevation(this.defaultElevation);
    }

    @HostListener("mouseenter")
    onMouseEnter() {
        this.setElevation(this.raisedElevation);
    }

    @HostListener("mouseleave")
    onMouseLeave() {
        this.setElevation(this.defaultElevation);
    }

    setElevation(amount: number) {
        // remove all elevation classes
        const classesToRemove = Array.from(
            (this.element.nativeElement as HTMLElement).classList).filter(
                c => c.startsWith("mat-elevation-z"));
        classesToRemove.forEach((c) => {
            this.renderer.removeClass(this.element.nativeElement, c);
        });

        // add the given elevation class
        const newClass = `mat-elevation-z${amount}`;
        this.renderer.addClass(this.element.nativeElement, newClass);
    }
}
