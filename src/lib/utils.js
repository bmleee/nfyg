export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const throttle = (f, wait) => {
	let context, args, preArgs, argsChanged, result;
	let previous = 0;

	return function() {
		let now, remaining;

		if(wait) {
			now = Date.now();
			remaining = wait - (now - previous);
		}

		context = this;
		args = arguments;
		argsChanged = JSON.stringify(args) != JSON.stringify(preArgs);
		preArgs = Object.assign({}, args);

		if(argsChanged || wait && (remaining <= 0 || remaining > wait)) {
			if(wait) previous = now;

			result = f.apply(context, args);
			context = args = null;

			return result;
		}
	};
}

export const range = function* (from, until = 0) {
  if (from > until) [from, until] = [until, from];
  for (var i = from; i < until; i++) yield i;
}

export const rangeArray = (from, until = 0) => {
  if (from > until) [from, until] = [until, from];
  return Array.from({length: until - from}, () => from++)
}

export const asyncparallelfor = async function (iterator, fun) {
  return await Promise.all(iterator.map(
    async (e) => await fun(e)
  ))
}
