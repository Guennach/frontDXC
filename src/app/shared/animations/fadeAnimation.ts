import {
  trigger,
  animate,
  transition,
  group,
  style,
  query
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    // Initial state of new route
    query(':enter',
      style({
        position: 'fixed',
        width: '100%',
        transform: 'translateY(100%)'
      }),
      {optional: true}),
    // move page off screen right on leave
    query(':leave',
      animate('0ms ease',
        style({
          position: 'fixed',
          width: '100%',
          opacity: 0,
          transform: 'translateY(-100%)'
        })
      ),
      {optional: true}),
    // move page in screen from left to right
    query(':enter',
      animate('300ms ease',
        style({
          opacity: 1,
          transform: 'translateY(0%)'
        })
      ),
      {optional: true}),
  ])
]);
