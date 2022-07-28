export const MODULE_NAME = "pf2e-item-hacks";

function getVersion(): string {
    const module = game.modules.get(MODULE_NAME);
    if (module.active) {
        return (module as any).data.version;
    }
}

declare global {
    interface ClientSettings {
        get(name: typeof MODULE_NAME, key: "inventory-categories"): boolean;
        get(name: typeof MODULE_NAME, key: "item-tags"): boolean;
        get(name: typeof MODULE_NAME, key: "item-charges"): boolean;
    }
}

/**
 * Initializes settings. Must be called only once.
 */
export function registerSettings() {
    // Special non-config flag to handle migrations
    game.settings.register(MODULE_NAME, "migration", {
        name: "Migration Version",
        hint: "Used to perform migrations",
        config: false,
        default: { version: getVersion() },
        scope: "world",
        type: Object,
    });

    game.settings.register(MODULE_NAME, "inventory-categories", {
        name: game.i18n.localize("PF2E-IH.SETTINGS.InventoryCategories.name"),
        hint: game.i18n.localize("PF2E-IH.SETTINGS.InventoryCategories.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
        onChange: () => window.location.reload(),
    });

    game.settings.register(MODULE_NAME, "item-tags", {
        name: game.i18n.localize("PF2E-IH.SETTINGS.ItemTags.name"),
        hint: game.i18n.localize("PF2E-IH.SETTINGS.ItemTags.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
        onChange: () => window.location.reload(),
    });

    // game.settings.register(MODULE_NAME, "item-charges", {
    //     name: game.i18n.localize("PF2E-IH.SETTINGS.ItemCharges.name"),
    //     hint: game.i18n.localize("PF2E-IH.SETTINGS.ItemCharges.hint"),
    //     scope: "world",
    //     config: true,
    //     type: Boolean,
    //     default: false,
    //     onChange: () => window.location.reload(),
    // });
}
