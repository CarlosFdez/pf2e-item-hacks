import { ActionCost, BaseItemDataPF2e, BaseItemSourcePF2e, ItemLevelData, ItemSystemData, ItemSystemSource, ItemTraits } from "../data/base";
import type { PhysicalItemPF2e } from "@item/physical";
import type { ITEM_CARRY_TYPES, PHYSICAL_ITEM_TYPES } from "../data/values";
import { EquipmentTrait } from "@item/equipment/data";
import { ArmorTrait } from "@item/armor/data";
import { WeaponTrait } from "@item/weapon/data";
import { ConsumableTrait } from "@item/consumable/data";
import { Size, ValuesList } from "@module/data";
import { ActionTrait } from "@item/action/data";
import { UsageDetails } from "./usage";
import { PreciousMaterialGrade, PreciousMaterialType } from "./types";
declare type ItemCarryType = SetElement<typeof ITEM_CARRY_TYPES>;
declare type BasePhysicalItemSource<TType extends PhysicalItemType = PhysicalItemType, TSystemSource extends PhysicalSystemSource = PhysicalSystemSource> = BaseItemSourcePF2e<TType, TSystemSource>;
declare type BasePhysicalItemData<TItem extends PhysicalItemPF2e = PhysicalItemPF2e, TType extends PhysicalItemType = PhysicalItemType, TSystemData extends PhysicalSystemData = PhysicalSystemData, TSource extends BasePhysicalItemSource<TType> = BasePhysicalItemSource<TType>> = Omit<BasePhysicalItemSource, "data" | "effects" | "flags"> & BaseItemDataPF2e<TItem, TType, TSystemData, TSource>;
declare type PhysicalItemType = SetElement<typeof PHYSICAL_ITEM_TYPES>;
interface PhysicalSystemSource extends ItemSystemSource, ItemLevelData {
    traits: PhysicalItemTraits;
    quantity: number;
    baseItem: string | null;
    hp: PhysicalItemHitPoints;
    hardness: number;
    weight: {
        value: string;
    };
    equippedBulk: {
        value: string;
    };
    unequippedBulk: {
        value: string;
    };
    price: PartialPrice;
    equipped: EquippedData;
    identification: IdentificationData;
    stackGroup: string | null;
    negateBulk: {
        value: string;
    };
    containerId: string | null;
    preciousMaterial: {
        value: Exclude<PreciousMaterialType, "dragonhide" | "grisantian-pelt"> | null;
    };
    preciousMaterialGrade: {
        value: PreciousMaterialGrade | null;
    };
    size: Size;
    usage: {
        value: string;
    };
    activations?: Record<string, ItemActivation>;
    temporary?: boolean;
}
interface PhysicalSystemData extends PhysicalSystemSource, ItemSystemData {
    price: Price;
    traits: PhysicalItemTraits;
    temporary: boolean;
    usage: UsageDetails;
}
declare type Investable<TData extends PhysicalSystemData | PhysicalSystemSource> = TData & {
    equipped: {
        invested: boolean | null;
    };
};
interface ActivatedEffectData {
    activation: {
        type: string;
        cost: number;
        condition: string;
    };
    duration: {
        value: unknown;
        units: string;
    };
    target: {
        value: unknown;
        units: string;
        type: string;
    };
    range: {
        value: unknown;
        long: unknown;
        units: unknown;
    };
    uses: {
        value: number;
        max: number;
        per: number;
    };
}
declare type IdentificationStatus = "identified" | "unidentified";
interface MystifiedData {
    name: string;
    img: string;
    data: {
        description: {
            value: string;
        };
    };
}
declare type IdentifiedData = DeepPartial<MystifiedData>;
interface IdentificationData {
    status: IdentificationStatus;
    identified: MystifiedData;
    unidentified: MystifiedData;
    misidentified: {};
}
declare type EquippedData = {
    carryType: ItemCarryType;
    inSlot?: boolean;
    handsHeld?: number;
    invested?: boolean | null;
};
declare type PhysicalItemTrait = ArmorTrait | ConsumableTrait | EquipmentTrait | WeaponTrait;
declare type PhysicalItemTraits<T extends PhysicalItemTrait = PhysicalItemTrait> = ItemTraits<T>;
interface ItemActivation {
    id: string;
    description: {
        value: string;
    };
    actionCost: ActionCost;
    components: {
        command: boolean;
        envision: boolean;
        interact: boolean;
        cast: boolean;
    };
    frequency: {
        value: number;
        max: number;
        /** Gap between recharges as an ISO8601 duration, or "day" for daily prep. */
        duration: null | keyof ConfigPF2e["PF2E"]["frequencies"];
    };
    traits: ValuesList<ActionTrait>;
}
interface PhysicalItemHitPoints {
    value: number;
    max: number;
    brokenThreshold: number;
}
interface Coins {
    pp: number;
    gp: number;
    sp: number;
    cp: number;
}
interface PartialPrice {
    value: Partial<Coins>;
    per?: number;
}
interface Price extends PartialPrice {
    value: Coins;
    per: number;
}
export { ActivatedEffectData, BasePhysicalItemData, BasePhysicalItemSource, Coins, EquippedData, IdentificationData, IdentificationStatus, IdentifiedData, Investable, ItemActivation, ItemCarryType, MystifiedData, PartialPrice, PhysicalItemHitPoints, PhysicalItemTrait, PhysicalItemTraits, PhysicalItemType, PhysicalSystemData, PhysicalSystemSource, Price, };