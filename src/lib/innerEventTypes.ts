import type { TokenInfo } from "./index.js";
import type { HandshakeResponseEvent, TransactionResponseEvent, WalletStateUpdateEvent } from "./outerEventTypes.js";

// Inner → Outer: This message requests a transaction to be performed.
export interface TransactionRequestEvent {
    type: 'TRANSACTION_REQUEST';
    transactionId: string;
    body: {
        manifest: string;
        message: string;
    }
}

// Inner → Outer: This message updates the Outer on the state of the widget.
export interface WidgetStateUpdateEvent {
    type: 'WIDGET_STATE_UPDATE';
    body: {
        fromToken: TokenInfo
        toToken: TokenInfo
        fromAmount: string
        toAmount: string | null
    }
}

export interface InitiateHandshakeEvent {
    type: 'INITIATE_HANDSHAKE';
}

//  Inner → Outer: The iframe can send either of these message types.
export type InnerToOuterMessage =
    | WidgetStateUpdateEvent
    | TransactionRequestEvent
    | InitiateHandshakeEvent;

// Event handlers for the Outer
export interface InnerEventHandlers {
    onWalletStateUpdateEvent?: (event: WalletStateUpdateEvent) => void;
    onTransactionResponseEvent?: (event: TransactionResponseEvent) => void;
    onHandshakeResponseEvent?: (event: HandshakeResponseEvent) => void;
}
