/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ColorButton } from '../src';

export default {
  title: 'Components|ColorButton',
  parameters: { component: ColorButton, componentSubtitle: 'Displays a button filled with a color' },
};

const style = { padding: '48px' };

export const Basic = () => (
  <div style={style}>
    <ColorButton color="" style={{ minWidth: 0, right: '0px', background: 0, padding: 1 }} />
  </div>
);
Basic.story = {
  parameters: { color: '' },
};

export const Tooltip = () => (
  <div style={style}>
    <ColorButton color="#ff0000" tooltip="red" style={{ minWidth: 0, right: '0px', background: 0, padding: 1 }} />
  </div>
);
Tooltip.story = {
  parameters: { color: '#ff0000', tooltip: 'red' },
};

export const Border = () => (
  <div style={style}>
    <ColorButton color="red" borderWidth={1} style={{ minWidth: 0, right: '0px', background: 0, padding: 1 }} />
  </div>
);
Border.story = {
  parameters: { color: 'red', borderWidth: 1 },
};
