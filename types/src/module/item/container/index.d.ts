import { EquipmentTrait } from "@item/equipment/data";
import { PhysicalItemPF2e } from "@item/physical";
import { ContainerData } from "./data";
declare class ContainerPF2e extends PhysicalItemPF2e {
    /** This container's contents, reloaded every data preparation cycle */
    contents: Collection<Embedded<PhysicalItemPF2e>>;
    /** Is this an actual stowing container or merely one of the old pouches/quivers/etc.? */
    get stowsItems(): boolean;
    /** Reload this container's contents following Actor embedded-document preparation */
    prepareSiblingData(this: Embedded<ContainerPF2e>): void;
    getChatData(this: Embedded<ContainerPF2e>, htmlOptions?: EnrichHTMLOptions): Record<string, unknown>;
}
interface ContainerPF2e {
    readonly data: ContainerData;
    get traits(): Set<EquipmentTrait>;
}
export { ContainerPF2e };
