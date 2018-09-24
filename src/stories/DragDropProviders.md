# Drag and Drop Providers

`DragDropHeaderRenderer` and `DragDropRowRenderer` are built on top of
lower-level components that simplify the integration of `react-dnd`, which 
can be a little bit head-spinning at times. If you require more customization 
than the pre-built rendering components offer, you can use the lower-level 
`DragDropHeaderProvider` and `DragDropRowProvider` to easily attach drag and drop
behavior to your own renderers.

These providers both use the [`children` as render prop](https://reactjs.org/docs/render-props.html#using-props-other-than-render)
pattern that has become common in React lately, most notably in the new 
[context API](https://reactjs.org/docs/context.html#consumer).

<!-- STORY -->

## Prop Types

### DragDropHeaderProvider

Name | Type | Description
:--- | :--- | :---:
col             | number          | The 0-based column index
onHeaderDropped | (source: number, target: number) => void | Event handler for when one header is dropped on another. `source` is the dragged column's index, and `target` is the dropped-upon column index.
children        | (props: InjectedDragDropProps) => ReactNode | Render prop to render inner components


### DragDropRowProvider

Name | Type | Description
:--- | :--- | :---:
row          | number          | The 0-based row index
onRowDropped | (source: number, target: number) => void | Event handler for when one row is dropped on another. `source` is the dragged row's index, and `target` is the dropped-upon row index.
children     | (props: InjectedDragDropProps) => ReactNode | Render prop to render inner components


### interface InjectedDragDropProps

These properties include both drag source and drop target properties injected
by `react-dnd`. Refer to the `DragSource` and `DropTarget` sections of the 
[`react-dnd` docs](http://react-dnd.github.io/react-dnd/docs-overview.html)
for more details.

In the name of keeping things approachable, these components provide a small subset 
of the options available in `react-dnd`.


Name | Type | Description
:--- | :--- | :---:
connectDragSource  | function | Used to connect a draggable DOM node to the React DnD backend
connectDragPreview | function | Used inside the component to assign the drag preview role to a node. You can ignore this unless you want to provide a custom view of your dragged node while dragging.
connectDropTarget  | function | Used to connect a droppable DOM node to the React DnD backend
isDropOver         | boolean  | True if a drag operation is currently targeting your drop target  


## Sample code

```bash
# required peer dependencies
$ npm install react-dnd react-dnd-html5-backend
```


```js
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {SheetRenderer} from 'react-datasheet-ex';
import {DragDropRowProvider, DragDropHeaderProvider} from 'react-datasheet-ex/drag-drop';
```

```js
class Example extends Component {
  
  sheetRenderer = sheetRendererProps => (
    <SheetRenderer
      {...sheetRendererProps}
      headers={this.props.headers}
      headerRenderer={this.headerRenderer} 
    />
  )
  
  headerRenderer = hrProps => (
    <CustomHeaderRenderer {...hrProps} onHeaderDropped={this.props.onHeaderDropped}/>
  )
  
  rowRenderer = rowRendererProps => (
    <CustomRowRenderer {...rowRendererProps} onRowDropped={this.props.onRowDropped} />
  )
  
  render() {
    const {rows} = this.props;
    // in real code the DragDropContentProvider would probably
    // be at the root level of the application
    return (
      <DragDropContextProvider backend={HTML5Backend}>
          <ReactDatasheet
            data={rows}
            sheetRenderer={this.sheetRenderer}
            rowRenderer={this.rowRenderer}
            valueRenderer={cell => cell.value}
          />
      </DragDropContextProvider>
    );
  }
}
```

```js
class CustomHeaderRenderer extends Component {
  
  renderHeader = dndProps => {
    const {connectDragSource, connectDropTarget, isDropOver} = dndProps;
    const {header, children} = this.props;

    const className = isDropOver ? 'hot' : 'cold';

    return connectDropTarget(connectDragSource(
      <th title={header.title} className={className}>
        {children}
      </th>
    ));    
  }
  
  render() {
    const {col, onHeaderDropped} = this.props;

    return (
      <DragDropHeaderProvider col={col} onHeaderDropped={onHeaderDropped}>
        {this.renderHeader}
      </DragDropHeaderProvider>
    );
  }
}
```

```js
class CustomRowRenderer extends Component {
  
  renderRow = dndProps => {
    const {connectDragSource, connectDragPreview, connectDropTarget, isDropOver} = dndProps;
    const {row, children, actionContentRenderer: ContentRenderer} = this.props;

    const className = isDropOver ? 'hot' : 'cold';;
    return connectDropTarget(connectDragPreview(
      <tr key={`$row-${row}`} className={className}>
        {connectDragSource(
          <td key='$$actionCell' className={actionCellClassName}>
            <ContentRenderer row={row} />
          </td>
        )}
        {children}
      </tr>
    ));
  }

  render() {
    const {row, onRowDropped} = this.props;

    return (
      <DragDropRowProvider row={row} onRowDropped={onRowDropped}>
        {this.renderRow}
      </DragDropRowProvider>
    );
  }
}
```