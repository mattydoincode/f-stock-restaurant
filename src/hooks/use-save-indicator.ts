"use client";

import {useCallback, useRef, useState} from "react";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export function useSaveIndicator() {
	const [status, setStatus] = useState<SaveStatus>("idle");
	const [errorMessage, setErrorMessage] = useState("");
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const clearTimer = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	const markSaving = useCallback(() => {
		clearTimer();
		setStatus("saving");
		setErrorMessage("");
	}, [clearTimer]);

	const markSaved = useCallback(() => {
		clearTimer();
		setStatus("saved");
		timerRef.current = setTimeout(() => setStatus("idle"), 2000);
	}, [clearTimer]);

	const markError = useCallback(
		(msg = "Save failed") => {
			clearTimer();
			setStatus("error");
			setErrorMessage(msg);
			timerRef.current = setTimeout(() => setStatus("idle"), 5000);
		},
		[clearTimer],
	);

	return {status, errorMessage, markSaving, markSaved, markError};
}
