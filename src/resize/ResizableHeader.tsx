import React, {PureComponent, ReactNode} from 'react';
import {ResizableHeaderProps} from './interfaces';
import {ColumnHeader, HeaderRendererProps} from '../interfaces';
import HeaderTitle from '../HeaderTitle';
import ResizableHeaderContainer from './ResizableHeaderContainer';


export interface ResizableHeaderRendererProps<T extends ColumnHeader = ColumnHeader>
  extends ResizableHeaderProps, HeaderRendererProps<T> {
}

export default class ResizableHeader
  extends PureComponent<ResizableHeaderRendererProps> {

  static defaultProps = {
    cellTag: 'TH',
    minSize: 17,
  };

  render(): ReactNode {
    const {index, onResizeStart, onResizing, onResizeEnd, cellTag, minSize, ...rest} = this.props;
    return (
      <ResizableHeaderContainer
        index={index}
        onResizeStart={onResizeStart}
        onResizing={onResizing}
        onResizeEnd={onResizeEnd}
        cellTag={cellTag}
        minSize={minSize}
      >
        <HeaderTitle {...rest} />
      </ResizableHeaderContainer>
    );
  }
}
