import React, { CSSProperties } from 'react';
import RDS from 'react-datasheet';
export interface RowLocation {
    row: number;
}
export interface ColumnLocation {
    col: number;
}
export declare type Overflow = 'wrap' | 'nowrap' | 'clip' | undefined;
export interface ColumnHeader {
    id: string;
    title: string;
    align?: 'center' | 'left' | 'right';
    colSpan?: number;
    className?: string;
    overflow?: Overflow;
    width?: number;
}
export interface HeaderRendererProps<T extends ColumnHeader = ColumnHeader> extends ColumnLocation {
    header: T;
    overflow?: Overflow;
    className?: string;
    style?: CSSProperties;
}
export declare type HeaderRenderer<T extends ColumnHeader = ColumnHeader, R extends HeaderRendererProps<T> = HeaderRendererProps<T>> = React.ComponentType<R>;
export interface SheetRendererProps<T extends RDS.Cell<T, V>, V = string, H extends ColumnHeader = ColumnHeader> extends RDS.SheetRendererProps<T, V> {
    /** React style object that should be applied to the enclosing table */
    style?: CSSProperties;
    /**
     * An array of `ColumnHeader`, which are rendered into `th` elements
     * @default []
     */
    headers: H[];
    /**
     * Optional component or function to render the header cell contents.
     * The contents are rendered within a `th` element.
     * @default DefaultHeaderCellRenderer
     */
    headerCellRenderer: HeaderRenderer;
    /**
     * Optional component or function to render the header cell contents.
     * The contents are rendered within a the HeaderCellRenderer.
     * @default DefaultHeaderRenderer
     */
    headerRenderer: HeaderRenderer;
    /**
     * Grid default for how to render overflow text in headers. For headers, the default
     * is `clip`. This is separate from the `overflow` property on the grid itself.
     */
    overflow: 'wrap' | 'nowrap' | 'clip';
}
export declare type ActionRendererProps<T extends RDS.Cell<T, V>, V = string> = Pick<RDS.RowRendererProps<T, V>, Exclude<keyof RDS.RowRendererProps<T, V>, 'children'>> & {
    id?: string;
};
export declare type ActionRenderer<T extends RDS.Cell<T, V>, V = string, ARP extends ActionRendererProps<T, V> = ActionRendererProps<T, V>> = React.ComponentType<ARP>;
export interface RowRendererProps<T extends RDS.Cell<T, V>, V = string, ARP extends ActionRendererProps<T, V> = ActionRendererProps<T, V>> extends RDS.RowRendererProps<T, V> {
    id?: string;
    actionRenderer: ActionRenderer<T, V, ARP>;
}
