import {configure} from '@storybook/react';
import { setOptions } from '@storybook/addon-options';


setOptions({
  name: 'react-datasheet-ex',
  url: 'https://github.com/patrick-jones/react-datasheet-ex',
  addonPanelInRight: true,
});

function loadStories() {
  require('../src/stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
