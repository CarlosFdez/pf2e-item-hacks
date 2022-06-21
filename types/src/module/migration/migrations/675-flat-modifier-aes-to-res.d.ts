import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Convert experimental FlatModifier `ActiveEffect`s to Rule Elements */
export declare class Migration675FlatModifierAEsToREs extends MigrationBase {
    static version: number;
    private isFlatModifier;
    private toRuleElement;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
