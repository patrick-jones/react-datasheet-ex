# Sheet

A custom `sheetRenderer` for `react-datasheet` that adds column headers 
and a leading "action" cell on each row. It should be used with `Row` 
(from this package) or another row renderer that adds an extra cell 
at the beginning of each row. This component does not really do that 
much on its own, but other components in this package build on top of it.
Strictly speaking you don't *need* to use this renderer to use the package's
other features, but it is the shortest path.

One notable difference from core React-Datasheet is that this renderer
explicitly separates column headers from the grid data (most React-Datasheet
examples put column headers in `data[0]` and mark the cells as readOnly).
 

<!-- STORY -->

## Prop Types

### Sheet

In addition to the 
[standard `sheetRenderer` properties](https://github.com/nadbm/react-datasheet#sheet-renderer)
provided by `react-datasheet`, you must supply these additional properties.

Name | Type | Default | Description
:--- | :--- | :--- | :---
headers               | `ColumnHeader[]`         | [] | A list of `ColumnHeader` objects, labels for the columns in the grid
headerCellRenderer    | `HeaderRenderer`         | `HeaderCell` | Optional function or component to render the header container (e.g., a `th` element).
headerRenderer        | `HeaderRenderer`         | `HeaderTitle` | Optional function or component to render the header contents. The default renders the header's `title` property. 
style?                | object                   | - | Optional style object applied to the data grid's main `table` element.
overflow?  | 'wrap' &#124; nowrap' &#124; 'clip' | - | Optional. How to render overflow text. The default header cell renderer clips overflow text.

### interface ColumnHeader

The minimum properties for a column header. It shares many properties
with the data sheet [`cell`](https://github.com/nadbm/react-datasheet#cell-options)


Name | Type | Description
:--- | :--- | :---
id         | string | A unique (within the grid) identifier for the column
title      | string | The column title, displayed by default in the header
align?     | 'center' &#124; 'left' &#124; 'right' | Header content alignment
colSpan?   | number | Optional. The `th` `col-span` attribute
className? | string | Extra class name applied to the header cell element.
overflow?  | 'wrap' &#124; nowrap' &#124; 'clip' | Optional. Overrides the sheet renderer's `overflow` property for this cell. 
width?     | number | Optional. The column's width in pixels


### type HeaderRenderer

A component or function that renders the header content.

Name | Type | Description
:--- | :--- | :--- | :---
className?     | string                | Optional extra class name applied to this element
col            | number                | The 0-based column index
header         | `ColumnHeader`        | A `ColumnHeader`
overflow?      | 'wrap' &#124; nowrap' &#124; 'clip' | Optional. The sheet-level `overflow` option, which may be overridden by the header's option
style?         | object                | Optional style object applied to this element


## Sample code

```jsx
import {Sheet, Row} from 'react-datasheet-ex';
import 'react-datasheet-ex/react-datasheet-ex.css';

class Example extends Component {
  
  
  sheetRenderer = sheetRendererProps => (
    // add extra properties here
    <Sheet {...sheetRendererProps} headers={this.props.headers} />
  );
  
  
  rowRenderer = rowRendererProps => (
    <Row {...rowRendererProps} />
  );
  
  
  render() {
    const {rows} = this.props;
    return (
      <ReactDatasheet
        data={rows}
        sheetRenderer={this.sheetRenderer}
        rowRenderer={this.rowRenderer}
        valueRenderer={cell => cell.value}
      />
    );
  }
  
}
```
