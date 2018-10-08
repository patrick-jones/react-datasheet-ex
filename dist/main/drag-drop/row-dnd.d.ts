import { DragDropRowProps } from './interfaces';
import { RowLocation } from '../interfaces';
declare const RowDragSource: <TargetClass extends import("react").ComponentClass<RowLocation, any> | import("react").StatelessComponent<RowLocation>>(DecoratedComponent: TargetClass) => TargetClass & import("react-dnd/lib/interfaces").DndComponentClass<RowLocation>;
declare const RowDropTarget: <TargetClass extends import("react").ComponentClass<DragDropRowProps<any, string>, any> | import("react").StatelessComponent<DragDropRowProps<any, string>>>(DecoratedComponent: TargetClass) => TargetClass & import("react-dnd/lib/interfaces").DndComponentClass<DragDropRowProps<any, string>>;
export { RowDragSource, RowDropTarget };
