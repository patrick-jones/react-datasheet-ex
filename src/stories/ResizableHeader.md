# ResizableHeader

This is the simplest but least flexible component. It adds a drag handle to the right
side of every header, but otherwise acts like a `HeaderTitle` component. This component
requires all of the properties from `HeaderRendererProps` and well as `ResizableProps`.

<!-- STORY -->


## Sample Code

To render the default `title` property:

```jsx
import {ClassNames, Row, Sheet} from 'react-datasheet-ex;
import {ResizableHeader} from 'react-datasheet-ex/resize';

class MyClass extends Component {
  
  headerRenderer = (headerProps) => (
    <ResizableHeader
      index={props.col}
      onResizing={this.props.actions.headerResizing}
      onResizeEnd={this.props.actions.headerResizeEnd}
      {...headerProps}
    />
  );
    
  // ...rest of class...  

  render(): ReactNode {

    const {actions, model: {rows, selected}} = this.props;
    const data = this.getData(rows);

    return (
      <ScrollPanel height={120} width={450}>
        <ReactDatasheet
          className={ClassNames.DATA_GRID_RESIZABLE}
          data={data}
          sheetRenderer={this.sheetRenderer}
          rowRenderer={this.rowRenderer}
          valueRenderer={renderValue}
          onCellsChanged={actions.cellsChanged}
          onSelect={actions.selectionChanged}
          selected={selected}
        />
      </ScrollPanel>
    );
  }
}
```

To render something besides `title`:

```jsx
class MyClass extends Component {
  
  headerRenderer = (headerProps) => (
    <ResizableHeader
      index={props.col}
      onResizing={this.props.actions.headerResizing}
      onResizeEnd={this.props.actions.headerResizeEnd}
      {...headerProps}
    >
      {whateverYouWant}
    </ResizableHeader>
  );
    
  // ...rest of class...
}
```
