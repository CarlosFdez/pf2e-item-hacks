type PhysicalItemType = "armor" | "backpack" | "book" | "consumable" | "equipment" | "treasure" | "weapon";
type NonPhysicalItemType = "action" | "ancestry" | "background" | "class" | "condition" | "deity" | "effect" | "feat" | "heritage" | "kit" | "lore" | "melee" | "spell" | "spellcastingEntry";
type ItemType = keyof ConfigPF2e["PF2E"]["Item"]["documentClasses"];

interface ItemPF2e extends Item<ActorPF2e> {
    get slug(): string | null;
    /** The compendium source ID of the item **/
    get sourceId(): ItemUUID | null;

    isOfType(type: "physical"): this is PhysicalItemPF2e;
    isOfType<T extends ItemType>(...types: T[]): this is InstanceType<ConfigPF2e["PF2E"]["Item"]["documentClasses"][T]>;
}

interface ActionItemPF2e extends ItemPF2e {}

interface AncestryPF2e extends ItemPF2e {}

interface BackgroundPF2e extends ItemPF2e {}

interface ClassPF2e extends ItemPF2e {}

interface ConditionPF2e extends ItemPF2e {}

interface DeityPF2e extends ItemPF2e {}

interface EffectPF2e extends ItemPF2e {}

interface FeatPF2e extends ItemPF2e {}

interface HeritagePF2e extends ItemPF2e {}

interface KitPF2e extends ItemPF2e {}

interface MeleePF2e extends ItemPF2e {}

interface SpellPF2e extends ItemPF2e {}

interface SpellcastingEntryPF2e extends ItemPF2e {}


