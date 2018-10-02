import React, {Component, ReactNode} from 'react';
import ReactDatasheet from 'react-datasheet';
import memoize from 'memoize-one';

import Sheet from '../Sheet';
import {HeaderRendererProps, RowRendererProps, SheetRendererProps} from '../interfaces';

import DragDropHeader from '../drag-drop/DragDropHeader';
import DragDropRow from '../drag-drop/DragDropRow';
import {ExampleCellType, ExampleModel} from './store/interfaces';
import {DispatchedActions, SheetActionCreators} from './store/actions';
import {renderValue, rowsToData} from './store/model';


export interface Props {
  model: ExampleModel;
  actions: DispatchedActions<SheetActionCreators>;
}


export default class DragDropRenderersSheet extends Component<Props> {

  getData = memoize(rowsToData);

  sheetRenderer = (props: SheetRendererProps<ExampleCellType>) => {
    const {model: {headers, overflow}} = this.props;

    return (
      <Sheet
        {...props}
        overflow={overflow}
        headers={headers}
        headerRenderer={this.headerRenderer}
      />
    );
  };

  headerRenderer = (props: HeaderRendererProps) => (
    <DragDropHeader onHeaderDropped={this.props.actions.headerDropped} {...props} />
  );

  rowRenderer = (props: RowRendererProps<ExampleCellType>) => {
    const {actions} = this.props;

    return (
      <DragDropRow onRowDropped={actions.rowDropped} {...props} />
    );
  };

  render(): ReactNode {

    const {actions, model: {rows, selected}} = this.props;
    const data = this.getData(rows);

    return (
      <ReactDatasheet
        data={data}
        sheetRenderer={this.sheetRenderer}
        rowRenderer={this.rowRenderer}
        valueRenderer={renderValue}
        onCellsChanged={actions.cellsChanged}
        onSelect={actions.selectionChanged}
        selected={selected}
      />
    );
  }
}
