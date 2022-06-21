import { CharacterSheetPF2e } from "@pf2e/module/actor/character/sheet";
import { LootSheetPF2e } from "@pf2e/module/actor/loot/sheet";
import { ConsumablePF2e, PhysicalItemPF2e } from "@pf2e/module/item";
import { ConsumableData, EquipmentData, ItemDataPF2e } from "@pf2e/module/item/data";
import { Class, insertIntoObject, replaceMethod } from "./util";

const InventoryCategories = {
    ready: () => {
        const CharacterSheet = Actors.registeredSheets.find((s) => s.name === "CharacterSheetPF2e") as unknown as Class<CharacterSheetPF2e>;
        const LootSheet = Actors.registeredSheets.find((s) => s.name === "LootSheetPF2e") as unknown as Class<LootSheetPF2e>;

        replaceMethod(CharacterSheet, "getData", async (original, options) => {
            const data = await original(options);
            updateInventory(data.inventory.sections);
            return data;
        });

        replaceMethod(LootSheet, "getData", async (original, options?: unknown) => {
            const data = await original.call(this, options);
            updateInventory(data.inventory.sections);
            return data;
        });
    },
};

export interface ItemSheetData<D extends PhysicalItemPF2e = PhysicalItemPF2e> {
    item: D;
    editable: boolean;
    isContainer: boolean;
    canBeEquipped: boolean;
    isInvestable: boolean;
    isSellable: boolean;
    hasCharges: boolean;
    heldItems?: ItemSheetData[];
}
type InventorySheetData = Record<string, { label: string, items: ItemSheetData[] }>;

function updateInventory(inventory: InventorySheetData) {
    const precious = inventory["equipment"].items.filter((i) => i.item.traits.has("precious"));
    const ammo = inventory["consumable"].items.filter(
        (i: ItemSheetData<ConsumablePF2e>) => i.item.consumableType === "ammo");
    const scrollsWands = inventory["consumable"].items.filter(
        (i: ItemSheetData<ConsumablePF2e>) => ["scroll", "wand"].includes(i.item.consumableType));

    const extracted = new Set([
        ...precious.map(i => i.item.id), ...ammo.map(i => i.item.id), ...scrollsWands.map(i => i.item.id)]);

    if (precious.length) {
        insertIntoObject(inventory, {
            after: "equipment",
            key: "materials",
            value: { label: game.i18n.localize("PF2E-IH.ItemCategories.Materials"), items: precious },
        });
    }

    if (ammo.length) {
        insertIntoObject(inventory, {
            before: "consumable",
            key: "ammunition",
            value: { label: game.i18n.localize("PF2E-IH.ItemCategories.Ammunition"), items: ammo },
        });
    }

    if (scrollsWands.length) {
        insertIntoObject(inventory, {
            before: "consumable",
            key: "scrolls-wands",
            value: { label: game.i18n.localize("PF2E-IH.ItemCategories.ScrollsWands"), items: scrollsWands },
        });
    }

    if (extracted.size > 0) {
        inventory["equipment"].items = inventory["equipment"].items.filter((i) => !extracted.has(i.item.id));
        inventory["consumable"].items = inventory["consumable"].items.filter((i) => !extracted.has(i.item.id));
    }
}

export default InventoryCategories;
