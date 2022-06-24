interface BaseItemSourcePF2e<TType extends ItemType = ItemType, TSystemSource extends ItemSystemSource = ItemSystemSource> extends foundry.data.ItemSource<TType, TSystemSource> {
    flags: ItemSourceFlagsPF2e;
}
interface BaseItemDataPF2e<TItem extends ItemPF2e = ItemPF2e, TType extends ItemType = ItemType, TSystemData extends ItemSystemData = ItemSystemData, TSource extends BaseItemSourcePF2e<TType> = BaseItemSourcePF2e<TType>> extends Omit<BaseItemSourcePF2e<TType, ItemSystemSource>, "effects">, foundry.data.ItemData<TItem, ActiveEffect> {
    readonly type: TType;
    readonly data: TSystemData;
    flags: ItemFlagsPF2e;
    readonly _source: TSource;
}

interface ItemFlagsPF2e extends foundry.data.ItemFlags {
    pf2e: {
        rulesSelections: Record<string, string | number | object>;
        itemGrants: ItemGrantData[];
        grantedBy: ItemGrantData | null;
        [key: string]: unknown;
    };
}
interface ItemSourceFlagsPF2e extends foundry.data.ItemFlags {
    pf2e?: {
        rulesSelections?: Record<string, string | number | object>;
        itemGrants?: ItemGrantSource[];
        grantedBy?: ItemGrantSource | null;
        [key: string]: unknown;
    };
}

interface ItemGrantSource {
    id: string;
    onDelete?: ItemGrantDeleteAction;
}
type ItemGrantData = Required<ItemGrantSource>;
type ItemGrantDeleteAction = "cascade" | "detach" | "restrict";

interface ItemLevelData {
    level: {
        value: number;
    };
}
interface ItemTraits extends ValuesList<string> {
    rarity: Rarity;
}
interface ItemSystemSource {
    description: {
        value: string;
    };
    source: {
        value: string;
    };
    traits?: ItemTraits;
    options?: {
        value: string[];
    };
    //rules: RuleElementSource[];
    slug: string | null;
}
type ItemSystemData = ItemSystemSource;

type ItemSourcePF2e = BaseItemSourcePF2e;
