import { ItemPF2e } from "@item/base";
import { MeleeData, NPCAttackTrait } from "./data";
export declare class MeleePF2e extends ItemPF2e {
    get traits(): Set<NPCAttackTrait>;
    getChatData(this: Embedded<MeleePF2e>, htmlOptions?: EnrichHTMLOptions): Record<string, unknown>;
}
export interface MeleePF2e {
    readonly data: MeleeData;
}
