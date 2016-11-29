import createUndoPlugin from 'draft-js-undo-plugin'; // eslint-disable-line import/no-unresolved
import 'draft-js-undo-plugin/lib/plugin.css'; // eslint-disable-line import/no-unresolved

const undoPlugin = createUndoPlugin();
export default undoPlugin;
