import { trigger, style, transition, animate } from '@angular/animations';

export const animateGrow = trigger('grow', [
    transition('void <=> *', []),
    transition('* <=> *',
        [style({ height: '{{ startHeight }}px', opacity: 0 }),
        animate('.5s ease')], {
        params: { startHeight: 0 }
    })
]);
