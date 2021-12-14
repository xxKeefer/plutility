import pokemon from 'pokemon'

const patchList: readonly string[] = ['Indeedee', 'Aegislash', 'Lycanroc', 'Farfetch’d'] as const

const patchedNames: readonly string[] = [
    'Indeedee-male',
    'Indeedee-female',
    'Aegislash-blade',
    'Aegislash-shield',
    'Lycanroc-midday',
    'Lycanroc-midnight',
    'Lycanroc-dusk',
    'Farfetchd',
] as const

const patch = (poke: string) => !patchList.includes(poke)

export const pokeNames = [...pokemon.all().filter(patch), ...patchedNames] as const
