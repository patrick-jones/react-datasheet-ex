import React, {PureComponent, ReactNode} from 'react';
import {SCROLL_PANEL} from '../ClassNames';


export interface ScrollPanelProps {
  width?: number;
  height?: number;
}


export default class ScrollPanel
  extends PureComponent<ScrollPanelProps> {

  render(): ReactNode {
    const {width, height} = this.props;
    const style = {
      width: width ? `${width}px` : undefined,
      height: height ? `${height}px` : undefined,
    };
    return (
      <span className={SCROLL_PANEL} style={style}>
        {this.props.children}
      </span>
    );
  }
}
