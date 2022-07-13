import { isActionItem, isCharacterSheet, isFeatItem } from "./util";

const Frequencies = {
    PT10M: "PF2E.Duration.PT10M",
    PT1H: "PF2E.Duration.PT1H",
    PT24H: "PF2E.Duration.PT24H",
    day: "PF2E.Duration.day",
} as const;

interface FrequencyData {
    value: number;
    max: number;
    per: keyof typeof Frequencies,
}

interface ActorTrackingFlags {
    uses: Record<string, FrequencyData>;
}

const DefaultActionTracking: ActorTrackingFlags = { uses: {} };
const DefaultFrequency: FrequencyData = { value: 1, max: 1, per: "day" };

/** Adds styling to the layout based on action uses */
async function addActionTracking(action: ActionItemPF2e | FeatPF2e, $element: JQuery) {
    const actor = action.actor;
    if (!actor) return;

    const flags = getFlags(actor);
    const slug = action.slug || game.pf2e.system.sluggify(action.name);
    const uses = flags.uses[slug];
    if (!uses?.max) {
        $element.find(".item-name").append(`<a class="action-tracking unlimited"><i class="fas fa-infinity"></i></a>`);
        return;
    } else {
        const template = "modules/pf2e-item-hacks/templates/action-values.html";
        $element.find(".item-name").append(await renderTemplate(template, { slug, uses, frequencies: Frequencies }));
    }
}

function setupActionTracking() {
    // Override rest for the night to recharge action uses
    const originalRest = game.pf2e.actions.restForTheNight;
    game.pf2e.actions.restForTheNight = async function (options: ActionDefaultOptions) {
        const result = await originalRest.call(this, options);
        if (!result) return;
        const actors = Array.isArray(options.actors) ? options.actors : [options.actors];
        const characters = actors.filter((actor): actor is CharacterPF2e => actor?.data.type === "character");
        if (actors.length === 0) {
            ui.notifications.warn("Select at least one token representing a character.");
            return;
        }

        for (const character of characters) {
            await rechargeActionUses(character);
        }
    };

    Hooks.on("renderActorSheet", async (sheet: ActorSheet, $html: JQuery) => {
        if (!isCharacterSheet(sheet)) return;

        const possibleActions = $html.find(".actions .item");
        for (const itemElement of possibleActions) {
            const $itemEl = $(itemElement);
            const itemId = $itemEl.attr("data-item-id");
            const action = sheet.actor.items.get(itemId);
            if (isActionItem(action) || isFeatItem(action)) {
                await addActionTracking(action, $itemEl);
            }
        }

        $html.find("a.action-tracking.unlimited").on("click", (evt) => {
            const itemId = $(evt.target).closest(".item").attr("data-item-id");
            const actor = sheet.actor;
            const item = actor.items.get(itemId);
            const slug = item.slug || game.pf2e.system.sluggify(item.name);
            const flags = mergeObject(getFlags(actor).uses[slug] ?? {}, DefaultFrequency);
            actor.update({ [`flags.pf2e-action-tracking.uses.${slug}`]: flags });
        });
    });
}

async function rechargeActionUses(actor: ActorPF2e) {
    const flags = getFlags(actor);
    if (!flags) return;

    const updates = {};
    const typedItems = actor.itemTypes;
    const actions = [...typedItems.action, ...typedItems.feat];
    for (const action of actions) {
        const slug = action.slug ?? game.pf2e.system.sluggify(action.name);
        const uses = flags.uses?.[slug]
        if (uses.max) {
            updates[`${slug}.value`] = uses.max;
        }
    }

    return actor.update({ "flags.pf2e-action-tracking": updates });
}

/** Pulls usage flags from the actor. If create is set, it will add to actor flags */
function getFlags(actor: ActorPF2e): ActorTrackingFlags {
    return mergeObject(deepClone(DefaultActionTracking), actor.data.flags["pf2e-action-tracking"] ?? {});
}

export { setupActionTracking };
