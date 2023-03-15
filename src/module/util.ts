import { CharacterSheetPF2e } from "@actor/character/sheet";
import { ActionItemPF2e, FeatPF2e } from "@item";

type Abstract<T> = Function & { prototype: T };
type Constructor<T> = new (...args: any[]) => T;
export type Class<T> = Abstract<T> | Constructor<T>;
type UnknownFunction = (...args: unknown[]) => unknown;

export function isCharacterSheet(sheet: ActorSheet): sheet is CharacterSheetPF2e {
    const sheetClass = CONFIG.Actor.sheetClasses.character["pf2e.CharacterSheetPF2e"]?.cls;
    if (sheetClass && sheet instanceof sheetClass) {
        return true;
    }

    return false;
}

export function isActionItem(item?: unknown): item is ActionItemPF2e {
    return item instanceof Item && item.type === "action";
}

export function isFeatItem(item?: unknown): item is FeatPF2e {
    return item instanceof Item && item.type === "feat";
}

/** Does what libwrapper does. Monkeypatches an existing object. But without any of the mangling. */
export function replaceMethod<T, K extends keyof T>(
    object: Class<T>,
    name: K,
    impl: (
        this: T,
        original: T[K],
        ...args: T[K] extends UnknownFunction ? Parameters<T[K]> : never
    ) => T[K] extends UnknownFunction ? ReturnType<T[K]> : never,
) {
    if (!object) {
        throw new Error(
            `PF2E Action Tracking | Attempted to override property ${String(name)} for an object that does not exist`,
        );
    }

    const original = object.prototype[name];
    object.prototype[name] = function (...args) {
        return impl.apply(this, [original.bind(this), ...args]);
    };
}

export const PHYSICAL_ITEM_TYPES = new Set([
    "armor",
    "backpack",
    "book",
    "consumable",
    "equipment",
    "treasure",
    "weapon",
] as const);

export function insertIntoObject<T extends Record<string | number | symbol, unknown>>(
    object: T,
    options: { before?: keyof T; after?: keyof T; key: keyof T; value: unknown },
) {
    const result: Record<string | number | symbol, unknown> = {};
    for (const [key, value] of Object.entries(object)) {
        if (key === options.before) {
            result[options.key] = options.value;
        }
        result[key] = value;
        if (key === options.after && !(options.key in result)) {
            result[options.key] = options.value;
        }
    }

    for (const key of Object.keys(object)) {
        delete object[key];
    }
    mergeObject(object, result);

    return result as T;
}

/** Looks up where on a sequential table a given value falls */
export function lookup(table: number[], value: number) {
    const idx = table.findIndex((entry) => entry > value);
    return idx < 0 ? table.length : idx;
}
