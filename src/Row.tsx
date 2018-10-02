import React, {Component, ReactNode} from 'react';
import RDS from 'react-datasheet';

import {READ_ONLY_CELL, ACTION_CELL} from './ClassNames';
import DefaultAction from './DefaultAction';
import {ActionRendererProps, RowRendererProps} from './interfaces';


const rowClass = `${READ_ONLY_CELL} ${ACTION_CELL}`;


export default class Row<
  T extends RDS.Cell<T, V>, V = string,
  ARP extends ActionRendererProps<T, V> = ActionRendererProps<T, V>,
> extends Component<RowRendererProps<T, V, ARP>> {

  static displayName = 'RowRenderer';

  static readonly defaultProps = {
    actionRenderer: DefaultAction,
  };

  render(): ReactNode {
    const {id, row, children, actionRenderer: ActionRenderer, ...rest} = this.props;
    return (
      <tr key={`$row-${id || row}`}>
        <td key='$$actionCell' className={rowClass}>
          <ActionRenderer id={id} row={row} {...rest} />
        </td>
        {children}
      </tr>
    );
  }
}
