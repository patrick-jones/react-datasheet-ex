# Drag and Drop Providers

`DragDropHeader` and `DragDropRow` are built on top of
lower-level components that simplify the integration of `react-dnd`, which 
can be a little bit head-spinning at times. If you require more customization 
than the pre-built rendering components offer, you can use the lower-level 
`DragDropHeaderProvider` and `DragDropRowProvider` to attach drag and drop
behavior to your own renderers. These providers both use the 
[`children` as render prop](https://reactjs.org/docs/render-props.html#using-props-other-than-render)
pattern that has become common in React lately, most notably in the new 
[context API](https://reactjs.org/docs/context.html#consumer).

**_Note:_** The ReactDnD `connect*()` functions injected by the providers 
must be called on DOM elements, not custom React elements. There are some
CSS classes that you must manually apply to these elements to get proper layout
and interaction.


<!-- STORY -->

## Prop Types

### DragDropHeaderProvider

Name | Type | Description
:--- | :--- | :---
col             | number          | The 0-based column index
onHeaderDropped | (source: number, target: number) => void | Event handler for when one header is dropped on another. `source` is the dragged column's index, and `target` is the dropped-upon column index.
children        | (props: InjectedDragDropProps) => ReactNode | Render prop to render inner components


### DragDropRowProvider

Name | Type | Description
:--- | :--- | :---
row          | number          | The 0-based row index
onRowDropped | (source: number, target: number) => void | Event handler for when one row is dropped on another. `source` is the dragged row's index, and `target` is the dropped-upon row index.
children     | (props: InjectedDragDropProps) => ReactNode | Render prop to render inner components


### InjectedDragDropProps

These are the properties that will be supplied to your render function
inside the provider. These properties include both drag source and drop target 
properties injected by React DnD. Refer to the `DragSource` and `DropTarget` 
sections of the [docs](http://react-dnd.github.io/react-dnd/docs-overview.html)
for more details.

In the name of keeping things approachable, these components provide a small subset 
of the options available in React DnD.


Name | Type | Description
:--- | :--- | :---
connectDragSource  | function | Used to connect a draggable DOM node to the React DnD backend
connectDragPreview | function | Used inside the component to assign the drag preview role to a node. You can ignore this unless you want to provide a custom view of your dragged node while dragging.
connectDropTarget  | function | Used to connect a droppable DOM node to the React DnD backend
isDropOver         | boolean  | True if a drag operation is currently targeting your drop target  


## Sample code

```bash
# required peer dependencies
$ npm install react-dnd react-dnd-html5-backend memoize-one
```


```js
import React from 'react';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import memoize from 'memoize-one';
import {ClassNames, Sheet} from 'react-datasheet-ex';
import {DragDropRowProvider, DragDropHeaderProvider} from 'react-datasheet-ex/drag-drop';


class DragDropProvidersSheet extends React.Component {

  getData = memoize(rows => rows.map(r => r.data));  

  sheetRenderer = props => {
    const {model: {headers, overflow}} = this.props;

    return (
      <Sheet
        {...props}
        headers={headers}
        overflow={overflow}
        headerRenderer={this.headerRenderer}
      />
    );
  };

  headerRenderer = (props) => {

    const {actions} = this.props;
    const {col, header} = props;
    
    const {HEADER_DRAG_SOURCE, HEADER_DROP_TARGET} = ClassNames;

    return (
      <DragDropHeaderProvider col={col} onHeaderDropped={actions.headerDropped}>
        {({connectDragSource, connectDropTarget, isDropOver}) => {

          const className = isDropOver ?
            `${HEADER_DRAG_SOURCE} ${HEADER_DROP_TARGET}`
            : HEADER_DRAG_SOURCE;

          return connectDropTarget(connectDragSource(
            <span title={header.title} className={className}>
              <HeaderTitle {...props} />
            </span>
          ));

        }}
      </DragDropHeaderProvider>
    );
  };

  rowRenderer = (props) => {
    const {actions} = this.props;
    const {ACTION_CELL, READ_ONLY_CELL, ROW_DROP_TARGET} = ClassNames;

    return (
      <DragDropRowProvider row={props.row} onRowDropped={actions.rowDropped}>
        {({connectDragSource, connectDragPreview, connectDropTarget, isDropOver}) => {
          const dt = isDropOver ? ROW_DROP_TARGET : '';
          const className = `rdx-row ${dt}`;
          return connectDropTarget(connectDragPreview(
            <tr key={`$row-${props.row}`} className={className}>
              {connectDragSource(
                <td
                  key='$$actionCell'
                  className={`${READ_ONLY_CELL} ${ACTION_CELL}`}
                />
              )}
              {props.children}
            </tr>
          ));
        }}
      </DragDropRowProvider>
    );
  };

  render() {
    const {actions, model: {rows, selected}} = this.props;
    const data = this.getData(rows);

    return (
    // in real code the DragDropContentProvider would probably
    // be at the root level of the application
    return (
      <DragDropContextProvider backend={HTML5Backend}>      
        <ReactDatasheet
          data={data}
          sheetRenderer={this.sheetRenderer}
          rowRenderer={this.rowRenderer}
          valueRenderer={cell => cell.value}
          onCellsChanged={actions.cellsChanged}
          onSelect={actions.selectionChanged}
          selected={selected}
        />
      </DragDropContextProvider>
    );
  }
}
```
