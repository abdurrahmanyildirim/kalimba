import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appClick]'
})
export class ClickDirective {
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onClicked: EventEmitter<any> = new EventEmitter();

    @HostBinding('style.background') public background = '';

    @HostListener('click', ['$event']) public onClick(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#ccc';
        setTimeout(() => {
            this.background = '';
        }, 200);
    }
}
