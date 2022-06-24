interface ActorSheetPF2e<TActor extends ActorPF2e> extends ActorSheet<TActor> {
    getData(options: ActorSheetOptions): Promise<ActorSheetDataPF2e<this["actor"]>>;
}
interface LootSheetPF2e extends ActorSheet<LootPF2e> {}
interface CreatureSheetPF2e<TActor extends CreaturePF2e> extends ActorSheetPF2e<TActor> {}
interface CharacterSheetPF2e extends CreatureSheetPF2e<CharacterPF2e> {}

interface SheetOption {
    value: string;
    label: string;
    selected: boolean;
}
declare type SheetOptions = Record<string, SheetOption>;
interface InventoryItem<D extends PhysicalItemPF2e = PhysicalItemPF2e> {
    item: D;
    editable: boolean;
    isContainer: boolean;
    canBeEquipped: boolean;
    isInvestable: boolean;
    isSellable: boolean;
    hasCharges: boolean;
    heldItems?: InventoryItem[];
}
interface CoinDisplayData {
    value: number;
    label: string;
}
declare type CoinageSummary = {
    [K in keyof Coins]?: CoinDisplayData;
};
interface SheetItemList {
    label: string;
    type: PhysicalItemType;
    items: InventoryItem[];
    invested?: {
        value: number;
        max: number;
    } | null;
    overInvested?: boolean;
}
interface SheetInventory {
    sections: Record<Exclude<PhysicalItemType, "book">, SheetItemList>;
    bulk: InventoryBulk;
}
interface ActorSheetDataPF2e<TActor extends ActorPF2e> extends ActorSheetData<TActor> {
    traits: SheetOptions;
    isTargetFlatFooted: boolean;
    user: {
        isGM: boolean;
    };
    totalCoinage: CoinageSummary;
    totalCoinageGold: string;
    totalWealth: Coins;
    totalWealthGold: string;
    immunities: SheetOptions;
    hasImmunities: boolean;
    inventory: SheetInventory;
}
