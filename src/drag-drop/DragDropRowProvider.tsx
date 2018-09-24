import {Component, ReactNode} from 'react';

import { RowDragSource, RowDropTarget } from './row-dnd';
import { InjectedDragDropProps, DragDropRowProps } from './interfaces';


/**
 * Required properties for `DragDropRowProvider`
 */
export interface DragDropRowProviderProps<CellType, V = string>
  extends DragDropRowProps<CellType, V>, InjectedDragDropProps {
  children: (props: InjectedDragDropProps) => ReactNode;
}


class DragDropRow<CellType, V = string>
  extends Component<DragDropRowProviderProps<CellType, V>> {

  render(): ReactNode {
    const {children, ...rest} = this.props;
    return children(rest);
  }
}

/**
 * Provides all drag-and-drop properties to a render function assigned to the
 * `children` property.
 */
const DragDropRowProvider = RowDropTarget(RowDragSource(DragDropRow));

export default DragDropRowProvider;
