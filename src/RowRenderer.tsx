import React, {Component, ReactNode} from 'react';
import ReactDatasheet from 'react-datasheet';

import {RowLocation, RowRendererProps} from './interfaces';
import DefaultActionContentRenderer from './DefaultActionContentRenderer';


export default class RowRenderer<
    T extends ReactDatasheet.Cell<T, V>, V = string, AP extends RowLocation = RowLocation
  > extends Component<RowRendererProps<T, V, AP>> {

  static displayName = 'RowRenderer';

  static readonly defaultProps = {
    actionContentRenderer: DefaultActionContentRenderer,
  };

  render(): ReactNode {
    const {row, children, actionContentRenderer} = this.props;
    const ContentRenderer = actionContentRenderer || DefaultActionContentRenderer;
    return (
      <tr key={`$row-${row}`}>
        <td key='$$actionCell' className='cell read-only rdr-sheet-renderer__action-cell'>
          <ContentRenderer row={row} />
        </td>
        {children}
      </tr>
    );
  }
}
