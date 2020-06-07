import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appClick]'
})
export class ClickDirective {
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onClicked: EventEmitter<any> = new EventEmitter();

    @HostBinding('style.background') public background = '#C0C0C0';

    @HostListener('click', ['$event']) public onClick(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = 'rgb(74, 74, 197)';
        setTimeout(() => {
            this.background = '#C0C0C0';
        }, 200);
    }
}
