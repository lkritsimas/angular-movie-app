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

export const slideInOut = trigger('slideInOut', [
    transition(':enter', [
        style({ transform: 'scaleX(0)', opacity: 0 }),
        animate('400ms ease', style({ transform: 'scaleX(1)', opacity: 1 }))
    ]),
    transition(':leave', [
        animate('400ms ease', style({ transform: 'scaleX(0)', opacity: 0 }))
    ])
]);
