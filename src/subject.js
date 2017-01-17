const Subject = window.Rx
  ? Rx.Subject
  : require('rxjs/Subject').Subject;

export default Subject;
