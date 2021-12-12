import pokemon from 'pokemon'

const patchList: readonly string[] = ['Indeedee', 'Aegislash'] as const

const patchedNames: readonly string[] = [
    'Indeedee-male',
    'Indeedee-female',
    'Aegislash-blade',
    'Aegislash-shield',
] as const

const patch = (poke: string) => !patchList.includes(poke)

export const pokeNames = [...pokemon.all().filter(patch), ...patchedNames] as const
