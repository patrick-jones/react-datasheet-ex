import React, {Component, ReactNode} from 'react';
import RDS from 'react-datasheet';

import {
  ColumnHeader,
  HeaderContentRenderer,
  HeaderRenderer,
  SheetRendererProps,
} from './interfaces';
import DefaultHeaderRenderer from './DefaultHeaderRenderer';
import DefaultHeaderContentRenderer from './DefaultHeaderContentRenderer';

// import './react-datasheet-ex.css';


/**
 * A custom `sheetRenderer` for `react-datasheet` that renders a sheet
 * with column headers and an leading 'action" cell on each row.
 */
export default class SheetRenderer<
    T extends RDS.Cell<T, V>, V = string, H extends ColumnHeader = ColumnHeader
  > extends Component<SheetRendererProps<T, V, H>> {

  static displayName = 'SheetRenderer';

  static readonly defaultProps = {
    headers: [],
    headerRenderer: DefaultHeaderRenderer,
    headerContentRenderer: DefaultHeaderContentRenderer,
  };

  render(): ReactNode {
    const {
      className,
      headers,
      headerRenderer: HeaderRenderer,
      headerContentRenderer: HeaderContentRenderer,
      style,
    } = this.props;

    return (
      <table className={className} style={style}>
        <thead>
          <tr key='$headers'>
            <th className='cell read-only rdr-sheet-renderer__action-cell' key='$$actionCell'/>
            {headers.map((header: H, col: number) => {
              const hrProps = {col, header};
              return (
                <HeaderRenderer key={`th-${header.id}`} {...hrProps}>
                  <HeaderContentRenderer key={header.id} {...hrProps} />
                </HeaderRenderer>
              );
            })}
          </tr>
        </thead>
        <tbody>
        {this.props.children}
        </tbody>
      </table>
    );
  }
}
