import React, {Component, ReactNode} from 'react';
import ReactDatasheet from 'react-datasheet';
import memoize from 'memoize-one';

import {ExampleCellType} from './store/interfaces';
import {renderValue, rowsToData} from './store/model';

import {HeaderTitle, Sheet} from '../';
import {
  ACTION_CELL,
  HEADER_DRAG_SOURCE,
  HEADER_DROP_TARGET, READ_ONLY_CELL,
  ROW_DROP_TARGET,
} from '../ClassNames';
import {HeaderRendererProps, RowRendererProps, SheetRendererProps} from '../interfaces';

import {DragDropHeaderProvider, DragDropRowProvider} from '../drag-drop';
import {ExampleProps} from './ExampleProps';


export default class DragDropProvidersSheet extends Component<ExampleProps> {

  getData = memoize(rowsToData);

  sheetRenderer = (props: SheetRendererProps<ExampleCellType>) => {
    const {model: {headers, overflow}} = this.props;

    return (
      <Sheet
        {...props}
        headers={headers}
        overflow={overflow}
        headerRenderer={this.headerRenderer}
      />
    );
  }

  headerRenderer = (props: HeaderRendererProps) => {

    const {actions} = this.props;
    const {col, header} = props;

    return (
      <DragDropHeaderProvider col={col} onHeaderDropped={actions.headerDropped}>
        {({connectDragSource, connectDropTarget, isDropOver}) => {

          const className = isDropOver ?
            `${HEADER_DRAG_SOURCE} ${HEADER_DROP_TARGET}`
            : HEADER_DRAG_SOURCE;

          return connectDropTarget(connectDragSource(
            <span title={header.title} className={className}>
              <HeaderTitle {...props} />
            </span>
          ));

        }}
      </DragDropHeaderProvider>
    );
  }

  rowRenderer = (props: RowRendererProps<ExampleCellType>) => {
    const {actions} = this.props;

    return (
      <DragDropRowProvider row={props.row} onRowDropped={actions.rowDropped}>
        {({connectDragSource, connectDragPreview, connectDropTarget, isDropOver}) => {
          const dt = isDropOver ? ROW_DROP_TARGET : '';
          const className = `rdx-row ${dt}`;
          return connectDropTarget(connectDragPreview(
            <tr key={`$row-${props.row}`} className={className}>
              {connectDragSource(
                <td
                  key='$$actionCell'
                  className={`${READ_ONLY_CELL} ${ACTION_CELL}`}
                />
              )}
              {props.children}
            </tr>
          ));
        }}
      </DragDropRowProvider>
    );
  }

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
