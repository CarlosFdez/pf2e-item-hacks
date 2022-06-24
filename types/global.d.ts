import { PF2ECONFIG } from "@pf2e/config";

declare global {
    interface Game {
        pf2e: {
            actions: Record<string, Function>;
            system: {
                sluggify: (str: string) => string;
            };
            CoinsPF2e: typeof CoinsPF2e;
        };
    }

    interface ActionDefaultOptions {
        event: JQuery.TriggeredEvent;
        actors?: ActorPF2e | ActorPF2e[];
    }

    interface ConfigPF2e extends ConfiguredConfig {
        debug: ConfiguredConfig["debug"] & {
            ruleElement: boolean;
        };
        PF2E: typeof PF2ECONFIG;
        time: {
            roundTime: number;
        };
    }

    const CONFIG: ConfigPF2e;
    namespace globalThis {
        // eslint-disable-next-line no-var
        var game: Game<
            ActorPF2e,
            ActorsPF2e,
            ChatMessagePF2e,
            Combat,
            Folder,
            ItemPF2e,
            Macro,
            Scene,
            User
        >;

        // eslint-disable-next-line no-var
        var ui: FoundryUI<CompendiumDirectory>;
    }

    interface ClientSettings {
        get(module: "pf2e", setting: "worldSchemaVersion"): number;
        get(module: "pf2e", setting: "worldSystemVersion"): string;
    }

    interface ClientSettingsMap {
        get(key: "pf2e.worldClock.worldCreatedOn"): SettingConfig & { default: string };
        get(key: "core.chatBubblesPan"): SettingConfig & { default: boolean };
    }

    const BUILD_MODE: "development" | "production";
}

type ConfiguredConfig = Config;
