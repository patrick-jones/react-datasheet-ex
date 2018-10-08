import React, { ReactNode } from 'react';
import { ColumnHeader, HeaderRendererProps } from './interfaces';
interface HeaderTitleProps<T extends ColumnHeader = ColumnHeader> extends HeaderRendererProps<T> {
}
/**
 * A simple header content renderer that displays the header's `title` property.
 */
export default class HeaderTitle<T extends ColumnHeader = ColumnHeader> extends React.Component<HeaderTitleProps<T>> {
    static defaultProps: {
        className: string;
    };
    render(): ReactNode;
}
export {};
