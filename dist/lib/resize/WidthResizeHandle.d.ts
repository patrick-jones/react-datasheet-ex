import React, { PureComponent, ReactNode } from 'react';
import { ResizableHeaderProps } from './interfaces';
declare const initialState: {
    initialOffset: number;
};
export default class WidthResizeHandle extends PureComponent<ResizableHeaderProps, typeof initialState> {
    static defaultProps: {
        cellTag: string;
        minSize: number;
    };
    state: {
        initialOffset: number;
    };
    elementRef: React.RefObject<HTMLDivElement>;
    originalWidth: () => number;
    handleMouseDown: (e: React.MouseEvent<HTMLElement>) => void;
    handleMouseMoved: (e: MouseEvent) => void;
    handleMouseUp: (e: MouseEvent) => void;
    render(): ReactNode;
}
export declare function header(el: HTMLElement | null, selector: string): Element | null;
export {};
