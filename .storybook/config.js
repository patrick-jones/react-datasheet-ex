import React from 'react';
import {configure, addDecorator} from '@storybook/react';
import {setOptions} from '@storybook/addon-options';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


setOptions({
  name: 'react-datasheet-ex',
  url: 'https://github.com/patrick-jones/react-datasheet-ex',
  addonPanelInRight: true,
});

addDecorator(story => (
  <DragDropContextProvider backend={HTML5Backend}>
    {story()}
  </DragDropContextProvider>
));

function loadStories() {
  require('../src/stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
