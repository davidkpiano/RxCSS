import { Observable } from 'rxjs/Rx';

export default function rect(node, sampler = Observable.just(null)) {
  return sampler.map(() => node.getBoundingClientRect());
}
