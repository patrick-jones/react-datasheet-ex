import React, {PureComponent, ReactNode} from 'react';

import {RESIZING_WIDTH, WIDTH_RESIZE_HANDLE} from '../ClassNames';
import {ResizableHeaderProps} from './interfaces';


const initialState = {
  initialOffset: 0,
};


export default class WidthResizeHandle
  extends PureComponent<ResizableHeaderProps, typeof initialState> {

  static defaultProps = {
    cellTag: 'TH',
    minSize: 17,
  };

  state = initialState;

  elementRef = React.createRef<HTMLDivElement>();

  originalWidth = () => {
    const th = header(this.elementRef.current, this.props.cellTag);
    return th ? th.clientWidth : 0;
  };

  handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    const {index, onResizeStart} = this.props;
    const originalSize = this.originalWidth();
    const initialOffset = originalSize - e.pageX;

    this.setState({initialOffset});
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMoved);
    document.body.classList.add(RESIZING_WIDTH);
    onResizeStart && onResizeStart(index, originalSize);
  };

  handleMouseMoved = (e: MouseEvent) => {
    const {index, onResizing, minSize} = this.props;
    if (onResizing) {
      const {initialOffset} = this.state;
      const requestedSize = initialOffset + e.pageX;
      if (requestedSize >= minSize) {
        onResizing(index, requestedSize);
      }
    }
  };

  handleMouseUp = (e: MouseEvent) => {
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMoved);
    document.body.classList.remove(RESIZING_WIDTH);
    const {index, onResizeEnd, minSize} = this.props;
    const {initialOffset} = this.state;
    this.setState(initialState);
    onResizeEnd(index, Math.max(initialOffset + e.pageX, minSize));
  };

  render(): ReactNode {
    const {className, style} = this.props;

    return (
      <span
        ref={this.elementRef}
        className={className ? `${WIDTH_RESIZE_HANDLE} ${className}` : WIDTH_RESIZE_HANDLE}
        style={style}
        onMouseDown={this.handleMouseDown}
      >
        {this.props.children}
      </span>
    );
  }
}


export function header(el: HTMLElement | null, selector: string): Element | null {
  if (!el) {
    return null;
  }

  const upper = selector.toUpperCase();
  if (el.closest) {
    return el.closest(upper);
  }


  let parent = el.parentElement;
  while (parent && parent.nodeType === Node.ELEMENT_NODE) {
    if (parent.tagName === upper) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return null;
}
