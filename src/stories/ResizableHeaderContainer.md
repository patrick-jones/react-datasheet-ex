# ResizableHeaderContainer

This component decorates the header with a resize handle and renders
its children in a `HeaderContainer` component. This makes it easy to combine
resizable behavior with other features; this example creates a resizable, 
draggable header. The container only requires `ResizableProps`.

<!-- STORY -->

## Sample Code

To make a resizable, draggable header:

```jsx
import {DragDropHeader} from 'react-datasheet-ex/drag-drop';
import {ResizableHeaderContainer} from 'react-datasheet-ex/resize';

class MyClass extends Component {
  
  headerRenderer = (headerProps) => {
    const {actions} = this.props;
    return (
      <ResizableHeaderContainer
        index={props.col}
        onResizing={this.props.actions.headerResizing}
        onResizeEnd={this.props.actions.headerResizeEnd}
      >
        <DragDropHeader onHeaderDropped={actions.headerDropped} {...headerProps} />
      </ResizableHeaderContainer>
    );
  };
  
  // ...rest of class...
}
```
