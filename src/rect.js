import Observable from './observable';

export default function rect(node) {
  if (node instanceof Element) {
    const nodeRect = node.getBoundingClientRect();

    return {
      top: nodeRect.top,
      bottom: nodeRect.bottom,
      left: nodeRect.left,
      right: nodeRect.right,
      height: nodeRect.height,
      width: nodeRect.width,
    };
  } else {
    throw new Error(node + ' is not an element.');
  }
}
