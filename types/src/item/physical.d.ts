type PreciousMaterialGrade = "high" | "low" | "standard";
type ItemCarryType = "held" | "worn" | "stowed" | "dropped";

interface PhysicalItemPF2e extends ItemPF2e {
    readonly data: BasePhysicalItemData;
    get level(): number;
    get rarity(): Rarity;
    get traits(): Set<string>;
    get quantity(): number;
    get size(): Size;
    get isEquipped(): boolean;
    get carryType(): ItemCarryType;
    get handsHeld(): number;
    get isHeld(): boolean;
    get price(): Price;
    /** The monetary value of the entire item stack */
    get assetValue(): CoinsPF2e;
    get identificationStatus(): IdentificationStatus;
    get isIdentified(): boolean;
    get isAlchemical(): boolean;
    get isMagical(): boolean;
    get isInvested(): boolean | null;
    get isCursed(): boolean;
    get isTemporary(): boolean;
    get isDamaged(): boolean;
}

interface ArmorPF2e extends PhysicalItemPF2e {}

interface ContainerPF2e extends PhysicalItemPF2e {}

interface BookPF2e extends PhysicalItemPF2e {}

interface ConsumablePF2e extends PhysicalItemPF2e {
    get consumableType(): string;
    get isAmmunition(): boolean;
}

interface EquipmentPF2e extends PhysicalItemPF2e {}

interface TreasurePF2e extends PhysicalItemPF2e {}

interface WeaponPF2e extends PhysicalItemPF2e {
    readonly data: WeaponData;
    /** Generate a weapon name base on precious-material composition and runes */
    generateMagicName(): string;
    processMaterialAndRunes(): void;
}

declare type BasePhysicalItemSource<TType extends PhysicalItemType = PhysicalItemType, TSystemSource extends PhysicalSystemSource = PhysicalSystemSource> = BaseItemSourcePF2e<TType, TSystemSource>;
declare type BasePhysicalItemData<TItem extends PhysicalItemPF2e = PhysicalItemPF2e, TType extends PhysicalItemType = PhysicalItemType, TSystemData extends PhysicalSystemData = PhysicalSystemData, TSource extends BasePhysicalItemSource<TType> = BasePhysicalItemSource<TType>> = Omit<BasePhysicalItemSource, "data" | "effects" | "flags"> & BaseItemDataPF2e<TItem, TType, TSystemData, TSource>;
type PhysicalItemTraits = ItemTraits;
interface PhysicalSystemSource extends ItemSystemSource, ItemLevelData {
    quantity: number;
    baseItem: string | null;
    hp: PhysicalItemHitPoints;
    hardness: number;
    weight: {
        value: string;
    };
    equippedBulk: {
        value: string | null;
    };
    /** This is unused, remove when inventory bulk refactor is complete */
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
        value: Exclude<string, "dragonhide" | "grisantian-pelt"> | null;
    };
    preciousMaterialGrade: {
        value: PreciousMaterialGrade | null;
    };
    size: Size;
    usage: {
        value: string;
    };
    temporary?: boolean;
}
interface PhysicalSystemData extends PhysicalSystemSource, ItemSystemData {
    price: Price;
    bulk: BulkData;
    traits: ItemTraits;
    temporary: boolean;
    usage: UsageDetails;
}
type Investable<TData extends PhysicalSystemData | PhysicalSystemSource> = TData & {
    equipped: {
        invested: boolean | null;
    };
};
/** The item's bulk in Light bulk units, given the item is of medium size */
interface BulkData {
    /** Held or stowed bulk */
    heldOrStowed: number;
    /** Worn bulk, if different than when held or stowed */
    worn: number | null;
    /** The applicable bulk value between the above two */
    value: number;
    /** The quantity of this item necessary to amount to the above bulk quantities: anything less is negligible */
    per: number;
}
interface HeldUsage {
    value: string;
    type: "held";
    hands: number;
}
interface WornUsage {
    value: string;
    type: "worn";
    where?: string | null;
    hands?: 0;
}
type UsageDetails = HeldUsage | WornUsage;

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

interface PhysicalItemHitPoints {
    value: number;
    max: number;
    brokenThreshold: number;
}
interface Coins {
    pp?: number;
    gp?: number;
    sp?: number;
    cp?: number;
}
interface PartialPrice {
    value: Coins;
    per?: number;
}
interface Price extends PartialPrice {
    value: CoinsPF2e;
    per: number;
}
type BaseMaterialType = "cloth" | "glass" | "leather" | "paper" | "rope" | "steel" | "stone" | "wood";
type BaseMaterialThickness = "thin" | "standard" | "structure";
type BaseMaterial = { type: BaseMaterialType; thickness: BaseMaterialThickness };


interface WeaponSourceTraits extends PhysicalItemTraits {
    otherTags?: string[];
}
type WeaponTraits = Required<WeaponSourceTraits>;

type WeaponCategory = "unarmed" | "simple" | "martial" | "advanced";
type StrikingRuneType = "striking" | "greaterStriking" | "majorStriking";

type WeaponSource = BasePhysicalItemSource<"weapon", WeaponSystemSource>;

type WeaponData = Omit<WeaponSource, "data" | "effects" | "flags"> &
    BasePhysicalItemData<WeaponPF2e, "weapon", WeaponSystemData, WeaponSource>;

interface WeaponDamage {
    value: string;
    dice: number;
    die: DamageDieSize;
    damageType: DamageType;
    modifier: number;
}

interface WeaponPropertyRuneSlot {
    value: string | null;
}

interface ComboWeaponMeleeUsage {
    damage: { type: DamageType; die: DamageDieSize };
    group: string;
    traits: string[];
}

interface WeaponRuneData {
    potency: OneToFour | null;
    striking: StrikingRuneType | null;
    property: Record<OneToFour, WeaponPropertyRuneType | null>;
}

/** A weapon can either be unspecific or specific along with baseline material and runes */
type SpecificWeaponData =
    | {
          value: false;
      }
    | {
          value: true;
          price: string;
          material: {
              type: WeaponMaterialType;
              grade: PreciousMaterialGrade;
          };
          runes: Omit<WeaponRuneData, "property">;
      };

interface WeaponSystemSource extends Investable<PhysicalSystemSource> {
    traits: WeaponSourceTraits;
    category: WeaponCategory;
    group: string | null;
    baseItem: string | null;
    bonus: {
        value: number;
    };
    damage: WeaponDamage;
    bonusDamage?: {
        value: string;
    };
    splashDamage?: {
        value: string;
    };
    range: number | null;
    reload: {
        value: WeaponReloadTime | null;
    };
    usage: {
        value: "worngloves" | "held-in-one-hand" | "held-in-one-plus-hands" | "held-in-two-hands";
    };
    MAP: {
        value: string;
    };
    /** A combination weapon's melee usage */
    meleeUsage?: ComboWeaponMeleeUsage;
    /** Whether the weapon is a "specific magic weapon" */
    specific?: SpecificWeaponData;
    potencyRune: {
        value: OneToFour | null;
    };
    strikingRune: {
        value: StrikingRuneType | null;
    };
    propertyRune1: WeaponPropertyRuneSlot;
    propertyRune2: WeaponPropertyRuneSlot;
    propertyRune3: WeaponPropertyRuneSlot;
    propertyRune4: WeaponPropertyRuneSlot;
    preciousMaterial: {
        value: string | null;
    };

    // Refers to custom damage, *not* property runes
    property1: {
        value: string;
        dice: number;
        die: string;
        damageType: string;
        critDice: number;
        critDie: string;
        critDamage: string;
        critDamageType: string;
    };
    selectedAmmoId: string | null;
}

interface WeaponSystemData extends Omit<WeaponSystemSource, "price" | "temporary" | "usage">, Investable<PhysicalSystemData> {
    baseItem: BaseWeaponType | null;
    traits: WeaponTraits;
    reload: {
        value: WeaponReloadTime | null;
        /** Whether the ammunition (or the weapon itself, if thrown) should be consumed upon firing */
        consume: boolean | null;
    };
    runes: {
        potency: number;
        striking: ZeroToThree;
        property: WeaponPropertyRuneType[];
        effects: [];
    };
    material: WeaponMaterialData;
    usage: UsageDetails & WeaponSystemSource["usage"];
}

interface WeaponMaterialData {
    /** The "base material" or category: icon/steel (metal), wood, rope, etc. */
    base: BaseMaterial[];
    /** The precious material of which this weapon is composed */
    precious: {
        type: WeaponMaterialType;
        grade: PreciousMaterialGrade;
    } | null;
}
