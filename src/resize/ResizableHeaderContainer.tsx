import React, {PureComponent, ReactNode} from 'react';
import {ResizableHeaderProps} from './interfaces';
import HeaderContainer from '../HeaderContainer';
import WidthResizeHandle from './WidthResizeHandle';


export default class ResizableHeaderContainer
  extends PureComponent<ResizableHeaderProps> {

  static defaultProps = {
    cellTag: 'TH',
    minSize: 17,
  };

  render(): ReactNode {
    const {children, ...rest} = this.props;
    return (
      <HeaderContainer>
        {children}
        <WidthResizeHandle {...rest} />
      </HeaderContainer>
    );
  }
}
