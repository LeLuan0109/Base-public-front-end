import { Directive, ElementRef, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[changeOnBlur]'
})
export class ChangeOnBlurDirective {

    @Output() changeOnBlur: EventEmitter<any> = new EventEmitter();

    oldValue: any;

    constructor(private el: ElementRef) {
    }

    @HostListener("focus", ["$event.target.value"])
    onFocus(value: any) {
        this.oldValue = value;
    }


    @HostListener("keyup.enter", ["$event.target.value"])
    onEnter(value: any) {
        if (this.oldValue !== value) {
            this.oldValue = value;
            this.changeOnBlur.emit(value);
        }
    }


    @HostListener("blur", ["$event.target.value"])
    onBlur(value: any) {
        if (this.oldValue !== value) {
            this.changeOnBlur.emit(value);
        }
    }
}