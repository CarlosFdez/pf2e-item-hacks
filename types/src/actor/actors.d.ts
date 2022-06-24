interface ActorPF2e extends Actor<TokenDocument, ItemTypeMap> {
    readonly data: BaseActorDataPF2e;
}
interface CreaturePF2e extends ActorPF2e {}
interface CharacterPF2e extends CreaturePF2e {}
interface LootPF2e extends ActorPF2e {}

declare type ItemTypeMap = {
    [K in keyof ConfigPF2e["PF2E"]["Item"]["documentClasses"]]: InstanceType<ConfigPF2e["PF2E"]["Item"]["documentClasses"][K]>;
};
