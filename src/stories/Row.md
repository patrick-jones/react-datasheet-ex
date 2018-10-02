# Row

This is a companion to `Sheet`. Like `Sheet` it is not strictly required but
it will make things easier. Each row renders with an extra read-only cell 
at the beginning. This "action" cell does not do anything by itself, but is 
used as the drag handle for draggable rows and can optionally house other controls
such as a check box or row labels. This example uses the action cell to support 
row selection.


<!-- STORY -->

## Prop Types

### Row

This component differs from the default renderer in `react-datasheet` in that it
adds a blank cell at the beginning of each row. This extra cell is used as the
drag handle 
 
In addition to the
[standard `rowRenderer` properties](https://github.com/nadbm/react-datasheet#row-renderer)
supplied by `react-datasheet`, this component can accept a custom renderer for
the action cell's content.

Name | Type | Description
:--- | :--- | :---
row             | number | The 0-based row index
cells           | Array  | The cells in the current row
id?             | string | Optional unique (within the sheet) id for the row. If provided, it will be used as the row's `key` attribute, since using indices for keys is [not recommended](https://reactjs.org/docs/lists-and-keys.html#keys)
actionRenderer? | `ActionRenderer` | Optional. A function or component that renders the content of the action cell; default is to leave it empty 


### type ActionRenderer

A component or function that renders the row action cell content. It takes the
same properties as `Row` minus `actionRenderer`. 

Name | Type | Description
:--- | :--- | :---
row             | number | The 0-based row index
cells           | Array  | The cells in the current row
id?             | string | Optional unique (within the sheet) id for the row.


## Sample code
```js
import React, {Component} from 'react';
import ReactDatasheet from 'react-datasheet';
import memoize from 'memoize-one';

import {Row, Sheet} from 'react-datasheet-ex';
import {renderValue, rowsToData} from './store/model';

export default class RowExample extends Component {

  getData = memoize(rowsToData);

  sheetRenderer = props => {
    const {model: {headers, overflow}} = this.props;

    return (
      <Sheet
        headers={headers}
        overflow={overflow}
        {...props}
      />
    );
  }

  rowRenderer = props => {
    return (
      <Row
        actionRenderer={this.actionRenderer}
        {...props}
      />
    );
  }

  actionRenderer = props => {
    const {actions, model} = this.props;
    const {row} = props;
    const {selected} = model.rows[props.row];
    return (
      <input
        type='checkbox'
        checked={selected}
        onClick={() => actions.rowSelectionChanged(row, !selected)}
      />
    );
  }

  render() {

    const {actions, model: {rows, selected}} = this.props;

    return (
      <ReactDatasheet
        data={this.getData(rows)}
        sheetRenderer={this.sheetRenderer}
        rowRenderer={this.rowRenderer}
        valueRenderer={renderValue}
        onCellsChanged={actions.cellsChanged}
        onSelect={actions.selectionChanged}
        selected={selected}
      />
    );
  }
}

```
