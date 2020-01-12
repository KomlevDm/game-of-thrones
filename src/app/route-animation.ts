import { transition, trigger, query, style, animate, group } from '@angular/animations';

const timings = '0.4s ease-in-out';

export const slideInAnimation = trigger('routeAnimations', [
  transition('rest => *', [
    group([
      query(':leave', [style({ left: 0, transform: 'translateY(-100%)' }), animate(timings, style({ left: '100%' }))], {
        optional: true
      }),
      query(':enter ', [style({ left: '-100%' }), animate(timings, style({ left: 0 }))], {
        optional: true
      })
    ])
  ]),

  transition('main-menu => *', [
    group([
      query(
        ':leave',
        [style({ left: 0, transform: 'translateY(-100%)' }), animate(timings, style({ left: '-100%' }))],
        {
          optional: true
        }
      ),
      query(':enter', [style({ left: '100%' }), animate(timings, style({ left: 0 }))], { optional: true })
    ])
  ])
]);
