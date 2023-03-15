import { Coins, ItemSheetPF2e, OtherWeaponTag, WeaponPF2e } from "@item";
import { OneToFour } from "@module/data";
import { PriceBreakpoints, WeaponPotencyLevels, WeaponStrikingLevels } from "./autoscale-values";
import { lookup } from "../util";

function noCoins() {
    return { pp: 0, gp: 0, sp: 0, cp: 0 };
}

export function coinValueInCopper(coins: Partial<Coins>): number {
    const { cp, sp, gp, pp } = mergeObject(noCoins(), coins);
    return cp + sp * 10 + gp * 100 + pp * 1000;
}

const STRIKING_RUNE_TYPES = [null, "striking", "greaterStriking", "majorStriking"] as const;

let prepared = false;

type OtherWeaponTagExtended = OtherWeaponTag | "gold-scaling" | "price-unlinked";

type WeaponFlagsExtended = WeaponPF2e["flags"] & {
    "pf2e-item-hacks"?: {
        goldScaling?: string;
    };
};

export function setupWeapon() {
    if (prepared) return;
    prepared = true;

    class WeaponIH extends CONFIG.PF2E.Item.documentClasses.weapon {
        override generateMagicName(...args: unknown[]): string {
            const otherTags: OtherWeaponTagExtended[] = this.system.traits.otherTags;
            const isGoldScaling = otherTags.includes("gold-scaling");
            const isVirtual = otherTags.includes("price-unlinked");
            if (isGoldScaling || isVirtual) return this.name;

            return super.generateMagicName.apply(this, args);
        }

        override prepareBaseData() {
            super.prepareBaseData();

            const { system } = this;
            const otherTags: OtherWeaponTagExtended[] = this.system.traits.otherTags;
            const isGoldScaling = otherTags.includes("gold-scaling");
            const isVirtual = isWeaponManualPriced(this);

            if (isVirtual) {
                system.level.value = this._source.system.level.value;
            }

            if (isGoldScaling) {
                const flags: WeaponFlagsExtended = this.flags;
                const current = flags["pf2e-item-hacks"]?.goldScaling;
                const methodology = PriceBreakpoints[current ?? ""] ?? PriceBreakpoints.battlezoo;

                const goldValue = coinValueInCopper(this.price.value) / 100;
                const level = lookup(methodology.weaponAndArmor, goldValue);
                system.level.value = level;
                system.potencyRune.value = lookup(WeaponPotencyLevels, level) as OneToFour;
                system.strikingRune.value = STRIKING_RUNE_TYPES[lookup(WeaponStrikingLevels, level)];
            }
        }

        override computeAdjustedPrice() {
            if (isWeaponManualPriced(this)) return null;
            return super.computeAdjustedPrice();
        }
    }

    CONFIG.PF2E.Item.documentClasses.weapon = WeaponIH;

    setupWeaponSheet();
}

function setupWeaponSheet() {
    Hooks.on("renderWeaponSheetPF2e", (sheet: ItemSheetPF2e<WeaponPF2e>, dom: JQuery) => {
        const weapon = sheet.item;
        const otherTags: OtherWeaponTagExtended[] = weapon.system.traits.otherTags;
        const isGoldScaling = otherTags.includes("gold-scaling");

        if (isGoldScaling) {
            const options = {
                battlezoo: "Battlezoo",
                relic: "Relic (custom)",
            };

            const flags: WeaponFlagsExtended = weapon.flags;
            const current = flags["pf2e-item-hacks"]?.goldScaling;
            const optionsDom = Object.entries(options).map(
                ([key, value]) => `<option value="${key}"${current === key ? " selected" : ""}>${value}</option>`,
            );

            const sourceArea = dom.find("[name='system.source.value']").closest(".form-group");
            sourceArea.before(
                `<div class="form-group"><label>Gold Scaling Pattern</label><select name="flags.pf2e-item-hacks.goldScaling">${optionsDom}</select>`,
            );
        }
    });
}

function isWeaponManualPriced(weapon: WeaponPF2e) {
    const otherTags: OtherWeaponTagExtended[] = weapon.system.traits.otherTags;
    const isGoldScaling = otherTags.includes("gold-scaling");
    return isGoldScaling || otherTags.includes("price-unlinked");
}
