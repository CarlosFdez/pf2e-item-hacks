import { ActorPF2e } from "@actor/base";
import { LootPF2e } from "@actor/loot";
import { BookData } from "@item/book";
import { getContainerMap } from "@item/container/helpers";
import { ArmorData, ConsumableData, EquipmentData, PhysicalItemData, TreasureData, WeaponData } from "@item/data";
import { Coins, IdentificationData, MystifiedData, PartialPrice } from "@item/physical/data";
import { SheetOptions } from "@module/sheet/helpers";
declare type ContainerMap = ReturnType<typeof getContainerMap>;
declare type SheetContainerData = ContainerMap extends Map<string, infer X> ? X : never;
export declare type InventoryItem<D extends PhysicalItemData = PhysicalItemData> = D & {
    canBeEquipped: boolean;
    containerData: SheetContainerData;
    isContainer: boolean;
    isIdentified: boolean;
    isInContainer: boolean;
    isSellableTreasure?: boolean;
    showEdit: boolean;
    price: PartialPrice & {
        label: string;
    };
    totalWeight: string;
    data: D["data"] & {
        identification: IdentificationData & {
            identified: MystifiedData;
        };
    };
};
interface CoinDisplayData {
    value: number;
    label: string;
}
export declare type CoinageSummary = {
    [K in keyof Coins]?: CoinDisplayData;
};
interface SheetItemList<D extends PhysicalItemData> {
    label: string;
    type: D["type"];
    items: InventoryItem<D>[];
}
export interface SheetInventory {
    weapon: SheetItemList<WeaponData>;
    armor: SheetItemList<ArmorData>;
    equipment: SheetItemList<EquipmentData | BookData>;
    consumable: SheetItemList<ConsumableData>;
    treasure: SheetItemList<TreasureData>;
}
export interface ActorSheetDataPF2e<TActor extends ActorPF2e> extends ActorSheetData<TActor> {
    traits: SheetOptions;
    isTargetFlatFooted: boolean;
    user: {
        isGM: boolean;
    };
    hasRealContainers?: boolean;
    totalCoinage: CoinageSummary;
    totalCoinageGold: string;
    totalWealth: Partial<Coins>;
    totalWealthGold: string;
    immunities: SheetOptions;
    hasImmunities: boolean;
}
export interface LootSheetDataPF2e extends ActorSheetDataPF2e<LootPF2e> {
    isLoot: boolean;
}
export {};