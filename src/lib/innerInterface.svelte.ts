import type { InitiateHandshakeEvent, InnerEventHandlers, InnerToOuterMessage, TransactionRequestEvent, WidgetStateUpdateEvent } from "./innerEventTypes.js";
import type { OuterToInnerMessage } from "./outerEventTypes.js";

export class InnerSwapWidgetInterface {
    private handlers: InnerEventHandlers = {};
    constructor() {
        $effect(() => {
            window.addEventListener('message', this.onMessage.bind(this));
        })
    }

    private onMessage(event: MessageEvent) {
        const data = event.data as OuterToInnerMessage;

        switch (data?.type) {
            case 'WALLET_STATE_UPDATE':
                this.handlers.onWalletStateUpdateEvent?.(data);
                break;

            case 'TRANSACTION_RESPONSE':
                this.handlers.onTransactionResponseEvent?.(data);
                break;
            case 'HANDSHAKE_RESPONSE':
                this.handlers.onHandshakeResponseEvent?.(data);
                break;
            default:
                // Ignore other messages
                break;
        }
    }

    setHandlers(handlers: InnerEventHandlers) {
        this.handlers = handlers;
    }

    sendHandshake() {
        const event: InitiateHandshakeEvent = {
            type: 'INITIATE_HANDSHAKE'
        }
        sendPostMessageToOuter(event);
    }

    sendTransactionRequest(body: TransactionRequestEvent["body"]) {
        const event: TransactionRequestEvent = {
            type: 'TRANSACTION_REQUEST',
            body
        };
        sendPostMessageToOuter(event);
    }

    sendWidgetStateUpdate(body: WidgetStateUpdateEvent['body']) {
        const event: WidgetStateUpdateEvent = {
            type: 'WIDGET_STATE_UPDATE',
            body
        }
        sendPostMessageToOuter(event);
    }
}

function sendPostMessageToOuter(message: InnerToOuterMessage) {
    window.parent.postMessage($state.snapshot(message), '*');
}