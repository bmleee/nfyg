import LRU from 'lru-cache';

const options = {
	max: 500,
	length: function (n, key) { return n * 2 + key.length },
	dispose: function (key, n) { n.close() },
	maxAge: 1000 * 60 * 60
};

const cache = LRU(options);

export default cache;
