import {ColumnHeader, Overflow} from './interfaces';

const DefaultProps = {
  overflow: 'clip',
  align: 'center',
  className: '',
};

export default function headerDefaults<T extends ColumnHeader = ColumnHeader>(
  props: T, ...rest: Partial<ColumnHeader>[]): T {

  const undefOmitted = rest.map(obj => {
    const copy = {...obj};
    Object.keys(obj).forEach((key: keyof ColumnHeader) => {
      if (typeof obj[key] === 'undefined') {
        delete copy[key];
      }
    });

    return copy;
  });

  return Object.assign(
    {},
    DefaultProps,
    ...undefOmitted,
    props
  );
}
