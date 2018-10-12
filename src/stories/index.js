import React from 'react';
import {storiesOf} from '@storybook/react';
import {withState} from '@dump247/storybook-state';
import {doc} from 'storybook-readme';
import {withDocs} from './withDocs';

import {model, preprocess} from './store';

import '!style-loader!css-loader!react-datasheet/lib/react-datasheet.css';
import '../react-datasheet-ex.css';
import './stories.css';

import Readme from '../../README.md';
import SheetDocs from './Sheet.md';
import SheetStory from './Sheet.story';
import RowDocs from './Row.md';
import RowStory from './Row.story';
import HeaderDocs from './HeaderComponents.md';
import HeaderStory from './HeaderComponents.story';

import DragDropProvidersDocs from './DragDropProviders.md';
import DragDropProvidersStory from './DragDropProviders.story';
import DragDropRenderersDocs from './DragDropRenderers.md';
import DragDropRenderersStory from './DragDropRenderers.story';

import ResizableDocs from './Resizable.md';
import ResizableHeaderDocs from './ResizableHeader.md';
import ResizableHeaderStory from './ResizableHeader.story';
import ResizableHeaderContainerDocs from './ResizableHeaderContainer.md';
import ResizableHeaderContainerStory from './ResizableHeaderContainer.story';
import WidthResizeHandleDocs from './WidthResizeHandle.md';
import WidthResizeHandleStory from './WidthResizeHandle.story';
import {SheetActionCreators} from './store/actions';

const stories = storiesOf('ReactDatasheet Extensions', module);
const basic = storiesOf('Basic Components', module);
const dragDrop = storiesOf('Drag and Drop', module);
const resize = storiesOf('Resizable', module);

stories
  .add('Introduction', doc(Readme))
;

basic
  .add('Sheet',
    withDocs(SheetDocs,
      withState(model)(SheetStory)))
  .add('Row',
    withDocs(RowDocs,
      withState(model)(RowStory)))
  .add('Header Components',
    withDocs(HeaderDocs,
      withState(model)(HeaderStory)))
;

dragDrop
  .add('Drag and Drop Renderers',
    withDocs(DragDropRenderersDocs,
      withState(model)((DragDropRenderersStory))))
  .add('Drag and Drop Providers',
    withDocs(DragDropProvidersDocs,
      withState(model)((DragDropProvidersStory))))
;

const actions = model.headers.map((h, index) => SheetActionCreators.headerResizeEnd(index, 100));
const resizeModel = preprocess(model, ...actions);

resize
  .add('Overview', doc(ResizableDocs))
  .add('Resizable Header',
    withDocs(ResizableHeaderDocs,
      withState(resizeModel)((ResizableHeaderStory))))
  .add('Resizable Container',
    withDocs(ResizableHeaderContainerDocs,
      withState(resizeModel)((ResizableHeaderContainerStory))))
  .add('Width Resize Handle',
    withDocs(WidthResizeHandleDocs,
      withState(resizeModel)((WidthResizeHandleStory))))
;
