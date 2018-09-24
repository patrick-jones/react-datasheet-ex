import React, {CSSProperties} from 'react';
import RDS from 'react-datasheet';

export interface RowLocation {
  row: number;
}

export interface ColumnLocation {
  col: number;
}

export interface ColumnHeader {
  id: string;
  title: string;
  width?: number;
}

export interface HeaderRendererProps<T extends ColumnHeader = ColumnHeader> extends ColumnLocation {
  header: T;
}

export type HeaderRenderer<T extends ColumnHeader = ColumnHeader,
  R extends HeaderRendererProps<T> = HeaderRendererProps<T>> = React.ComponentType<R>;

export type HeaderContentRenderer<T extends ColumnHeader = ColumnHeader>
  = React.ComponentType<HeaderRendererProps<T>>;

export interface SheetRendererProps<
    T extends RDS.Cell<T, V>, V = string, H extends ColumnHeader = ColumnHeader
  >
  extends RDS.SheetRendererProps<T, V> {
  /** React style object that should be applied to the enclosing table */
  style?: CSSProperties | undefined;
  /**
   * An array of `ColumnHeader`, which are rendered into `th` elements
   * @default []
   */
  headers: H[];
  /**
   * Optional component or function to render the header cell contents.
   * The contents are rendered within a `th` element.
   * @default DefaultHeaderRenderer
   */
  headerRenderer: HeaderRenderer;
  /**
   * Optional component or function to render the header cell contents.
   * The contents are rendered within a `th` element.
   * @default DefaultHeaderContentRenderer
   */
  headerContentRenderer: HeaderContentRenderer;
}


export type ActionContentRenderer<T extends RowLocation = RowLocation>
  = React.ComponentType<T>;

export interface RowRendererProps<
    T extends RDS.Cell<T, V>, V = string, AP extends RowLocation = RowLocation
  > extends RDS.RowRendererProps<T, V> {

  actionContentRenderer?: ActionContentRenderer<AP>;
}
