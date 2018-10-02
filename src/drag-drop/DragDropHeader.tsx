import React, {Component, ReactNode} from 'react';

import {ColumnHeader} from '../interfaces';
import HeaderTitle from '../HeaderTitle';
import {
  HEADER_DRAG_SOURCE,
  HEADER_DROP_TARGET,
  HEADER_CELL_CONTAINER,
} from '../ClassNames';

import {InjectedDragDropProps, DragDropHeaderRendererProps} from './interfaces';
import DragDropHeaderProvider from './DragDropHeaderProvider';


export default class DragDropHeader<T extends ColumnHeader = ColumnHeader>
  extends Component<DragDropHeaderRendererProps<T>> {

  renderHeader = (dndProps: InjectedDragDropProps) => {
    const {connectDragSource, connectDropTarget, isDropOver} = dndProps;

    const classNames = [
      HEADER_DRAG_SOURCE,
      isDropOver ? HEADER_DROP_TARGET : '',
    ].filter(s => !!s).join(' ');

    return connectDropTarget(connectDragSource(
      <span className={classNames}>
        <HeaderTitle {...this.props} />
      </span>
    ));
  };

  render(): ReactNode {
    const {col, onHeaderDropped} = this.props;

    return (
      <DragDropHeaderProvider col={col} onHeaderDropped={onHeaderDropped}>
        {this.renderHeader}
      </DragDropHeaderProvider>
    );
  }
}
