export function* range(from, until = 0) {
	if (from > until) [from, until] = [until, from];

	for(let i = from; i < until; i++) yield i;
}
