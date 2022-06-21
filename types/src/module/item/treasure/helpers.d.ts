import type { ActorPF2e } from "@actor";
import { Coins, PartialPrice } from "@item/physical/data";
export declare function coinValueInCopper(coins: Partial<Coins>): number;
/** Convert a `Coins` object into a price string */
export declare function coinsToString(coins: Partial<Coins>, { reduce }?: {
    reduce?: boolean;
}): string;
/**
 * always return a new copy
 */
export declare function noCoins(): Coins;
export declare function combineCoins(first: Partial<Coins>, second: Partial<Coins>): Coins;
export declare function coinStringToCoins(coinString: string, quantity?: number): Coins;
export declare function multiplyCoins(coins: Partial<Coins>, factor: number): Coins;
export declare function multiplyPrice(price: PartialPrice, factor: number): Coins;
export declare const coinCompendiumIds: {
    pp: string;
    gp: string;
    sp: string;
    cp: string;
};
export declare function sellAllTreasure(actor: ActorPF2e): Promise<void>;
