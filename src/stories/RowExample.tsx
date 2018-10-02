import React, {Component, ReactNode} from 'react';
import ReactDatasheet from 'react-datasheet';
import memoize from 'memoize-one';

import {Row, Sheet} from '../';

import {ExampleCellType} from './store/interfaces';
import {renderValue, rowsToData} from './store/model';
import {ExampleProps} from './ExampleProps';
import {ActionRendererProps, RowRendererProps, SheetRendererProps} from '../interfaces';


export default class RowExample extends Component<ExampleProps> {

  getData = memoize(rowsToData);

  sheetRenderer = (props: SheetRendererProps<ExampleCellType>) => {
    const {model: {headers, overflow}} = this.props;

    return (
      <Sheet
        headers={headers}
        overflow={overflow}
        {...props}
      />
    );
  }

  rowRenderer = (props: RowRendererProps<ExampleCellType>) => {
    return (
      <Row
        actionRenderer={this.actionRenderer}
        {...props}
      />
    );
  }

  actionRenderer = (props: ActionRendererProps<ExampleCellType>) => {
    const {actions, model} = this.props;
    const {row} = props;
    const {selected} = model.rows[props.row];
    return (
      <input
        type='checkbox'
        checked={selected}
        onClick={() => actions.rowSelectionChanged(row, !selected)}
        onChange={() => 'Be quiet react warning, it is handled in onClick'}
      />
    );
  }

  render(): ReactNode {

    const {actions, model: {rows, selected}} = this.props;

    return (
      <ReactDatasheet
        data={this.getData(rows)}
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
