type CreatureType = "character" | "familiar" | "npc";
type ActorType = CreatureType | "hazard" | "loot" | "vehicle";

interface BaseActorSourcePF2e<TType extends ActorType = ActorType, TSystemSource extends ActorSystemSource = ActorSystemSource> extends foundry.data.ActorSource<TType, TSystemSource, ItemSourcePF2e> {
    flags: ActorFlagsPF2e;
}

interface BaseActorDataPF2e<TActor extends ActorPF2e = ActorPF2e, TType extends ActorType = ActorType, TSystemData extends ActorSystemData = ActorSystemData, TSource extends BaseActorSourcePF2e<TType> = BaseActorSourcePF2e<TType>> extends Omit<BaseActorSourcePF2e<TType, ActorSystemSource>, "effects" | "items" | "token">, foundry.data.ActorData<TActor, ActiveEffect, ItemPF2e> {
    readonly type: TType;
    readonly data: TSystemData;
    token: PrototypeTokenDataPF2e;
    flags: ActorFlagsPF2e;
    readonly _source: TSource;
}

interface ActorSystemSource {
    details?: {
        level?: {
            value: number;
        };
    };
    attributes: {
        hp?: ValueAndMaybeMax;
    };
    traits?: BaseTraitsSource;
}


interface ActorSystemData extends ActorSystemSource {}

interface PrototypeTokenDataPF2e extends foundry.data.PrototypeTokenData {
    flags: foundry.data.PrototypeTokenData["flags"] & {
        pf2e: {
            linkToActorSize: boolean;
        };
    };
}

interface RollOptionFlags {
    all: Record<string, boolean | undefined>;
    [key: string]: Record<string, boolean | undefined> | undefined;
}

interface ActorFlagsPF2e extends foundry.data.ActorFlags {
    pf2e: {
        favoredWeaponRank: number;
        freeCrafting: boolean;
        quickAlchemy: boolean;
        rollOptions: RollOptionFlags;
        [key: string]: unknown;
    };
}

interface BaseTraitsSource {
    /** The rarity of the actor (common, uncommon, etc.) */
    rarity: Rarity;
    /** The character size (such as 'med'). */
    size: {
        value: Size;
    };
    /** Actual Pathfinder traits */
    traits: ValuesList;
    /** Damage immunities this actor has. */
    di: ValuesList<string>;
    /** Damage resistances that this actor has. */
    dr: LabeledType[];
    /** Damage vulnerabilities that this actor has. */
    dv: LabeledType[];
}
interface BaseTraitsData extends BaseTraitsSource {
}

interface PhysicalItemSource extends BaseItemSourcePF2e {}
