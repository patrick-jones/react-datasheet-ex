import React, {ReactNode} from 'react';
import {ColumnHeader, HeaderRendererProps} from './interfaces';
import {HEADER_CELL_TITLE} from './ClassNames';
import headerDefaults from './headerDefaults';


interface HeaderTitleProps<T extends ColumnHeader = ColumnHeader> extends HeaderRendererProps<T> {
}


/**
 * A simple header content renderer that displays the header's `title` property.
 */
export default class HeaderTitle<T extends ColumnHeader = ColumnHeader>
  extends React.Component<HeaderTitleProps<T>> {

  static defaultProps = {
    className: '',
  };

  render(): ReactNode {
    const {overflow} = headerDefaults(this.props.header, {overflow: this.props.overflow});
    const {className, style} = this.props;

    const cn = [
      HEADER_CELL_TITLE,
      `${HEADER_CELL_TITLE}--${overflow}`,
      className,
    ].filter(c => !!c).join(' ');

    return (
      <span style={style} className={cn}>
        {this.props.children || this.props.header.title}
      </span>
    );
  }
}
