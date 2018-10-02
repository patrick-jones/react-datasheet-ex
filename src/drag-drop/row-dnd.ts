import ReactDataSheet from 'react-datasheet';
import {
  DragSource,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceCollector,
  DragSourceSpec,
  DropTargetSpec,
  DropTargetCollector,
} from 'react-dnd';
import {ItemTypes} from './constants';
import {InjectedDragSourceProps, InjectedDropTargetProps, DragDropRowProps} from './interfaces';
import {RowLocation} from '../interfaces';

const sourceCollect: DragSourceCollector<InjectedDragSourceProps> = (
  connect: DragSourceConnector,
  _: DragSourceMonitor
) => {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  };
};

const sourceSpec: DragSourceSpec<ReactDataSheet.RowRendererProps<any>, RowLocation> = {
  beginDrag(props: ReactDataSheet.RowRendererProps<any>): RowLocation {
    return {
      row: props.row,
    };
  },
};

const targetSpec: DropTargetSpec<DragDropRowProps<any>> = {
  canDrop(props: DragDropRowProps<any>, monitor: DropTargetMonitor): boolean {
    const item = monitor.getItem();
    // return item.row !== props.row;
    return props.row !== item.row;
  },

  drop(props: DragDropRowProps<any>, monitor: DropTargetMonitor): void {
    // Obtain the dragged item
    const {row: sourceIndex} = monitor.getItem();
    const {row: targetIndex, onRowDropped} = props;
    onRowDropped(sourceIndex, targetIndex);
  },
};

const targetCollect: DropTargetCollector<InjectedDropTargetProps> = (
  connect: DropTargetConnector,
  monitor: DropTargetMonitor
) => ({
  connectDropTarget: connect.dropTarget(),
  isDropOver: monitor.isOver() && monitor.canDrop(),
});

const RowDragSource =
  DragSource<RowLocation, InjectedDragSourceProps, RowLocation>(
    ItemTypes.ROW, sourceSpec, sourceCollect);

const RowDropTarget = DropTarget<DragDropRowProps<any>, InjectedDropTargetProps>(
  ItemTypes.ROW,
  targetSpec,
  targetCollect
);

export {RowDragSource, RowDropTarget};
