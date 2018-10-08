import { Component, ReactNode } from 'react';
import { HeaderRendererProps, RowRendererProps, SheetRendererProps } from '../interfaces';
import { ExampleCellType, ExampleModel } from './store/interfaces';
import { DispatchedActions, SheetActionCreators } from './store/actions';
import { rowsToData } from './store/model';
export interface Props {
    model: ExampleModel;
    actions: DispatchedActions<SheetActionCreators>;
}
export default class DragDropRenderersSheet extends Component<Props> {
    getData: typeof rowsToData;
    sheetRenderer: (props: SheetRendererProps<ExampleCellType, string, import("../interfaces").ColumnHeader>) => JSX.Element;
    headerRenderer: (props: HeaderRendererProps<import("../interfaces").ColumnHeader>) => JSX.Element;
    rowRenderer: (props: RowRendererProps<ExampleCellType, string, import("../interfaces").ActionRendererProps<ExampleCellType, string>>) => JSX.Element;
    render(): ReactNode;
}
