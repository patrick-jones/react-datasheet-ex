import { PureComponent, ReactNode } from 'react';
import { ColumnHeader, HeaderRendererProps } from './interfaces';
export default class HeaderCell<T extends ColumnHeader = ColumnHeader> extends PureComponent<HeaderRendererProps<T>> {
    render(): ReactNode;
}
