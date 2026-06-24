"use client";

import {useCallback, useRef} from "react";

export function useDebounce<Args extends unknown[]>(
	fn: (...args: Args) => void,
	delay: number,
) {
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const debounced = useCallback(
		(...args: Args) => {
			if (timerRef.current) clearTimeout(timerRef.current);
			timerRef.current = setTimeout(() => fn(...args), delay);
		},
		[fn, delay],
	);

	const flush = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	return {debounced, flush};
}
