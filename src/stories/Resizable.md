# Resizable Columns

These components make it *relatively* easy to add "drag to resize" headers to your data sheet.
I say "relatively" because, if you've ever tried to apply layout CSS to tables you have probably
noticed that tables tend to take your explicit instructions as advice that they are free to ignore
if another way seems more appealing.

## Make your column widths lay out properly using this one weird trick...

Actually, it's a few tricks used in combination.

### Trick #1: Use a container

Place your data sheet inside a sized block container and apply an `overflow` style
to that container, e.g. `overflow: auto` or `overflow: scroll`. This package supplies 
a very minimal `ScrollPanel` that will do the trick (see below), but you could easily 
use another implementation or roll your own.

### Trick #2: Zero width table

We want our table width to be the sum of all column widths. But if you set a specific table
width (or use `auto` or `100%`), then the table [will distribute "extra" space between
the columns](https://www.w3.org/TR/CSS2/tables.html#q17.5.2): 

> The width of the table is then the greater of the value of the 'width' property for the table element and the sum of the column widths (plus cell spacing or borders). If the table is wider than the columns, the extra space should be distributed over the columns.

This leads to a frustrating situation where resizing one column makes several 
other columns resize in response. By setting the `table` width to 0, we can force
the table width to match the sum of the columns widths.

`ClassNames.DATA_GRID_RESIZABLE` refers to a class that will do this for you:

```jsx
        <ReactDatasheet
          className={ClassNames.DATA_GRID_RESIZABLE}
          {...etc}
        />
```

### Trick #3: All headers have explicit widths

This follows from trick #2; since the table width is 0, all columns must
have width set or the column will collapse to zero also.


## Prop Types

### ResizeCallback

All of the resize events take the same callback:

```typescript
(index: number, requestedSize: number) => void
```

Name          | Type   | Description
:---          | :---   | :---
index         | number | The 0-based column index
requestedSize | number | The requested column width in pixels

`requestedSize` will never be less than the `minSize` value passed to resizable components.
If the user drags the mouse to less than `minSize` then `onResizing` events will stop firing
until the mouse moves back above `minSize`.

If the user releases the mouse at less than `minSize`, the `onResizeEnd` event will fire
with `minSize` as the `requestedSize`.

### ResizableProps

The properties expected by all resizable components.

Name           | Type             | Description
:---           | :---             | :---
index          | number           | The 0-based column index
minSize        | number           | The minimal allowable size
onResizeStart? | `ResizeCallback` | Optional, called when the user mouse-downs upon the drag handle
onResizing?    | `ResizeCallback` | Optional, called when the user drags the mouse
onResizeEnd    | `ResizeCallback` | Called when the user releases the mouse


### ScrollPanel

```jsx
import {ScrollPanel} from 'react-datasheet-ex/resize';
```

This is a simple, scrollable container for a data grid with resizable columns.
It is just a sized block element with `overflow: auto` applied to it.

Name    | Type   | Default | Description
:---    | :---   | :---    | :---
width?  | number | 100%    | Width of component in pixels
height? | number | 100%    | Height of component in pixels
