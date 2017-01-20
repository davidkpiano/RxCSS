import RxCSS from '../src/index';
import { assert } from 'chai';
import { Observable, Subject } from 'rxjs';

describe('standard usage', () => {
  it('should exist as a function', () => {
    assert.isFunction(RxCSS);
  });

  it('should work with multiple observables in an object', (done) => {
    const expected = [
      { foo: 'foo' },
      { foo: 'foo', bar: 'bar' },
    ];

    const style$ = RxCSS({
      foo: 'foo',
      bar: 'bar',
    }).subscribe((style) => {
      assert.deepEqual(style, expected.shift());

      if (!expected.length) {
        assert.equal(RxCSS.get(document.documentElement, 'foo'), 'foo');
        assert.equal(RxCSS.get(document.documentElement, 'bar'), 'bar');

        done();
      }
    });
  });
});
