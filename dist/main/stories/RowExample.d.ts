import { Component, ReactNode } from 'react';
import { ExampleCellType } from './store/interfaces';
import { rowsToData } from './store/model';
import { ExampleProps } from './ExampleProps';
import { ActionRendererProps, RowRendererProps, SheetRendererProps } from '../interfaces';
export default class RowExample extends Component<ExampleProps> {
    getData: typeof rowsToData;
    sheetRenderer: (props: SheetRendererProps<ExampleCellType, string, import("../interfaces").ColumnHeader>) => JSX.Element;
    rowRenderer: (props: RowRendererProps<ExampleCellType, string, ActionRendererProps<ExampleCellType, string>>) => JSX.Element;
    actionRenderer: (props: ActionRendererProps<ExampleCellType, string>) => JSX.Element;
    render(): ReactNode;
}
