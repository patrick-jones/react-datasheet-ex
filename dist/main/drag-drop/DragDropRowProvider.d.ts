import { Component, ReactNode } from 'react';
import { InjectedDragDropProps, DragDropRowProps } from './interfaces';
/**
 * Required properties for `DragDropRowProvider`
 */
export interface DragDropRowProviderProps<CellType, V = string> extends DragDropRowProps<CellType, V>, InjectedDragDropProps {
    children: (props: InjectedDragDropProps) => ReactNode;
}
declare class DragDropRow<CellType, V = string> extends Component<DragDropRowProviderProps<CellType, V>> {
    render(): ReactNode;
}
/**
 * Provides all drag-and-drop properties to a render function assigned to the
 * `children` property.
 */
declare const DragDropRowProvider: typeof DragDropRow & import("react-dnd/lib/interfaces").DndComponentClass<import("../interfaces").RowLocation> & import("react-dnd/lib/interfaces").DndComponentClass<DragDropRowProps<any, string>>;
export default DragDropRowProvider;
