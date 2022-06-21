/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { SkillAbbreviation } from "@actor/creature/data";
import { ItemSheetPF2e } from "@item/sheet/base";
import { ItemSheetDataPF2e } from "@item/sheet/data-types";
import { SheetOptions } from "@module/sheet/helpers";
import { DeityPF2e } from "./document";
import type * as TinyMCE from "tinymce";
import { Alignment } from "@actor/creature/types";
export declare class DeitySheetPF2e<TItem extends DeityPF2e = DeityPF2e> extends ItemSheetPF2e<TItem> {
    #private;
    static get defaultOptions(): DocumentSheetOptions;
    getData(options?: Partial<DocumentSheetOptions>): Promise<DeitySheetData>;
    activateListeners($html: JQuery): void;
    /** Hide the toolbar for the smaller sidebar editors */
    activateEditor(name: string, options?: Partial<TinyMCE.EditorSettings>, initialContent?: string): void;
    _onDrop(event: ElementDragEvent): Promise<void>;
    /** Foundry inflexibly considers checkboxes to be booleans: set back to a string tuple for Divine Font */
    _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface DeitySheetData extends ItemSheetDataPF2e<DeityPF2e> {
    alignments: Record<Alignment, string>;
    followerAlignments: SheetOptions;
    skills: Record<SkillAbbreviation, string>;
    divineFonts: SheetOptions;
    spells: SpellBrief[];
}
interface SpellBrief {
    uuid: ItemUUID;
    level: number;
    name: string;
    img: ImagePath;
}
export {};
