import { InventoryCategories } from "./module/inventory-categories";
import { registerSettings } from "./module/settings";
import { setupWeapon } from "./module/weapon/weapon-ih";

// will be extracted by webpack
import "./styles/styles.scss";

Hooks.on("init", () => {
    registerSettings();

    const itemTags = game.settings.get("pf2e-item-hacks", "item-tags");

    if (itemTags) {
        const other: Record<string, string> = CONFIG.PF2E.otherWeaponTags;
        other["price-unlinked"] = "Disable Price Automation";
        other["gold-scaling"] = "Gold Scaling";
        setupWeapon();
    }
});

Hooks.on("ready", () => {
    if (game.settings.get("pf2e-item-hacks", "inventory-categories")) {
        InventoryCategories.ready();
    }
});
