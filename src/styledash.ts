type PropertyValue = string | number;

const parse = (val: any): PropertyValue => {
  return (typeof val === 'boolean')
    ? (!!val ? 1 : 0)
    : val;
};

interface IStyleDash {
  set: (key: string | {}, val?: any) => void;
  get: (key: string) => string;
}

const styledash = (target: HTMLElement = document.documentElement): IStyleDash => ({
  set: (key, val) => {
    if (typeof key === 'object' && val === undefined) {
      return Object.keys(key)
        .forEach((subKey) => styledash(target).set(subKey, key[subKey]));
    }

    if (typeof val === 'object') {
      return Object.keys(val).forEach((subkey) => {
        styledash(target).set(`${key}-${subkey}`, val[subkey]);
      });
    }

    return target.style.setProperty(`--${key}`, parse(val) as string);
  },
  get: (key) => target.style.getPropertyValue(`--${key}`),
});

export default styledash;
