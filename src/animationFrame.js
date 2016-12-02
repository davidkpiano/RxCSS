import { Observable } from 'rxjs';

const requestAnimationFrame = window.requestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.msRequestAnimationFrame;

export function createAnimationFrameTicker() {
  return Observable.create((observer) => {
    let active = true;
    let lastTick = Date.now();
    let currentTick = Date.now();

    const dispatch = () => {
      const delta = Date.now() - lastTick;

      observer.next(delta);

      if (active) requestAnimationFrame(dispatch);
    }

    dispatch();

    return () => active = false;
  });
}

export default createAnimationFrameTicker();
