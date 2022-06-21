import { setupActionTracking } from "./module/action-tracking";
import InventoryCategories from "./module/inventory-categories";
import { registerSettings } from "./module/settings";
import { setupWeapon } from "./module/weapon-ih";

// will be extracted by webpack
import './styles/styles.scss';

Hooks.on("init", () => {
    registerSettings();

    const virtualItems = game.settings.get("pf2e-item-hacks", "virtual-items");
    const battlezoo = game.settings.get("pf2e-item-hacks", "battlezoo");

    if (virtualItems) {
        const other: Record<string, string> = CONFIG.PF2E.otherWeaponTags;
        other["virtual"] = "Virtual Weapon";
    }

    if (virtualItems || battlezoo) {
        setupWeapon();
    }
});

Hooks.on("setup", () => {
    if (game.settings.get("pf2e-item-hacks", "action-tracking")) {
        setupActionTracking();
    }
});

Hooks.on("ready", () => {
    if (game.settings.get("pf2e-item-hacks", "inventory-categories")) {
        InventoryCategories.ready();
    }
});
