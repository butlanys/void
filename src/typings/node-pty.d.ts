/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// Type extensions for node-pty to support VS Code specific features

declare module 'node-pty' {
	export interface IWindowsPtyForkOptions {
		/**
		 * Whether to use the experimental conpty.dll shipped with VS Code,
		 * instead of the one bundled with Windows.
		 */
		useConptyDll?: boolean;
	}
}
