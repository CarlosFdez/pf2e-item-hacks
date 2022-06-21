import { OneToFour } from "@pf2e/module/data";
import { WeaponPF2e } from "@pf2e/module/item";
import { Coins } from "@pf2e/module/item/physical/data";
import { WeaponArmorRefinementCosts, WeaponPotencyLevels, WeaponStrikingLevels } from "./battlezoo";
import { lookup } from "./util";

function noCoins() {
    return { pp: 0, gp: 0, sp: 0, cp: 0 };
}

export function coinValueInCopper(coins: Partial<Coins>): number {
    const { cp, sp, gp, pp } = mergeObject(noCoins(), coins);
    return cp + sp * 10 + gp * 100 + pp * 1000;
}

const STRIKING_RUNE_TYPES = [null, "striking", "greaterStriking", "majorStriking"] as const;

let prepared = false;

export function setupWeapon() {
    if (prepared) return;
    prepared = true;

    class WeaponIH extends CONFIG.PF2E.Item.documentClasses.weapon {
        get isBattlezoo() {
            return weaponIsBattlezoo(this);
        }

        override generateMagicName(...args: unknown[]): string {
            const isVirtual = weaponIsVirtual(this);
            if (this.isBattlezoo || isVirtual) return this.data.name;

            return super.generateMagicName.apply(this, args);
        }

        override processMaterialAndRunes(...args: unknown[]) {
            const basePrice = duplicate(this.price);
            const result = super.processMaterialAndRunes.apply(this, args);

            const isBattlezoo = weaponIsBattlezoo(this);
            const isVirtual = weaponIsVirtual(this);

            // These items shouldn't get prices or names changed
            if (isBattlezoo || isVirtual) {
                this.data.data.price = duplicate(basePrice);
            }

            if (isVirtual) {
                this.data.data.level.value = this.data._source.data.level.value;
                this.data.data.weight.value = "";
                this.data.data.equippedBulk.value = "";
            }

            if (this.isBattlezoo) {
                const goldValue = coinValueInCopper(basePrice.value) / 100;
                const level = lookup(WeaponArmorRefinementCosts, goldValue);;
                this.data.data.level.value = level;
                this.data.data.potencyRune.value = lookup(WeaponPotencyLevels, level) as OneToFour;
                this.data.data.strikingRune.value = STRIKING_RUNE_TYPES[lookup(WeaponStrikingLevels, level)];
            }

            return result;
        }
    }

    CONFIG.PF2E.Item.documentClasses.weapon = WeaponIH;
}

function weaponIsBattlezoo(weapon: WeaponPF2e) {
    const traits: Set<string> = weapon.traits;
    return game.settings.get("pf2e-item-hacks", "battlezoo") && traits.has("hb_battlezoo");
}

function weaponIsVirtual(weapon: WeaponPF2e) {
    const otherTags: string[] = weapon.data.data.traits.otherTags;
    return game.settings.get("pf2e-item-hacks", "virtual-items") && otherTags.includes("virtual");
}

