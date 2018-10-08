import React, { Component } from 'react';
import DefaultAction from '../DefaultAction';
import { InjectedDragDropProps, DragDropRowRendererProps } from './interfaces';
import { ActionRendererProps } from '../interfaces';
import RDS from 'react-datasheet';
export default class DragDropRow<CellType extends RDS.Cell<CellType, V>, V = string, ARP extends ActionRendererProps<CellType, V> = ActionRendererProps<CellType, V>> extends Component<DragDropRowRendererProps<CellType, V, ARP>> {
    static readonly defaultProps: {
        actionRenderer: typeof DefaultAction;
    };
    renderRow: (dndProps: InjectedDragDropProps) => React.ReactElement<any>;
    render(): JSX.Element;
}
