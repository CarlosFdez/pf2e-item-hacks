import { ActorPF2e } from "@actor";
import { PhysicalItemPF2e } from "@item";
import { Coins } from "@item/physical/data";
declare class ActorInventory extends Collection<Embedded<PhysicalItemPF2e>> {
    readonly actor: ActorPF2e;
    constructor(actor: ActorPF2e, entries?: Embedded<PhysicalItemPF2e>[]);
    get coins(): Coins;
    get totalWealth(): Coins;
    addCoins(coins: Partial<Coins>, { combineStacks }?: {
        combineStacks?: boolean;
    }): Promise<void>;
    removeCoins(coins: Partial<Coins>, { byValue }?: {
        byValue?: boolean;
    }): Promise<boolean>;
}
export { ActorInventory };
