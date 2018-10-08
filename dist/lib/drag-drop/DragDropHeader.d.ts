import React, { Component, ReactNode } from 'react';
import { ColumnHeader } from '../interfaces';
import { InjectedDragDropProps, DragDropHeaderRendererProps } from './interfaces';
export default class DragDropHeader<T extends ColumnHeader = ColumnHeader> extends Component<DragDropHeaderRendererProps<T>> {
    renderHeader: (dndProps: InjectedDragDropProps) => React.ReactElement<any>;
    render(): ReactNode;
}
