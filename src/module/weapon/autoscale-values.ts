const WeaponPotencyLevels = [2, 10, 16];

const WeaponStrikingLevels = [4, 12, 19];

interface GoldScalingLevels {
    weaponAndArmor: number[];
}

const Battlezoo: GoldScalingLevels = {
    weaponAndArmor: [
        // 1 to 10
        20, 35, 60, 100, 160, 250, 360, 500, 700, 1000,
        // 11 to 20
        1400, 2000, 3000, 4500, 6500, 10000, 15000, 24000, 40000, 70000,
    ],
};

const Relic: GoldScalingLevels = {
    weaponAndArmor: [
        // 1 to 10
        20, 35, 69, 200, 260, 500, 700, 1000, 1200, 2000,
        // 11 to 20
        3000, 6000, 9000, 13000, 17000, 24000, 48000, 90000, 112000, 180000,
    ],
};

const PriceBreakpoints = {
    battlezoo: Battlezoo,
    relic: Relic,
} satisfies Record<string, GoldScalingLevels | undefined>;

export { PriceBreakpoints, WeaponPotencyLevels, WeaponStrikingLevels };
