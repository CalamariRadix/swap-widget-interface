// Reexport your entry components here

export interface TokenInfo {
    symbol: string;
    name?: string;
    address: string;
    iconUrl?: string;
}

export { InnerSwapWidgetInterface } from './innerInterface.svelte';
export { OuterSwapWidgetInterface } from './outerInterface.js';