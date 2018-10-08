import { Component, ReactNode } from 'react';
import { InjectedDragDropProps, DragDropHeaderProps } from './interfaces';
export interface DragDropHeaderProviderProps extends DragDropHeaderProps, InjectedDragDropProps {
    children: (props: InjectedDragDropProps) => ReactNode;
}
declare class DragDropHeader extends Component<DragDropHeaderProviderProps> {
    render(): ReactNode;
}
/**
 * Provides all drag-and-drop properties to a render function assigned to the
 * `children` property.
 */
declare const DragDropHeaderProvider: typeof DragDropHeader & import("react-dnd/lib/interfaces").DndComponentClass<import("../interfaces").ColumnLocation> & import("react-dnd/lib/interfaces").DndComponentClass<DragDropHeaderProps>;
export default DragDropHeaderProvider;
