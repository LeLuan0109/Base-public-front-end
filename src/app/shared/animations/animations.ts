import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const collapse = (duration: number) =>
  trigger('collapse', [
    state(
      'true',
      style({
        height: '*',
      })
    ),
    state(
      'false',
      style({
        height: '0',
        overflow: 'hidden',
      })
    ),
    transition('true <=> false', animate(duration)),
  ]);

export const collapseMenu = (duration: number) =>
  trigger('collapseMenu', [
    state(
      'true',
      style({
        width: '220px',
      })
    ),
    state(
      'false',
      style({
        width: '70px',
      })
    ),
    transition('true <=> false', animate(duration)),
  ]);

export const collapseContentPost = (duration: number) =>
  trigger('collapse', [
    state(
      'true',
      style({
        overflow: 'visible',
        height: '*',
      })
    ),
    state(
      'false',
      style({
        height: '42px',
        overflow: 'hidden',
        display: '-webkit-box',
        'text-overflow': 'ellipsis',
        '-webkit-line-clamp': '2',
        '-webkit-box-orient': 'vertical',
      })
    ),
    transition('true <=> false', animate(duration)),
  ]);


export const spinDegrees = (duration: number, deg: number) =>
trigger('spin', [
  state(
    'true',
    style({
      transform: `translate(0, -50%) rotate(${deg}deg)`,
    })
  ),
  state(
    'false',
    style({
      transform: 'translate(0, -50%) rotate(0deg)',
    })
  ),
  transition('true <=> false', animate(duration)),
]);
