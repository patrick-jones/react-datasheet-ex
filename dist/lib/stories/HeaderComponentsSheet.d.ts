import { Component, ReactNode } from 'react';
import { ExampleCellType, ExampleHeader, ExampleModel, ExampleRow } from './store/interfaces';
import { DispatchedActions, SheetActionCreators } from './store/actions';
import { HeaderRendererProps, RowRendererProps, SheetRendererProps } from '../interfaces';
export interface Props {
    model: ExampleModel;
    actions: DispatchedActions<SheetActionCreators>;
}
export default class HeaderComponentsSheet extends Component<Props> {
    getHeaders: (headers: ExampleHeader[]) => ExampleHeader[];
    getHidden: (headers: ExampleHeader[]) => ExampleHeader[];
    getData: (rows: ExampleRow[], headers: ExampleHeader[]) => ExampleCellType[][];
    sheetRenderer: (props: SheetRendererProps<ExampleCellType, string, import("../interfaces").ColumnHeader>) => JSX.Element;
    headerRenderer: (props: HeaderRendererProps<ExampleHeader>) => JSX.Element;
    rowRenderer: (props: RowRendererProps<ExampleCellType, string, import("../interfaces").ActionRendererProps<ExampleCellType, string>>) => JSX.Element;
    render(): ReactNode;
}
