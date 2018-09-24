# Drag and Drop Renderers

These custom row and header renderers support reordering columns and rows 
via drag and drop. Header and row drag and drop can be used together or 
separately. For rows, the action cell at the beginning of the row serves 
as the drag handle.

*Note:* This functionality depends on [`react-dnd`](http://react-dnd.github.io/react-dnd/),
which you must add as a dependency to your project. You must also set up a drag and
drop [context](http://react-dnd.github.io/react-dnd/docs-drag-drop-context-provider.html)
in your application somewhere above the data grid. You are only supposed to have one
context per page, so it makes sense to add it at the top of your application.  


<!-- STORY -->

## Prop Types

### DragDropHeaderRenderer

Name | Type | Default | Description
:--- | :--- | :--- | :---:
col             | number          | -  | The 0-based column index
header          | `ColumnHeader`  | -  | A `ColumnHeader`
onHeaderDropped | (source: number, target: number) => void | - | Event handler for when one header is dropped on another. `source` is the dragged column's index, and `target` is the dropped-upon column index. 


### DragDropRowRenderer

These properties are in addition to the
[standard `rowRenderer` properties](https://github.com/nadbm/react-datasheet#row-renderer)
supplied by `react-datasheet`.

Name | Type | Default | Description
:--- | :--- | :--- | :---:
actionContentRenderer? | `ActionContentRenderer` | - | Optional. A function or component that renders the content of the action cell; default is to leave it empty
onRowDropped           | (source: number, target: number) => void | - | Event handler for when one row is dropped on another. `source` is the dragged row's index, and `target` is the dropped-upon row index.


## Sample code

```bash
# required peer dependencies
$ npm install react-dnd react-dnd-html5-backend
```


```js
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {SheetRenderer} from 'react-datasheet-ex';
import {DragDropRowRenderer, DragDropHeaderRenderer} from 'react-datasheet-ex/drag-drop';
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
    <DragDropHeaderRenderer {...hrProps} onHeaderDropped={this.props.onHeaderDropped}/>
  )
  
  rowRenderer = rowRendererProps => (
    <DragDropRowRenderer {...rowRendererProps} onRowDropped={this.props.onRowDropped} />
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
