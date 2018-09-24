import React from 'react';
import {storiesOf} from '@storybook/react';
import {withState} from '@dump247/storybook-state';
import {doc} from 'storybook-readme';
import {withDocs} from './withDocs';

import DragDropProvidersStory from './DragDropProviders.story';
import DragDropRenderersStory from './DragDropRenderers.story';
import SheetRendererStory from './SheetRenderer.story';

import {initialState} from './store';

import '!style-loader!css-loader!react-datasheet/lib/react-datasheet.css';
import '../react-datasheet-ex.css';
import './stories.css';

import Readme from '../../README.md';
import SheetRendererDocs from './SheetRenderer.md';
import DragDropProvidersDocs from './DragDropProviders.md';
import DragDropRenderersDocs from './DragDropRenderers.md';

const stories = storiesOf('ReactDatasheet Extensions', module);

stories
  .add('Introduction', doc(Readme))
  .add('SheetRenderer - Basic',
    withDocs(SheetRendererDocs,
      withState(initialState)(SheetRendererStory)))
  .add('Drag and Drop Renderers',
    withDocs(DragDropRenderersDocs,
      withState(initialState)((DragDropRenderersStory))))
  .add('Drag and Drop Providers',
    withDocs(DragDropProvidersDocs,
      withState(initialState)((DragDropProvidersStory))))
;
