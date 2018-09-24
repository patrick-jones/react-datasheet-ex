import React, {ReactNode} from 'react';
import {ColumnHeader, HeaderRendererProps} from './interfaces';

/**
 * A simple header content renderer that displays the header's `title` property.
 */
export default class DefaultHeaderContentRenderer<T extends ColumnHeader = ColumnHeader>
  extends React.Component<HeaderRendererProps<T>> {

  render(): ReactNode {
    return (
      this.props.header.title
    );
  }
}
