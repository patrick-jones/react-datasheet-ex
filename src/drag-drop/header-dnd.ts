import {
  DragSource,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetCollector,
  DragSourceConnector,
  DropTargetSpec,
  DragSourceMonitor,
  DragSourceCollector,
  DragSourceSpec,
} from 'react-dnd';
import {InjectedDragSourceProps, InjectedDropTargetProps, DragDropHeaderProps} from './interfaces';
import {ItemTypes} from './constants';
import {ColumnLocation} from '../interfaces';

/**
 * Specifies which props to inject into your component.
 */
const _sourceCollect: DragSourceCollector<InjectedDragSourceProps> = (
  connect: DragSourceConnector,
  _: DragSourceMonitor
) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
});

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const _sourceSpec: DragSourceSpec<ColumnLocation, ColumnLocation> = {
  beginDrag(props: ColumnLocation): ColumnLocation {
    return {
      col: props.col,
    };
  },
};

const _targetSpec: DropTargetSpec<DragDropHeaderProps> = {
  canDrop(props: DragDropHeaderProps, monitor: DropTargetMonitor): boolean {
    const item = monitor.getItem();
    // return item.row !== props.row;
    return props.col !== item.col;
  },

  drop(props: DragDropHeaderProps, monitor: DropTargetMonitor): void {
    // Obtain the dragged item
    const {col: fromIndex} = monitor.getItem();
    const {col: toIndex} = props;
    props.onHeaderDropped(fromIndex, toIndex);
  },
};

const _targetCollect: DropTargetCollector<InjectedDropTargetProps> = (
  connect: DropTargetConnector,
  monitor: DropTargetMonitor
) => ({
  connectDropTarget: connect.dropTarget(),
  isDropOver: monitor.isOver() && monitor.canDrop(),
});

const HeaderDragSource = DragSource<ColumnLocation>(
  ItemTypes.COLUMN,
  _sourceSpec,
  _sourceCollect
);
const HeaderDropTarget = DropTarget<DragDropHeaderProps>(
  ItemTypes.COLUMN,
  _targetSpec,
  _targetCollect
);

export {
  HeaderDragSource,
  HeaderDropTarget,
};
