import { Observable } from 'rxjs/Rx';

const animationFrame$ = Observable.create((observer) => {
  let active = true;

  const dispatch = () => {
    observer.onNext(null);
    
    if (active) requestAnimationFrame(dispatch);
  }
  
  dispatch();

  return () => active = false;
});

export default animationFrame$;
