import React, {Component} from 'react';

import {InjectedDragDropProps, DragDropRowRendererProps} from './interfaces';
import DragDropRowProvider from './DragDropRowProvider';
import DefaultActionContentRenderer from '../DefaultActionContentRenderer';

const actionCellClassName = 'cell read-only rdr-sheet-renderer__action-cell ' +
  'rdr-sheet-renderer__action-cell--drag-source';

export default class DragDropRowRenderer<CellType, V = string>
  extends Component<DragDropRowRendererProps<CellType, V>> {

  static readonly defaultProps = {
    actionContentRenderer: DefaultActionContentRenderer,
  };

  renderRow = (dndProps: InjectedDragDropProps) => {
    const {connectDragSource, connectDragPreview, connectDropTarget, isDropOver} = dndProps;
    const {row, children, actionContentRenderer} = this.props;
    const ContentRenderer = actionContentRenderer || DefaultActionContentRenderer;

    const dt = isDropOver ? 'rdr-sheet-renderer__row--drop-target' : '';
    const className = `rdr-sheet-renderer__row ${dt}`;
    return connectDropTarget(connectDragPreview(
      <tr key={`$row-${row}`} className={className}>
        {connectDragSource(
          <td key='$$actionCell' className={actionCellClassName}>
            <ContentRenderer row={row} />
          </td>
        )}
        {children}
      </tr>
    ));

  }

  render() {
    const {row, onRowDropped} = this.props;

    return (
      <DragDropRowProvider row={row} onRowDropped={onRowDropped}>
        {this.renderRow}
      </DragDropRowProvider>
    );
  }
}
