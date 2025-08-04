import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 }); // in secs, should move to env
export default cache;