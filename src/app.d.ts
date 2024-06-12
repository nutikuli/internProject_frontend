// See https://kit.svelte.dev/docs/types#app

import type { UserToken } from '$lib/pkg/utils/cookies';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			account_token: {
				account: {
					id: number;
					role: string;
				};
				token: UserToken;
			};
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
