import { PureComponent, ReactNode } from 'react';
import { ResizableHeaderProps } from './interfaces';
import { ColumnHeader, HeaderRendererProps } from '../interfaces';
export interface ResizableHeaderRendererProps<T extends ColumnHeader = ColumnHeader> extends ResizableHeaderProps, HeaderRendererProps<T> {
}
export default class ResizableHeader extends PureComponent<ResizableHeaderRendererProps> {
    static defaultProps: {
        cellTag: string;
        minSize: number;
    };
    render(): ReactNode;
}
