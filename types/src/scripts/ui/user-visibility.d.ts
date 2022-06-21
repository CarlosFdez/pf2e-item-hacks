/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ChatMessagePF2e } from "@module/chat-message";
declare const UserVisibilityPF2e: {
    /** Edits HTML live based on permission settings. Used to hide certain blocks and values */
    process: ($html: JQuery, { message }?: ProcessOptions) => void;
};
declare type UserVisibility = "all" | "owner" | "gm" | "none";
interface ProcessOptions {
    message?: ChatMessagePF2e;
}
export { UserVisibilityPF2e, UserVisibility };
