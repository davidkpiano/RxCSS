const Observable = window.Rx
  ? Rx.Observable
  : require('rxjs/Observable').Observable;

import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';

export default Observable;
