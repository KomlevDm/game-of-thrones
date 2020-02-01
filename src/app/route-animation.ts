import { transition, trigger, query, style, animate, group } from '@angular/animations';

const timings = '0.4s ease-in-out';

const leftToRight = group([
  query(':leave', [style({ left: 0, transform: 'translateY(-100%)' }), animate(timings, style({ left: '100%' }))], {
    optional: true
  }),
  query(':enter ', [style({ left: '-100%' }), animate(timings, style({ left: 0 }))], {
    optional: true
  })
]);

const rightToLeft = group([
  query(':leave', [style({ left: 0, transform: 'translateY(-100%)' }), animate(timings, style({ left: '-100%' }))], {
    optional: true
  }),
  query(':enter', [style({ left: '100%' }), animate(timings, style({ left: 0 }))], { optional: true })
]);

export const slideInAnimation = trigger('routeAnimations', [
  transition('main-menu => *', [rightToLeft]),
  transition('rest => main-menu', [leftToRight]),
  transition('rest => game', [rightToLeft]),
  transition('game => *', [leftToRight])
]);
