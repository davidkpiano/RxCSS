import mapValues from './utils/mapValues';

const unit = {
  px: (o$) => o$.map((values) => {
    if (typeof values === 'number') return `${values}px`;

    return mapValues(values, (value) => `${value}px`);
  }),
}

export default unit;
