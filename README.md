[![Build Status](https://travis-ci.com/patrick-jones/react-datasheet-ex.svg?branch=master)](https://travis-ci.com/patrick-jones/react-datasheet-ex)
[![codecov](https://codecov.io/gh/patrick-jones/react-datasheet-ex/branch/master/graph/badge.svg)](https://codecov.io/gh/patrick-jones/react-datasheet-ex)

# Extensions for React-Datasheet

[React-Datasheet](https://github.com/nadbm/react-datasheet) provides a 
strong core of data grid functionality that can be easily extended to support
different behaviors through it's use of 
[render props](https://reactjs.org/docs/render-props.html). This packages adds
custom renderers to support:

- Reordering columns and rows via drag-and-drop
- Resizing columns by dragging

## Installation

Install from npm (install `react-datasheet` also):

```bash
$ npm install --save react-datasheet-ex 
```

To use the drag-and-drop features, install `react-dnd` as well:

```bash
$ npm install --save react-dnd react-dnd-html5-backend
```

Import as needed:

```js
import {Sheet, Row} from 'react-datasheet-ex';
import {DragDropHeader, DragDropRow} from 'react-datasheet-ex/drag-drop';

// we need a few styles, too
import 'react-datasheet-ex/react-datasheet-ex.css';
```

## Documentation

Storybook examples and documentation here: [https://patrick-jones.github.io/react-datasheet-ex/](https://patrick-jones.github.io/react-datasheet-ex/)

The [story source code](https://github.com/patrick-jones/react-datasheet-ex/tree/master/src/stories)
is also a good place to look for guidance.
