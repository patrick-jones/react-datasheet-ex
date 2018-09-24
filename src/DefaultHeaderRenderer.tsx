import React, {Component, ReactNode} from 'react';
import {ColumnHeader, HeaderRendererProps} from './interfaces';


export default class DefaultHeaderRenderer<T extends ColumnHeader = ColumnHeader>
  extends Component<HeaderRendererProps<T>> {

  render(): ReactNode {
    const {header: {title, width, id}, children} = this.props;
    const style = typeof width === 'undefined' ? {} : {width: `${width}px`};
    return (
      <th
        key={id}
        title={title}
        style={style}
        className='cell read-only rdr-sheet-renderer__header-cell'
      >
        {children}
      </th>
    );
  }
}
