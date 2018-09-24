import React, {Component, ReactNode} from 'react';

import {ColumnHeader} from '../interfaces';
import {InjectedDragDropProps, DragDropHeaderRendererProps} from './interfaces';
import DragDropHeaderProvider from './DragDropHeaderProvider';

const baseClassName = 'cell read-only rdr-sheet-renderer__header-cell ' +
  'rdr-sheet-renderer__header-cell--drag-source';

export default class DragDropHeaderRenderer<T extends ColumnHeader = ColumnHeader>
  extends Component<DragDropHeaderRendererProps<T>> {

  renderHeader = (dndProps: InjectedDragDropProps) => {
    const {connectDragSource, connectDropTarget, isDropOver} = dndProps;
    const {header, children} = this.props;

    const dt = isDropOver ? 'rdr-sheet-renderer__header-cell--drop-target' : '';
    const className = `${baseClassName} ${dt}`;

    return connectDropTarget(connectDragSource(
      <th title={header.title} className={className}>
        {children}
      </th>
    ));

  }

  render(): ReactNode {
    const {col, onHeaderDropped} = this.props;

    return (
      <DragDropHeaderProvider col={col} onHeaderDropped={onHeaderDropped}>
        {dndProps => this.renderHeader(dndProps)}
      </DragDropHeaderProvider>
    );
  }
}
