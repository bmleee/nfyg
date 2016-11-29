import { composeDecorators } from 'draft-js-plugins-editor';

import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createDndPlugin from 'draft-js-dnd-plugin';

import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const dndPlugin = createDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  dndPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator });

export default imagePlugin;

export {
	focusPlugin,
	resizeablePlugin,
	dndPlugin,
	alignmentPlugin,
}
