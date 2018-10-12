import { Styleable } from '../interfaces';
/**
 * Event callback used by resizable components
 */
export interface ResizeCallback {
    (index: number, requestedSize: number): void;
}
/**
 * Properties required by resizable components
 */
export interface ResizableProps {
    /** The current index */
    readonly index: number;
    /** Event for beginning of resizing */
    readonly onResizeStart?: ResizeCallback;
    /** Event for actively resizing */
    readonly onResizing?: ResizeCallback;
    /** Event when resizing is complete */
    readonly onResizeEnd: ResizeCallback;
    /** Minimum size, in pixels */
    readonly minSize: number;
}
/**
 * Extra properties required specifically by resizable headers
 */
export interface ResizableHeaderProps extends ResizableProps, Styleable {
    /** The tag for the cell itself. Default is `th` */
    cellTag: string;
}
