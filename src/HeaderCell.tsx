import React, {PureComponent, ReactNode} from 'react';
import {ColumnHeader, HeaderRendererProps} from './interfaces';
import {READ_ONLY_CELL, HEADER_CELL} from './ClassNames';
import headerDefaults from './headerDefaults';


export default class HeaderCell<T extends ColumnHeader = ColumnHeader>
  extends PureComponent<HeaderRendererProps<T>> {

  render(): ReactNode {
    const {
      width,
      id,
      align,
      className,
      colSpan,
      overflow,
    } = headerDefaults(this.props.header, {overflow: this.props.overflow});
    const style = typeof width === 'undefined' ?
      this.props.style :
      Object.assign({}, (this.props.style || {}), {width: `${width}px`});

    const cn = [
      READ_ONLY_CELL,
      HEADER_CELL,
      `${HEADER_CELL}--${align}`,
      `${HEADER_CELL}--${overflow}`,
      className || '',
    ].filter(c => !!c).join(' ');

    return (
      <th
        key={id}
        style={style}
        colSpan={colSpan}
        className={cn}
      >
        {this.props.children}
      </th>
    );
  }
}
