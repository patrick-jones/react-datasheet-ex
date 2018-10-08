import { Component, ReactNode } from 'react';
import { ExampleCellType } from './store/interfaces';
import { rowsToData } from './store/model';
import { HeaderRendererProps, RowRendererProps, SheetRendererProps } from '../interfaces';
import { ExampleProps } from './ExampleProps';
export default class DragDropProvidersSheet extends Component<ExampleProps> {
    getData: typeof rowsToData;
    sheetRenderer: (props: SheetRendererProps<ExampleCellType, string, import("../interfaces").ColumnHeader>) => JSX.Element;
    headerRenderer: (props: HeaderRendererProps<import("../interfaces").ColumnHeader>) => JSX.Element;
    rowRenderer: (props: RowRendererProps<ExampleCellType, string, import("../interfaces").ActionRendererProps<ExampleCellType, string>>) => JSX.Element;
    render(): ReactNode;
}
