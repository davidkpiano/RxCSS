import Observable from './observable';

export default function rect(node, sampler = Observable.just(null)) {
  return sampler.map(() => node.getBoundingClientRect());
}
