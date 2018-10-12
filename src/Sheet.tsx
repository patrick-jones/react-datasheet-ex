import React, {PureComponent, ReactNode} from 'react';
import RDS from 'react-datasheet';

import {
  ColumnHeader,
  HeaderRenderer,
  SheetRendererProps,
} from './interfaces';
import HeaderCell from './HeaderCell';
import HeaderTitle from './HeaderTitle';

import {READ_ONLY_CELL, ACTION_CELL} from './ClassNames';

// import './react-datasheet-ex.css';


const actionClassNames = `${READ_ONLY_CELL} ${ACTION_CELL}`;

/**
 * A custom `sheetRenderer` for `react-datasheet` that renders a sheet
 * with column headers and an leading 'action" cell on each row.
 */
export default class Sheet<
    T extends RDS.Cell<T, V>, V = string, H extends ColumnHeader = ColumnHeader
  > extends PureComponent<SheetRendererProps<T, V, H>> {

  static readonly defaultProps = {
    headers: [],
    headerCellRenderer: HeaderCell,
    headerRenderer: HeaderTitle,
    overflow: 'clip',
  };

  render(): ReactNode {
    const {
      className,
      headers,
      headerCellRenderer: HeaderCellRenderer,
      headerRenderer: HeaderRenderer,
      overflow,
      style,
    } = this.props;

    return (
      <table className={className} style={style}>
        <thead>
          <tr key='$headers'>
            <th className={actionClassNames} key='$$actionCell'/>
            {headers.map((header: H, col: number) => {
              const hrProps = {col, header, overflow};
              return (
                <HeaderCellRenderer
                  key={`header-${header.id}`}
                  {...hrProps}
                >
                  <HeaderRenderer key={header.id} {...hrProps} />
                </HeaderCellRenderer>
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
