import { DragDropHeaderProps } from './interfaces';
import { ColumnLocation } from '../interfaces';
declare const HeaderDragSource: <TargetClass extends import("react").ComponentClass<ColumnLocation, any> | import("react").StatelessComponent<ColumnLocation>>(DecoratedComponent: TargetClass) => TargetClass & import("react-dnd/lib/interfaces").DndComponentClass<ColumnLocation>;
declare const HeaderDropTarget: <TargetClass extends import("react").ComponentClass<DragDropHeaderProps, any> | import("react").StatelessComponent<DragDropHeaderProps>>(DecoratedComponent: TargetClass) => TargetClass & import("react-dnd/lib/interfaces").DndComponentClass<DragDropHeaderProps>;
export { HeaderDragSource, HeaderDropTarget, };
