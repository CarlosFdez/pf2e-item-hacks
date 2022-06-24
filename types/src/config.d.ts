export declare const PF2ECONFIG: {
    abilities: {
        str: string;
        dex: string;
        con: string;
        int: string;
        wis: string;
        cha: string;
    };
    Item: {
        documentClasses: {
            action: ConstructorOf<ActionItemPF2e>;
            ancestry: ConstructorOf<AncestryPF2e>;
            armor: ConstructorOf<ArmorPF2e>;
            background: ConstructorOf<BackgroundPF2e>;
            backpack: ConstructorOf<ContainerPF2e>;
            book: ConstructorOf<BookPF2e>;
            class: ConstructorOf<ClassPF2e>;
            condition: ConstructorOf<ConditionPF2e>;
            consumable: ConstructorOf<ConsumablePF2e>;
            deity: ConstructorOf<DeityPF2e>;
            effect: ConstructorOf<EffectPF2e>;
            equipment: ConstructorOf<EquipmentPF2e>;
            feat: ConstructorOf<FeatPF2e>;
            heritage: ConstructorOf<HeritagePF2e>;
            kit: ConstructorOf<KitPF2e>;
            melee: ConstructorOf<MeleePF2e>;
            spell: ConstructorOf<SpellPF2e>;
            spellcastingEntry: ConstructorOf<SpellcastingEntryPF2e>;
            treasure: ConstructorOf<TreasurePF2e>;
            weapon: ConstructorOf<WeaponPF2e>;
        };
    };
    otherWeaponTags: Record<string, string>;
    armorTraits: Record<string, string>;
}
