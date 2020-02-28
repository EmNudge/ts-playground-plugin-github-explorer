import { writable } from 'svelte/store';

export const userRepoStore = writable([]);
export const folderHistoryStore = writable([]);

export const didMount = writable({});
export const modelChanged = writable({});
export const modelChangedDebounce = writable({});
export const willUnmount = writable({});
export const didUnmount = writable({});