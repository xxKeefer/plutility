import pokemon from 'pokemon'

const patchList: readonly string[] = ['Nidoran♀', 'Nidoran♂'] as const

const patchedNames: readonly string[] = ['Nidoran-m', 'Nidoran-f'] as const

const patch = (poke: string) => !patchList.includes(poke)

export const pokeNames = [...pokemon.all().filter(patch), ...patchedNames] as const
