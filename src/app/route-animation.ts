import { transition, trigger, query, style, animate } from '@angular/animations';

const animationTimeout = '.1s';

export const routeAnimation = trigger('routeAnimation', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    query(':leave', [style({ opacity: 1 }), animate(animationTimeout, style({ opacity: 0 }))], { optional: true }),
    query(':enter', [style({ opacity: 0 }), animate(animationTimeout, style({ opacity: 1 }))], { optional: true }),
  ]),
]);
