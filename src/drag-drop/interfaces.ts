import RDS from 'react-datasheet';
import {ConnectDragPreview, ConnectDragSource, ConnectDropTarget} from 'react-dnd';
import {ColumnHeader, HeaderRendererProps, RowRendererProps} from '../interfaces';

/**
 * Properties that must be provided to a drag and drop enabled row
 */
export interface DragDropRowProps<T extends RDS.Cell<T, V>, V = string> {
  /** The current row index */
  row: number;
  /** Callback for when a row is dropped on another */
  readonly onRowDropped: (source: number, target: number) => void;
}

/**
 * Properties that must be provided to a drag and drop enabled column header
 */
export interface DragDropHeaderProps {
  /** The current column index */
  col: number;
  /** Callback for one header is dropped on another */
  readonly onHeaderDropped: (source: number, target: number) => void;
}

/**
 * Drag source properties that are injected into a drag and drop provider
 */
export interface InjectedDragSourceProps {
  readonly connectDragSource: ConnectDragSource;
  readonly connectDragPreview: ConnectDragPreview;
}

/**
 * Drop target properties that are injected into a drag and drop provider
 */
export interface InjectedDropTargetProps {
  readonly connectDropTarget: ConnectDropTarget;
  readonly isDropOver: boolean;
}

/**
 * Combined drag source and drop target properties that are injected
 * into a drag and drop provider
 */
export interface InjectedDragDropProps extends InjectedDragSourceProps, InjectedDropTargetProps {}

/**
 * Extends `ReactDatasheet.RowRendererProps` to include
 * drag and drop properties
 */
export interface DragDropRowRendererProps<CellType, V = string>
  extends RowRendererProps<CellType, V>,
    DragDropRowProps<CellType, V> {}

/**
 * Extends `HeaderRendererProps` to include drag and drop properties.
 */
export interface DragDropHeaderRendererProps<T extends ColumnHeader = ColumnHeader>
  extends HeaderRendererProps<T>,
    DragDropHeaderProps {}
