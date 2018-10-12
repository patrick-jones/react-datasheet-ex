import { PureComponent, ReactNode } from 'react';
import { ResizableHeaderProps } from './interfaces';
export default class ResizableHeaderContainer extends PureComponent<ResizableHeaderProps> {
    static defaultProps: {
        cellTag: string;
        minSize: number;
    };
    render(): ReactNode;
}
