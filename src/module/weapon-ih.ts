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
            const system = this.data.data;

            // These items shouldn't get prices or names changed
            if (isBattlezoo || isVirtual) {
                const value = new game.pf2e.Coins(basePrice.value);
                system.price = { ...basePrice, value };
            }

            if (isVirtual) {
                system.level.value = this.data._source.data.level.value;
                system.weight.value = "";
                system.equippedBulk.value = "";
            }

            if (this.isBattlezoo) {
                const goldValue = coinValueInCopper(basePrice.value) / 100;
                const level = lookup(WeaponArmorRefinementCosts, goldValue);;
                system.level.value = level;
                system.potencyRune.value = lookup(WeaponPotencyLevels, level) as OneToFour;
                system.strikingRune.value = STRIKING_RUNE_TYPES[lookup(WeaponStrikingLevels, level)];
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

