import createLinkifyPlugin from 'draft-js-linkify-plugin'; // eslint-disable-line import/no-unresolved
import 'draft-js-linkify-plugin/lib/plugin.css'; // eslint-disable-line import/no-unresolved

const linkifyPlugin = createLinkifyPlugin({
  // component: (props) => (
  //   <a {...props} onClick={() => alert('Clicked on Link!')} />
  // )
	target: '_blank'
});

export default linkifyPlugin
