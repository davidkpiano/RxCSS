import RxCSS, { styledash } from '../src/index';
import { assert } from 'chai';
import { Observable } from 'rxjs';

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
        assert.equal(styledash(document.documentElement).get('foo'), 'foo');
        assert.equal(styledash(document.documentElement).get('bar'), 'bar');

        done();
      }
    });
  });
});
