# RxCSS

RxCSS is a _very_ small library for manipulating [CSS Custom Properties](https://www.w3.org/TR/css-variables/) (aka CSS Variables) with [RxJS Observables](http://reactivex.io/rxjs/).

**More Info**

- :book: Read the slides: http://slides.com/davidkhourshid/reactanim#/
- :movie_camera: Watch the presentation: https://www.youtube.com/watch?v=lTCukb6Zn3g

## Requirements

Make sure [RxJS](https://github.com/ReactiveX/rxjs) is installed and globally available.

## Installation

You can either use RxCSS in an existing project:

```bash
npm install rxcss@latest --save
```

Or you can include it directly in a `<script>` tag:
```html
<script src="https://unpkg.com/@reactivex/rxjs/dist/global/Rx.min.js"></script>
<script src="https://unpkg.com/rxcss@latest/dist/rxcss.min.js"></script>
```

## Usage

```js
const mouse$ = Rx.Observable
  .fromEvent(document, 'mousemove')
  .map(({ clientX, clientY }) => ({
    x: clientX,
    y: clientY
  }));


const style$ = RxCSS({
  mouse: mouse$,
});

// Optional
style$.subscribe(...);
```

```css
:root {
  --mouse-x: 0;
  --mouse-y: 0;
}


.ball {
  transform:
    translateX(calc(var(--mouse-x) * 1px))
    translateY(calc(var(--mouse-y) * 1px));
}
```
