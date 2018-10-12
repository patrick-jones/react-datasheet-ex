import React, {PureComponent, ReactNode} from 'react';
import {HEADER_CELL_CONTAINER} from './ClassNames';
import {Styleable} from './interfaces';


/**
 * A component that lays out child elements from top to bottom.
 * This helps keep header titles top-aligned.
 */
export default class HeaderContainer
  extends PureComponent<Styleable> {

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
