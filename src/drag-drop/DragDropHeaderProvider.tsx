import {Component, ReactNode} from 'react';

import {InjectedDragDropProps, DragDropHeaderProps} from './interfaces';
import {HeaderDragSource, HeaderDropTarget} from './header-dnd';


export interface DragDropHeaderProviderProps
  extends DragDropHeaderProps,
    InjectedDragDropProps {
  children: (props: InjectedDragDropProps) => ReactNode;
}


class DragDropHeader extends Component<DragDropHeaderProviderProps> {

  render(): ReactNode {
    const {children, ...rest} = this.props;
    return children(rest);
  }
}

/**
 * Provides all drag-and-drop properties to a render function assigned to the
 * `children` property.
 */
const DragDropHeaderProvider = HeaderDropTarget(HeaderDragSource(DragDropHeader));

export default DragDropHeaderProvider;
