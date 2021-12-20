import pokemon from 'pokemon'

const patchList: readonly string[] = [
    'Indeedee',
    'Aegislash',
    'Lycanroc',
    'Farfetch’d',
    'Pumpkaboo',
    'Darmanitan',
    'Nidoran♀',
    'Nidoran♂',
] as const

const patchedNames: readonly string[] = [
    'Indeedee-male',
    'Indeedee-female',
    'Aegislash-blade',
    'Aegislash-shield',
    'Lycanroc-midday',
    'Lycanroc-midnight',
    'Lycanroc-dusk',
    'Farfetchd',
    'Pumpkaboo-average',
    'Pumpkaboo-small',
    'Pumpkaboo-large',
    'Pumpkaboo-super',
    'Darmanitan-standard',
    'Darmanitan-zen',
    'Darmanitan-standard-galar',
    'Darmanitan-zen-galar',
    'Nidoran-m',
    'Nidoran-f',
] as const

const patch = (poke: string) => !patchList.includes(poke)

export const pokeNames = [...pokemon.all().filter(patch), ...patchedNames] as const
