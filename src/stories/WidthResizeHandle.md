# Resize Handle

This thin vertical bar actually implements all of the resizable logic;
the other components are built on top of it. It requires the `ResizableProps`
and should be placed within your header.


<!-- STORY -->


```jsx
import {HeaderContainer, HeaderTitle} from 'react-datasheet-ex';
import {WidthResizeHandle} from 'react-datasheet-ex/resize';

class MyClass extends Component {
  
  headerRenderer = (headerProps) => (
    <HeaderContainer>
      <HeaderTitle {...headerProps} />
      <WidthResizeHandle
        index={headerProps.col}
        onResizing={this.props.actions.headerResizing}
        onResizeEnd={this.props.actions.headerResizeEnd}
      />
    </HeaderContainer>
  );
    
  // ...rest of class...
}
```
