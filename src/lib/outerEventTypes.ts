import type { InitiateHandshakeEvent, TransactionRequestEvent, WidgetStateUpdateEvent } from "./innerEventTypes.js";

// Outer → Inner: This message updates the Inner on wallet state changes.
export interface WalletStateUpdateEvent {
    type: 'WALLET_STATE_UPDATE';
    body: {
        connected: boolean;
        accounts: Array<{ label: string; address: string }>;
    }
}

// Outer → Inner: This message notifies the Inner about the result of a transaction request.
export interface TransactionResponseEvent {
    type: 'TRANSACTION_RESPONSE';
    body: {
        transactionId: string;
        success: boolean;
        error?: string;
    }
}

// Outer → Inner: This message is sent by the Outer to the Inner to establish a handshake.
export interface HandshakeResponseEvent {
    type: 'HANDSHAKE_RESPONSE';
}

// Outer → Inner: The Outer can send either of these message types.
export type OuterToInnerMessage =
    | WalletStateUpdateEvent
    | TransactionResponseEvent
    | HandshakeResponseEvent;

export interface OuterEventHandlers {
    onWidgetStateUpdateEvent?: (event: WidgetStateUpdateEvent) => void;
    onTransactionRequestEvent?: (event: TransactionRequestEvent) => void;
    onInitiateHandshakeEvent?: (event: InitiateHandshakeEvent) => void;
}
