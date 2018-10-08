import { Component, ReactNode } from 'react';
import RDS from 'react-datasheet';
import { ColumnHeader, SheetRendererProps } from './interfaces';
import HeaderCell from './HeaderCell';
import HeaderTitle from './HeaderTitle';
/**
 * A custom `sheetRenderer` for `react-datasheet` that renders a sheet
 * with column headers and an leading 'action" cell on each row.
 */
export default class Sheet<T extends RDS.Cell<T, V>, V = string, H extends ColumnHeader = ColumnHeader> extends Component<SheetRendererProps<T, V, H>> {
    static readonly defaultProps: {
        headers: never[];
        headerCellRenderer: typeof HeaderCell;
        headerRenderer: typeof HeaderTitle;
        overflow: string;
    };
    render(): ReactNode;
}
