import React, {Component, CSSProperties, ReactNode} from 'react';
import {HEADER_CELL_CONTAINER} from './ClassNames';


export default class HeaderContainer
  extends Component<{className?: string, style?: CSSProperties}> {

  static defaultProps = {
    className: '',
  };

  render(): ReactNode {

    const className = [
      HEADER_CELL_CONTAINER,
      this.props.className,
    ].filter(c => !!c).join(' ');

    return (
      <span className={className} style={this.props.style}>
        {this.props.children}
      </span>
    );
  }
}
