import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export default function rect(node, sampler = Observable.just(null)) {
  return sampler.map(() => node.getBoundingClientRect());
}
