import { trigger, style, transition, animate, state } from '@angular/animations';

export const animateGrow = trigger('grow', [
    state('true', style({
        height: '*'
    })),
    state('false', style({
        height: `{{maxHeight}}px`
    }), { params: { maxHeight: 0 } }),
    transition('true => false', animate('400ms ease-in-out')),
    transition('false => true', animate('400ms ease-in-out'))
]);
