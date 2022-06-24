interface ValuesList<T extends string = string> {
    value: T[];
    custom: string;
}

/** Literal numeric types */
type ZeroToTwo = 0 | 1 | 2;
type ZeroToThree = ZeroToTwo | 3; // +1!
type OneToThree = Exclude<ZeroToThree, 0>;
type TwoToThree = Exclude<OneToThree, 1>;
type ZeroToFour = ZeroToThree | 4;
type OneToFour = Exclude<ZeroToFour, 0>;
type ZeroToFive = ZeroToFour | 5;
type OneToFive = OneToThree | Extract<ZeroToFive, 4 | 5>;
type ZeroToTen = ZeroToFive | 6 | 7 | 8 | 9 | 10;
type OneToTen = Exclude<ZeroToTen, 0>;
type ZeroToEleven = ZeroToTen | 11;
// Sorry

interface ValueAndMaybeMax {
    value: number;
    max?: number;
}
type ValueAndMax = Required<ValueAndMaybeMax>;

interface LabeledValue {
    label: string;
    value: number | string;
    type: string;
    exceptions?: string;
}

interface LabeledNumber extends LabeledValue {
    value: number;
}

interface LabeledType extends LabeledNumber {
    type: string;
}

type Rarity = "common" | "uncommon" | "rare" | "unique";
type Size = "tiny" | "sm" | "med" | "lg" | "huge" | "grg";

type DamageType = string;
type DamageDieSize = "d10" | "d12" | "d4" | "d6" | "d8";
type WeaponMaterialType = string;
type WeaponPropertyRuneType = string;
type WeaponReloadTime = `${number}` | "-" ;
type BaseWeaponType = string;

type Bulk = unknown; // not implemented

declare class InventoryBulk {
    /** The current bulk carried by the actor */
    value: Bulk;
    /** The number of Bulk units the actor is encumbered at */
    encumberedAt: number;
    /** The maximum bulk the actor can carry */
    max: number;
    constructor(actor: ActorPF2e);
    get encumberedPercentage(): number;
    get maxPercentage(): number;
    get maxPercentageInteger(): number;
    get isEncumbered(): boolean;
    get isOverMax(): boolean;
    get bulk(): number;
    static computeTotalBulk(items: PhysicalItemPF2e[], actorSize: Size): Bulk;
    /** Non-stowing containers are not "real" and thus shouldn't split stack groups */
    private static flattenNonStowing;
}
