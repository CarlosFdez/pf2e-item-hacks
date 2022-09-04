import { WeaponArmorRefinementCosts, WeaponPotencyLevels, WeaponStrikingLevels } from "./autoscale-values";
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
        override generateMagicName(...args: unknown[]): string {
            const { otherTags } = this.system.traits;
            const isGoldScaling = otherTags.includes("gold-scaling");
            const isVirtual = otherTags.includes("price-unlinked");
            if (isGoldScaling || isVirtual) return this.name;

            return super.generateMagicName.apply(this, args);
        }

        override processMaterialAndRunes(...args: unknown[]) {
            const basePrice = duplicate(this.price);
            const result = super.processMaterialAndRunes.apply(this, args);

            const { system } = this;
            const { otherTags } = system.traits;
            const isGoldScaling = otherTags.includes("gold-scaling");
            const isVirtual = isWeaponVirtual(this);

            if (isVirtual) {
                system.level.value = this._source.system.level.value;
                system.weight.value = "";
                system.equippedBulk.value = "";
            }

            if (isGoldScaling) {
                const goldValue = coinValueInCopper(basePrice.value) / 100;
                const level = lookup(WeaponArmorRefinementCosts, goldValue);
                system.level.value = level;
                system.potencyRune.value = lookup(WeaponPotencyLevels, level) as OneToFour;
                system.strikingRune.value = STRIKING_RUNE_TYPES[lookup(WeaponStrikingLevels, level)];
            }

            return result;
        }

        override computeAdjustedPrice() {
            if (isWeaponVirtual(this)) return null;
            return super.computeAdjustedPrice();
        }
    }

    CONFIG.PF2E.Item.documentClasses.weapon = WeaponIH;
}

function isWeaponVirtual(weapon: WeaponPF2e) {
    const { otherTags } = weapon.system.traits;
    const isGoldScaling = otherTags.includes("gold-scaling");
    return isGoldScaling || otherTags.includes("price-unlinked");
}
