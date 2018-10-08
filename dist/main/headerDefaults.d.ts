import { ColumnHeader } from './interfaces';
export default function headerDefaults<T extends ColumnHeader = ColumnHeader>(props: T, ...rest: Partial<ColumnHeader>[]): T;
