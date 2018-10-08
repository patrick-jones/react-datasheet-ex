import { Component, ReactNode } from 'react';
import { ColumnHeader, HeaderRendererProps } from './interfaces';
export default class HeaderCell<T extends ColumnHeader = ColumnHeader> extends Component<HeaderRendererProps<T>> {
    render(): ReactNode;
}
