import { PureComponent, ReactNode } from 'react';
import RDS from 'react-datasheet';
import DefaultAction from './DefaultAction';
import { ActionRendererProps, RowRendererProps } from './interfaces';
export default class Row<T extends RDS.Cell<T, V>, V = string, ARP extends ActionRendererProps<T, V> = ActionRendererProps<T, V>> extends PureComponent<RowRendererProps<T, V, ARP>> {
    static displayName: string;
    static readonly defaultProps: {
        actionRenderer: typeof DefaultAction;
    };
    render(): ReactNode;
}
