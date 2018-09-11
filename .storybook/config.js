import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'storybook',
  url: 'https://github.com/storybooks/storybook',
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: false
});

const req = require.context('../src/stories', true, /story\.tsx?$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
