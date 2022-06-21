import MainTranslations from "../../../en.json";
import RETranslations from "../../..//re-en.json";
declare type TranslationsPF2e = Record<string, TranslationDictionaryValue> & typeof MainTranslations & typeof RETranslations;
export declare class LocalizePF2e {
    static ready: boolean;
    private static _translations;
    static get translations(): TranslationsPF2e;
}
export {};
