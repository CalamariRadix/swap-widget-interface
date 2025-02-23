import type { InnerToOuterMessage } from "./innerEventTypes.js";
import type { HandshakeResponseEvent, OuterEventHandlers, OuterToInnerMessage, TransactionResponseEvent, WalletStateUpdateEvent } from "./outerEventTypes.js";

export class OuterSwapWidgetInterface {
    private handlers: OuterEventHandlers = {};
    private window: Window;
    constructor(InnerWindow: Window) {
        this.window = InnerWindow;
    }

    startListening() {
        window.addEventListener('message', this.onMessage.bind(this));
    }

    private onMessage(event: MessageEvent) {
        const data = event.data as InnerToOuterMessage;

        switch (data?.type) {
            case 'WIDGET_STATE_UPDATE':
                this.handlers.onWidgetStateUpdateEvent?.(data);
                break;
            case 'TRANSACTION_REQUEST':
                this.handlers.onTransactionRequestEvent?.(data);
                break;
            case 'INITIATE_HANDSHAKE':
                this.handlers.onInitiateHandshakeEvent?.(data);
                break;
            default:
                // Ignore other messages or handle additional types
                break;
        }
    }

    setHandlers(handlers: OuterEventHandlers) {
        this.handlers = handlers;
    }

    sendHandshakeResponse() {
        const event: HandshakeResponseEvent = {
            type: 'HANDSHAKE_RESPONSE'
        }
        sendPostMessageToInner(this.window, event);
    }

    sendWalletStateUpdate(body: WalletStateUpdateEvent['body']) {
        const event: WalletStateUpdateEvent = {
            type: 'WALLET_STATE_UPDATE',
            body
        }
        sendPostMessageToInner(this.window, event);
    }

    sendTransactionResponse(body: TransactionResponseEvent['body']) {
        const event: TransactionResponseEvent = {
            type: 'TRANSACTION_RESPONSE',
            body
        }
        sendPostMessageToInner(this.window, event);
    }
}

function sendPostMessageToInner(window: Window, message: OuterToInnerMessage) {
    window.postMessage(message, '*');
}