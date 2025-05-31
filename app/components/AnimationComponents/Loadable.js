/**
 * Asynchronously loads the component for AnimationComponents
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
