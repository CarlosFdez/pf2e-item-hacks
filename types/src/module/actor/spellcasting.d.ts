import { ActorPF2e } from "@actor";
import { ConsumablePF2e, SpellcastingEntryPF2e } from "@item";
export declare class ActorSpellcasting extends Collection<SpellcastingEntryPF2e> {
    readonly actor: ActorPF2e;
    constructor(actor: ActorPF2e, entries?: SpellcastingEntryPF2e[]);
    /** Returns a list of entries pre-filtered to SpellcastingEntryPF2e */
    get regular(): SpellcastingEntryPF2e[];
    /**
     * All spellcasting entries that count as prepared/spontaneous, which qualify as a
     * full fledged spellcasting feature for wands and scrolls.
     */
    get spellcastingFeatures(): SpellcastingEntryPF2e[];
    canCastConsumable(item: ConsumablePF2e): boolean;
    refocus(options?: {
        all?: boolean;
    }): {
        "data.resources.focus.value": number;
    } | null;
    /** Recharges all spellcasting entries based on the type of entry it is */
    recharge(): {
        itemUpdates: ((Record<string, unknown> & {
            _id: string;
        }) | (Partial<import("../item/armor/data").ArmorSource> & {
            _id: string;
        }) | (Partial<import("../item/book/data").BookSource> & {
            _id: string;
        }) | (Partial<import("../item/consumable/data").ConsumableSource> & {
            _id: string;
        }) | (Partial<import("../item/container/data").ContainerSource> & {
            _id: string;
        }) | (Partial<import("../item/equipment/data").EquipmentSource> & {
            _id: string;
        }) | (Partial<import("../item/treasure/data").TreasureSource> & {
            _id: string;
        }) | (Partial<import("../item/weapon/data/types").WeaponSource> & {
            _id: string;
        }) | (Partial<import("../item/action/data").ActionSource> & {
            _id: string;
        }) | (Partial<import("../item/ancestry/data").AncestrySource> & {
            _id: string;
        }) | (Partial<import("../item/background/data").BackgroundSource> & {
            _id: string;
        }) | (Partial<import("../item/class/data").ClassSource> & {
            _id: string;
        }) | (Partial<import("../item/condition/data").ConditionSource> & {
            _id: string;
        }) | (Partial<import("../item/deity/data").DeitySource> & {
            _id: string;
        }) | (Partial<import("../item/effect/data").EffectSource> & {
            _id: string;
        }) | (Partial<import("../item/feat/data").FeatSource> & {
            _id: string;
        }) | (Partial<import("../item/heritage/data").HeritageSource> & {
            _id: string;
        }) | (Partial<import("../item/kit/data").KitSource> & {
            _id: string;
        }) | (Partial<import("../item/lore/data").LoreSource> & {
            _id: string;
        }) | (Partial<import("../item/data").MeleeSource> & {
            _id: string;
        }) | (Partial<import("../item/spellcasting-entry/data/types").SpellcastingEntrySource> & {
            _id: string;
        }) | (Partial<import("../item/spell/data/types").SpellSource> & {
            _id: string;
        }))[];
        actorUpdates: {
            "data.resources.focus.value": number;
        } | null;
    };
}
