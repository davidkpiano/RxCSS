import mapValues from './utils/mapValues';

const lerp = (rate) => (value, targetValue) => {
  if (value !== null && (typeof value === 'object' || typeof value === 'array')) {
    return mapValues(value, (subVal, key) => {
      const delta = (targetValue[key] - subVal) * rate;
  
      return subVal + delta;
    });
  }

  const delta = (targetValue - value) * rate;
  
  return value + delta;
}

export default lerp;
