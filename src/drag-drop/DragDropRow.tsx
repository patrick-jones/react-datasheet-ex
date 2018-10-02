import React, {Component} from 'react';

import {ClassNames} from '../';
import DefaultAction from '../DefaultAction';

import {InjectedDragDropProps, DragDropRowRendererProps} from './interfaces';
import DragDropRowProvider from './DragDropRowProvider';
import {ActionRendererProps} from '../interfaces';
import RDS from 'react-datasheet';


const cellClasses = [
  ClassNames.READ_ONLY_CELL,
  ClassNames.ACTION_CELL,
  ClassNames.ROW_DRAG_SOURCE,
].join(' ');


const rowClass = ClassNames.ROW;
const dtClass = [ClassNames.ROW, ClassNames.ROW_DROP_TARGET].join(' ');


export default class DragDropRow<
  CellType extends RDS.Cell<CellType, V>, V = string,
  ARP extends ActionRendererProps<CellType, V> = ActionRendererProps<CellType, V>
>
  extends Component<DragDropRowRendererProps<CellType, V, ARP>> {

  static readonly defaultProps = {
    actionRenderer: DefaultAction,
  };

  renderRow = (dndProps: InjectedDragDropProps) => {
    const {connectDragSource, connectDragPreview, connectDropTarget, isDropOver} = dndProps;
    const {id, row, children, actionRenderer: ActionRenderer, ...rest} = this.props;

    return connectDropTarget(connectDragPreview(
      <tr key={`$row-${id || row}`} className={isDropOver ? dtClass : rowClass}>
        {connectDragSource(
          <td key='$$actionCell' className={cellClasses}>
            <ActionRenderer id={id} row={row} {...rest} />
          </td>
        )}
        {children}
      </tr>
    ));
  };

  render() {
    const {row, onRowDropped} = this.props;

    return (
      <DragDropRowProvider row={row} onRowDropped={onRowDropped}>
        {this.renderRow}
      </DragDropRowProvider>
    );
  }
}
